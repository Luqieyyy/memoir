'use client';

import React, { useState, useMemo } from 'react';
import { WeddingWish, WeddingPhoto } from '@/types';
import { Card, Spinner } from '@/components/ui';
import { Heart, Quote, Camera, X, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

interface MemoryWallProps {
    wishes: WeddingWish[];
    photos: WeddingPhoto[];
    wishesLoading?: boolean;
    photosLoading?: boolean;
}

interface MemoryItem {
    type: 'wish' | 'photo';
    data: WeddingWish | WeddingPhoto;
    timestamp: Date;
}

export const MemoryWall: React.FC<MemoryWallProps> = ({
    wishes,
    photos,
    wishesLoading = false,
    photosLoading = false,
}) => {
    const [selectedPhoto, setSelectedPhoto] = useState<WeddingPhoto | null>(null);
    const [viewMode, setViewMode] = useState<'all' | 'photos' | 'wishes'>('all');

    // Combine and sort memories by timestamp
    const memories = useMemo(() => {
        const items: MemoryItem[] = [];

        wishes.forEach((wish) => {
            items.push({
                type: 'wish',
                data: wish,
                timestamp: wish.createdAt instanceof Date ? wish.createdAt : new Date(wish.createdAt),
            });
        });

        photos.forEach((photo) => {
            items.push({
                type: 'photo',
                data: photo,
                timestamp: photo.createdAt instanceof Date ? photo.createdAt : new Date(photo.createdAt),
            });
        });

        // Sort by newest first
        return items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }, [wishes, photos]);

    const filteredMemories = useMemo(() => {
        if (viewMode === 'all') return memories;
        return memories.filter((m) => m.type === (viewMode === 'photos' ? 'photo' : 'wish'));
    }, [memories, viewMode]);

    const loading = wishesLoading || photosLoading;

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Spinner size="lg" />
            </div>
        );
    }

    if (memories.length === 0) {
        return (
            <Card className="text-center py-12">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-lg font-medium text-secondary-800 mb-2">
                    No Memories Yet
                </h3>
                <p className="text-secondary-500">
                    Be the first to share a wish or photo!
                </p>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filter Tabs */}
            <div className="flex justify-center gap-2">
                {[
                    { key: 'all', label: 'All Memories', icon: <Heart className="w-4 h-4" /> },
                    { key: 'photos', label: 'Photos', icon: <Camera className="w-4 h-4" /> },
                    { key: 'wishes', label: 'Wishes', icon: <MessageSquare className="w-4 h-4" /> },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setViewMode(tab.key as typeof viewMode)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${viewMode === tab.key
                            ? 'bg-primary-500 text-white shadow-soft'
                            : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'
                            }`}
                    >
                        {tab.icon}
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 text-sm text-secondary-500">
                <span className="flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    {photos.length} photos
                </span>
                <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {wishes.length} wishes
                </span>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {filteredMemories.map((memory, index) => (
                    <div key={`${memory.type}-${index}`} className="break-inside-avoid">
                        {memory.type === 'photo' ? (
                            <PhotoCard
                                photo={memory.data as WeddingPhoto}
                                onClick={() => setSelectedPhoto(memory.data as WeddingPhoto)}
                            />
                        ) : (
                            <WishCard wish={memory.data as WeddingWish} />
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedPhoto && (
                <PhotoLightbox
                    photo={selectedPhoto}
                    photos={photos}
                    onClose={() => setSelectedPhoto(null)}
                    onNavigate={setSelectedPhoto}
                />
            )}
        </div>
    );
};

// Photo Card Component
const PhotoCard: React.FC<{ photo: WeddingPhoto; onClick: () => void }> = ({ photo, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            onClick={onClick}
            className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer bg-white"
        >
            {/* Image */}
            <div className="relative">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-secondary-100 animate-pulse" />
                )}
                <img
                    src={photo.url}
                    alt={photo.caption || 'Wedding memory'}
                    className={`w-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Caption & Author */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {photo.caption && (
                    <p className="text-sm font-medium mb-1 line-clamp-2">{photo.caption}</p>
                )}
                <p className="text-xs opacity-80">by {photo.guestName}</p>
            </div>

            {/* Camera icon badge */}
            <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4 text-primary-500" />
            </div>
        </div>
    );
};

// Wish Card Component - Styled like a polaroid/frame with the wish inside
const WishCard: React.FC<{ wish: WeddingWish }> = ({ wish }) => {
    // Generate a soft gradient background based on name
    const getGradient = (name: string) => {
        const colors = [
            'from-rose-50 to-pink-100',
            'from-violet-50 to-purple-100',
            'from-sky-50 to-blue-100',
            'from-emerald-50 to-green-100',
            'from-amber-50 to-yellow-100',
            'from-orange-50 to-red-100',
        ];
        const index = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % colors.length;
        return colors[index];
    };

    return (
        <div className="group relative bg-white rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden">
            {/* Decorative top pattern (like a polaroid frame) */}
            <div className={`h-3 bg-gradient-to-r ${getGradient(wish.guestName)}`} />

            {/* Content */}
            <div className="p-5">
                {/* Quote icon */}
                <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                        <Quote className="w-5 h-5 text-primary-400" />
                    </div>
                </div>

                {/* Message */}
                <p className="text-secondary-700 text-center leading-relaxed mb-4 italic">
                    "{wish.message}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-2 pt-3 border-t border-secondary-100">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 text-sm font-semibold">
                            {wish.guestName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        </div>

            {/* Decorative corner */ }
    <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
        <div className={`absolute -top-4 -right-4 w-8 h-8 rotate-45 bg-gradient-to-br ${getGradient(wish.guestName)}`} />
    </div>
        </div >
    );
};

// Photo Lightbox
const PhotoLightbox: React.FC<{
    photo: WeddingPhoto;
    photos: WeddingPhoto[];
    onClose: () => void;
    onNavigate: (photo: WeddingPhoto) => void;
}> = ({ photo, photos, onClose, onNavigate }) => {
    const currentIndex = photos.findIndex((p) => p.id === photo.id);

    const handlePrev = () => {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
        onNavigate(photos[prevIndex]);
    };

    const handleNext = () => {
        const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
        onNavigate(photos[nextIndex]);
    };

    return (
        <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {photos.length > 1 && (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                        }}
                        className="absolute left-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                        }}
                        className="absolute right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Image */}
            <div
                className="max-w-4xl max-h-[80vh] relative"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={photo.url}
                    alt={photo.caption || 'Wedding photo'}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />

                {/* Caption */}
                {(photo.caption || photo.guestName) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                        {photo.caption && (
                            <p className="text-white font-medium mb-1">{photo.caption}</p>
                        )}
                        <p className="text-white/70 text-sm">Shared by {photo.guestName}</p>
                    </div>
                )}
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-white text-sm">
                {currentIndex + 1} / {photos.length}
            </div>
        </div>
    );
};

export default MemoryWall;
