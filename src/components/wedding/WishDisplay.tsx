'use client';

import React from 'react';
import { WeddingWish } from '@/types';
import { Card } from '@/components/ui';
import { getRelativeTime, getInitials } from '@/lib/utils';
import { Quote } from 'lucide-react';

interface WishDisplayProps {
  wishes: WeddingWish[];
  loading?: boolean;
}

export const WishDisplay: React.FC<WishDisplayProps> = ({ wishes, loading }) => {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-secondary-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary-200 rounded w-1/3" />
                <div className="h-3 bg-secondary-200 rounded w-full" />
                <div className="h-3 bg-secondary-200 rounded w-2/3" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (wishes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Quote className="w-8 h-8 text-primary-300" />
        </div>
        <h3 className="text-lg font-medium text-secondary-700 mb-2">No wishes yet</h3>
        <p className="text-secondary-500">Be the first to leave a message for the couple!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {wishes.map((wish) => (
        <WishCard key={wish.id} wish={wish} />
      ))}
    </div>
  );
};

interface WishCardProps {
  wish: WeddingWish;
}

const WishCard: React.FC<WishCardProps> = ({ wish }) => {
  const initials = getInitials(wish.guestName);
  const colors = [
    'bg-primary-100 text-primary-700',
    'bg-blush text-primary-800',
    'bg-sage/30 text-green-800',
    'bg-champagne text-amber-800',
    'bg-dustyrose/50 text-rose-800',
  ];
  const colorIndex = wish.guestName.charCodeAt(0) % colors.length;

  return (
    <Card className="relative overflow-hidden group hover:shadow-elegant transition-all duration-300" padding="md">
      {/* Decorative quote icon */}
      <div className="absolute top-2 right-2 text-primary-100 opacity-50">
        <Quote className="w-8 h-8" />
      </div>

      <div className="relative">
        {/* Guest Info */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${colors[colorIndex]}`}
          >
            {initials}
          </div>
          <div>
            <h4 className="font-medium text-secondary-800">{wish.guestName}</h4>
            <p className="text-xs text-secondary-400">{getRelativeTime(wish.createdAt)}</p>
          </div>
        </div>

        {/* Message */}
        <p className="text-secondary-600 text-sm leading-relaxed">{wish.message}</p>
      </div>
    </Card>
  );
};
