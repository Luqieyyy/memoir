'use client';

import { Heart } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-romantic">
      <div className="text-center">
        <div className="relative inline-block">
          <Heart className="w-12 h-12 text-primary-600 fill-primary-600 animate-pulse" />
          <div className="absolute inset-0 w-12 h-12 border-2 border-primary-200 rounded-full animate-ping" />
        </div>
        <p className="mt-4 text-secondary-500 animate-pulse">Loading memories...</p>
      </div>
    </div>
  );
}
