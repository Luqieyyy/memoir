'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getPhotosByEventId,
  addPhotoRecord,
  subscribeToPhotos,
  uploadPhoto,
  uploadMultiplePhotos,
} from '@/lib/firebase';
import { compressImage, validateImageFile } from '@/lib/utils';
import { WeddingPhoto } from '@/types';

export interface UsePhotosReturn {
  photos: WeddingPhoto[];
  loading: boolean;
  error: string | null;
  uploadPhotos: (
    guestName: string,
    files: File[],
    onProgress?: (progress: number) => void
  ) => Promise<WeddingPhoto[]>;
  uploading: boolean;
  uploadProgress: number;
}

export function usePhotos(eventId: string | null): UsePhotosReturn {
  const [photos, setPhotos] = useState<WeddingPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!eventId) {
      setPhotos([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToPhotos(eventId, (updatedPhotos) => {
      setPhotos(updatedPhotos);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventId]);

  const uploadNewPhotos = useCallback(
    async (
      guestName: string,
      files: File[],
      onProgress?: (progress: number) => void
    ): Promise<WeddingPhoto[]> => {
      if (!eventId) {
        throw new Error('Event ID is required');
      }

      if (files.length === 0) {
        throw new Error('No files selected');
      }

      setUploading(true);
      setUploadProgress(0);
      setError(null);

      try {
        // Validate all files
        for (const file of files) {
          const validation = validateImageFile(file, { maxSizeMB: 15 });
          if (!validation.valid) {
            throw new Error(validation.error);
          }
        }

        // Compress images
        const compressedFiles = await Promise.all(
          files.map((file) => compressImage(file, { maxSizeMB: 2 }))
        );

        // Upload all photos
        const uploadResults = await uploadMultiplePhotos(
          eventId,
          compressedFiles,
          (progress) => {
            setUploadProgress(progress);
            if (onProgress) onProgress(progress);
          }
        );

        // Create photo records in Firestore
        const photoRecords = await Promise.all(
          uploadResults.map((result) =>
            addPhotoRecord(eventId, {
              guestName,
              url: result.url,
              storagePath: result.storagePath,
              fileName: result.fileName,
              fileSize: result.fileSize,
              mimeType: result.mimeType,
            })
          )
        );

        setUploadProgress(100);
        return photoRecords;
      } catch (err) {
        console.error('Error uploading photos:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to upload photos';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setUploading(false);
        setTimeout(() => setUploadProgress(0), 1000);
      }
    },
    [eventId]
  );

  return {
    photos,
    loading,
    error,
    uploadPhotos: uploadNewPhotos,
    uploading,
    uploadProgress,
  };
}
