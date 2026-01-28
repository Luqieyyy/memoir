'use client';

import React, { useState } from 'react';
import { WeddingPhoto } from '@/types';
import { Card, Modal, Spinner } from '@/components/ui';
import { getRelativeTime } from '@/lib/utils';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Download, User } from 'lucide-react';

interface PhotoGalleryProps {
  photos: WeddingPhoto[];
  loading?: boolean;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, loading }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-square bg-secondary-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-8 h-8 text-primary-300" />
        </div>
        <h3 className="text-lg font-medium text-secondary-700 mb-2">No photos yet</h3>
        <p className="text-secondary-500">Be the first to share a photo with the couple!</p>
      </div>
    );
  }

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <>
      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="aspect-square relative group overflow-hidden rounded-lg bg-secondary-100 hover:shadow-lg transition-all duration-300"
          >
            <img
              src={photo.url}
              alt={`Photo by ${photo.guestName}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
              <div className="w-full p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs truncate">{photo.guestName}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Main Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={`Photo by ${selectedPhoto.guestName}`}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            
            {/* Photo Info */}
            <div className="mt-4 text-center text-white">
              <div className="flex items-center justify-center gap-2 mb-1">
                <User className="w-4 h-4 text-white/70" />
                <span className="font-medium">{selectedPhoto.guestName}</span>
              </div>
              <p className="text-sm text-white/50">{getRelativeTime(selectedPhoto.createdAt)}</p>
            </div>

            {/* Download Button */}
            <a
              href={selectedPhoto.url}
              download={selectedPhoto.fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>

          {/* Navigation - Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Photo Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {selectedIndex !== null && `${selectedIndex + 1} / ${photos.length}`}
          </div>
        </div>
      )}
    </>
  );
};
