'use client';

import React from 'react';
import { WeddingEvent } from '@/types';
import { formatDate, getDaysUntil, isDateInPast, isToday } from '@/lib/utils';
import { Calendar, MapPin, Heart } from 'lucide-react';

interface WeddingHeroProps {
  event: WeddingEvent;
}

export const WeddingHero: React.FC<WeddingHeroProps> = ({ event }) => {
  const isPast = isDateInPast(event.weddingDate);
  const isWeddingToday = isToday(event.weddingDate);
  const daysUntil = getDaysUntil(event.weddingDate);

  const getCountdownText = () => {
    if (isWeddingToday) return "It's the big day! 🎉";
    if (isPast) return 'Celebrating their love';
    if (daysUntil === 1) return 'Tomorrow is the day!';
    return `${daysUntil} days until the celebration`;
  };

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-romantic">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blush/40 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-champagne/50 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-dustyrose/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-12 max-w-3xl mx-auto">
        {/* Decorative Heart */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-soft backdrop-blur-sm">
            <Heart className="w-8 h-8 text-primary-500 fill-primary-500" />
          </div>
        </div>

        {/* Couple Names */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-script text-primary-800 mb-4 animate-fade-in">
          {event.brideName}
          <span className="block text-3xl md:text-4xl my-2 text-primary-600">&</span>
          {event.groomName}
        </h1>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="h-px w-16 bg-primary-300" />
          <span className="text-primary-400 text-2xl">♥</span>
          <div className="h-px w-16 bg-primary-300" />
        </div>

        {/* Event Info */}
        <div className="space-y-3 text-secondary-700 animate-slide-up">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 text-primary-500" />
            <span className="text-lg font-medium">{formatDate(event.weddingDate)}</span>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-primary-500" />
            <span className="text-lg">{event.venue}</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-8">
          <p className="inline-block px-6 py-2 bg-white/70 backdrop-blur-sm rounded-full text-primary-700 font-medium shadow-soft">
            {getCountdownText()}
          </p>
        </div>

        {/* Welcome Message */}
        {event.welcomeMessage && (
          <div className="mt-8 max-w-xl mx-auto">
            <p className="text-secondary-600 italic text-lg leading-relaxed">
              "{event.welcomeMessage}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
