import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  fileType?: string;
  quality?: number;
}

const defaultOptions: CompressionOptions = {
  maxSizeMB: 2,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: 'image/jpeg',
  quality: 0.8,
};

/**
 * Compress a single image file
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const mergedOptions = { ...defaultOptions, ...options };
  
  // If file is already small enough, return as-is
  if (file.size <= (mergedOptions.maxSizeMB || 2) * 1024 * 1024) {
    return file;
  }
  
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: mergedOptions.maxSizeMB,
      maxWidthOrHeight: mergedOptions.maxWidthOrHeight,
      useWebWorker: mergedOptions.useWebWorker,
      fileType: mergedOptions.fileType,
    });
    
    return compressedFile;
  } catch (error) {
    console.error('Image compression failed:', error);
    // Return original file if compression fails
    return file;
  }
}

/**
 * Compress multiple images
 */
export async function compressImages(
  files: File[],
  options: CompressionOptions = {},
  onProgress?: (completed: number, total: number) => void
): Promise<File[]> {
  const compressedFiles: File[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const compressed = await compressImage(files[i], options);
    compressedFiles.push(compressed);
    
    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }
  
  return compressedFiles;
}

/**
 * Create thumbnail from image file
 */
export async function createThumbnail(
  file: File,
  maxDimension: number = 200
): Promise<File> {
  return compressImage(file, {
    maxWidthOrHeight: maxDimension,
    maxSizeMB: 0.1,
    quality: 0.7,
  });
}

/**
 * Convert HEIC to JPEG (for iOS images)
 */
export async function convertHeicToJpeg(file: File): Promise<File> {
  if (!file.type.includes('heic') && !file.name.toLowerCase().endsWith('.heic')) {
    return file;
  }
  
  // Use imageCompression which handles HEIC conversion internally
  return compressImage(file, {
    maxSizeMB: 5,
    fileType: 'image/jpeg',
  });
}

/**
 * Validate image file
 */
export function validateImageFile(
  file: File,
  options: {
    maxSizeMB?: number;
    allowedTypes?: string[];
  } = {}
): { valid: boolean; error?: string } {
  const {
    maxSizeMB = 10,
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
  } = options;
  
  // Check file type
  const isAllowedType = allowedTypes.some(
    (type) =>
      file.type === type ||
      file.type.includes(type.split('/')[1]) ||
      file.name.toLowerCase().endsWith(`.${type.split('/')[1]}`)
  );
  
  if (!isAllowedType) {
    return {
      valid: false,
      error: 'File type not supported. Please use JPEG, PNG, or WebP images.',
    };
  }
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit. Please choose a smaller image.`,
    };
  }
  
  return { valid: true };
}

/**
 * Get image dimensions
 */
export async function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Create image preview URL
 */
export function createImagePreview(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Revoke image preview URL (cleanup)
 */
export function revokeImagePreview(url: string): void {
  URL.revokeObjectURL(url);
}
