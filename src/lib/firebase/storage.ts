import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  UploadTaskSnapshot,
} from 'firebase/storage';
import { storage } from './config';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a unique file path for storage
 */
function generateFilePath(eventId: string, fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase() || 'jpg';
  const uniqueId = uuidv4();
  return `events/${eventId}/photos/${uniqueId}.${extension}`;
}

/**
 * Upload a single photo to Firebase Storage
 */
export async function uploadPhoto(
  eventId: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<{
  url: string;
  storagePath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}> {
  const storagePath = generateFilePath(eventId, file.name);
  const storageRef = ref(storage, storagePath);
  
  if (onProgress) {
    // Upload with progress tracking
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
      },
    });
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            url,
            storagePath,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
          });
        }
      );
    });
  } else {
    // Simple upload without progress tracking
    await uploadBytes(storageRef, file, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
      },
    });
    
    const url = await getDownloadURL(storageRef);
    
    return {
      url,
      storagePath,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    };
  }
}

/**
 * Upload multiple photos with progress tracking
 */
export async function uploadMultiplePhotos(
  eventId: string,
  files: File[],
  onTotalProgress?: (progress: number) => void,
  onFileComplete?: (index: number, result: { url: string; storagePath: string }) => void
): Promise<
  Array<{
    url: string;
    storagePath: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
  }>
> {
  const totalFiles = files.length;
  let completedFiles = 0;
  const fileProgress: number[] = new Array(totalFiles).fill(0);
  
  const updateTotalProgress = () => {
    if (onTotalProgress) {
      const total = fileProgress.reduce((sum, p) => sum + p, 0);
      onTotalProgress(total / totalFiles);
    }
  };
  
  const uploadPromises = files.map(async (file, index) => {
    const result = await uploadPhoto(eventId, file, (progress) => {
      fileProgress[index] = progress;
      updateTotalProgress();
    });
    
    completedFiles++;
    if (onFileComplete) {
      onFileComplete(index, { url: result.url, storagePath: result.storagePath });
    }
    
    return result;
  });
  
  return Promise.all(uploadPromises);
}

/**
 * Delete a photo from storage
 */
export async function deletePhoto(storagePath: string): Promise<void> {
  const storageRef = ref(storage, storagePath);
  await deleteObject(storageRef);
}

/**
 * Delete all photos for an event
 */
export async function deleteAllEventPhotos(eventId: string): Promise<void> {
  const folderRef = ref(storage, `events/${eventId}/photos`);
  
  try {
    const listResult = await listAll(folderRef);
    
    const deletePromises = listResult.items.map((itemRef) => deleteObject(itemRef));
    await Promise.all(deletePromises);
  } catch (error) {
    // Folder might not exist if no photos were uploaded
    console.log('No photos to delete or folder does not exist');
  }
}

/**
 * Get download URL for a storage path
 */
export async function getPhotoUrl(storagePath: string): Promise<string> {
  const storageRef = ref(storage, storagePath);
  return getDownloadURL(storageRef);
}

/**
 * Validate file before upload
 */
export function validateFile(
  file: File,
  options: {
    maxSizeMB?: number;
    allowedTypes?: string[];
  } = {}
): { valid: boolean; error?: string } {
  const { maxSizeMB = 10, allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'] } = options;
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Accepted types: ${allowedTypes.join(', ')}`,
    };
  }
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`,
    };
  }
  
  return { valid: true };
}
