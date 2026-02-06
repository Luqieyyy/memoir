'use client';

import React from 'react';
import { WeddingEvent } from '@/types';
import { formatDate, getDaysUntil, isDateInPast, isToday } from '@/lib/utils';
import { Calendar, MapPin, Heart } from 'lucide-react';
import { useThemeContext } from './ThemeProvider';

interface WeddingHeroProps {
  event: WeddingEvent;
}

// Safe hook to access theme context without throwing
const useSafeTheme = () => {
  try {
    return useThemeContext();
  } catch {
    return null;
  }
};

export const WeddingHero: React.FC<WeddingHeroProps> = ({ event }) => {
  const isPast = isDateInPast(event.weddingDate);
  const isWeddingToday = isToday(event.weddingDate);
  const daysUntil = getDaysUntil(event.weddingDate);

  const themeContext = useSafeTheme();
  const theme = themeContext?.theme;

  const getCountdownText = () => {
    if (isWeddingToday) return "It's the big day! 🎉";
    if (isPast) return 'Celebrating their love';
    if (daysUntil === 1) return 'Tomorrow is the day!';
    return `${daysUntil} days until the celebration`;
  };

  // Determine styles based on theme or defaults
  const containerStyle: React.CSSProperties = theme?.hero.backgroundImage ? {
    backgroundImage: `url(${theme.hero.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  const overlayOpacity = theme?.hero.overlayOpacity ?? 0.1;
  const showCountdown = theme?.hero.showCountdown ?? true;

  const textAlignment = theme?.hero.layout === 'left-aligned' ? 'text-left items-start' : 'text-center items-center';
  const containerAlignment = theme?.hero.layout === 'left-aligned' ? 'items-center justify-start' : 'items-center justify-center';

  return (
    <div
      className={`relative min-h-[60vh] flex ${containerAlignment} overflow-hidden`}
      style={containerStyle}
    >
      {/* Background & Overlay */}
      {theme ? (
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{ backgroundColor: theme.colors.background, opacity: 1 - overlayOpacity }} // Or use separate overlay div
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-romantic">
          {/* Default Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blush/40 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-champagne/50 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-dustyrose/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
      )}

      {/* Theme Specific Overlay if background image exists */}
      {theme?.hero.backgroundImage && (
        <div
          className="absolute inset-0 bg-black transition-opacity duration-500"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className={`relative z-10 px-4 py-12 max-w-3xl mx-auto flex flex-col ${textAlignment} w-full`}>
        {/* Decorative Heart */}
        <div className={`flex ${theme?.hero.layout === 'left-aligned' ? 'justify-start' : 'justify-center'} mb-6`}>
          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-soft backdrop-blur-sm">
            <Heart
              className="w-8 h-8 text-primary-500 fill-primary-500"
              style={theme ? { color: theme.colors.primary, fill: theme.colors.primary } : {}}
            />
          </div>
        </div>

        {/* Couple Names */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-script text-primary-800 mb-4 animate-fade-in theme-heading"
          style={theme ? { color: theme.colors.primary } : {}}
        >
          {event.brideName}
          <span
            className="block text-3xl md:text-4xl my-2 text-primary-600"
            style={theme ? { color: theme.colors.accent } : {}}
          >
            &
          </span>
          {event.groomName}
        </h1>

        {/* Decorative Line */}
        <div className={`flex items-center ${theme?.hero.layout === 'left-aligned' ? 'justify-start' : 'justify-center'} gap-4 my-6`}>
          <div className="h-px w-16 bg-primary-300" style={theme ? { backgroundColor: theme.colors.secondary } : {}} />
          <span className="text-primary-400 text-2xl" style={theme ? { color: theme.colors.secondary } : {}}>♥</span>
          <div className="h-px w-16 bg-primary-300" style={theme ? { backgroundColor: theme.colors.secondary } : {}} />
        </div>

        {/* Event Info */}
        <div className="space-y-3 text-secondary-700 animate-slide-up theme-body">
          <div className={`flex items-center ${theme?.hero.layout === 'left-aligned' ? 'justify-start' : 'justify-center'} gap-2`}>
            <Calendar className="w-5 h-5 text-primary-500" style={theme ? { color: theme.colors.primary } : {}} />
            <span className="text-lg font-medium" style={theme ? { color: theme.colors.text } : {}}>{formatDate(event.weddingDate)}</span>
          </div>

          <div className={`flex items-center ${theme?.hero.layout === 'left-aligned' ? 'justify-start' : 'justify-center'} gap-2`}>
            <MapPin className="w-5 h-5 text-primary-500" style={theme ? { color: theme.colors.primary } : {}} />
            <span className="text-lg" style={theme ? { color: theme.colors.text } : {}}>{event.venue}</span>
          </div>
        </div>

        {/* Countdown */}
        {showCountdown && (
          <div className="mt-8">
            <p
              className="inline-block px-6 py-2 bg-white/70 backdrop-blur-sm rounded-full text-primary-700 font-medium shadow-soft theme-body"
              style={theme ? { color: theme.colors.secondary, backgroundColor: `${theme.colors.background}B3` } : {}}
            >
              {getCountdownText()}
            </p>
          </div>
        )}

        {/* Welcome Message */}
        {event.welcomeMessage && (
          <div className={`mt-8 max-w-xl ${theme?.hero.layout === 'left-aligned' ? 'mr-auto' : 'mx-auto'}`}>
            <p
              className="text-secondary-600 italic text-lg leading-relaxed theme-body"
              style={theme ? { color: theme.colors.text } : {}}
            >
              "{event.welcomeMessage}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

