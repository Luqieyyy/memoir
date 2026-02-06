'use client';

import React, { useState } from 'react';
import { TimelineEvent } from '@/types';
import { Clock, MapPin, Heart, Camera, Sparkles } from 'lucide-react';

interface WeddingTimelineProps {
    events: TimelineEvent[];
    className?: string;
    variant?: 'vertical' | 'horizontal';
}

const iconMap: Record<string, React.ReactNode> = {
    // New generic icons
    clock: <Clock className="w-5 h-5" />,
    'map-pin': <MapPin className="w-5 h-5" />,
    heart: <Heart className="w-5 h-5" />,
    camera: <Camera className="w-5 h-5" />,
    sparkles: <Sparkles className="w-5 h-5" />,

    utensils: <Heart className="w-5 h-5" />,

    // Legacy specific icons
    ceremony: <Heart className="w-5 h-5" />,
    reception: <Sparkles className="w-5 h-5" />,
    photo: <Camera className="w-5 h-5" />,
    music: <Sparkles className="w-5 h-5" />,
    dinner: <Heart className="w-5 h-5" />,
    custom: <Clock className="w-5 h-5" />,
};

export const WeddingTimeline: React.FC<WeddingTimelineProps> = ({
    events,
    className = '',
    variant = 'vertical',
}) => {
    const [activeEvent, setActiveEvent] = useState<string | null>(null);

    if (variant === 'horizontal') {
        return (
            <div className={`relative ${className}`}>
                {/* Timeline line */}
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

                <div className="flex justify-between overflow-x-auto pb-4 gap-4">
                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            className="flex flex-col items-center min-w-[120px] group"
                            onMouseEnter={() => setActiveEvent(event.id)}
                            onMouseLeave={() => setActiveEvent(null)}
                        >
                            {/* Icon */}
                            <div
                                className={`
                  relative z-10 w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-300 shadow-soft
                  ${activeEvent === event.id
                                        ? 'bg-primary-500 text-white scale-110'
                                        : 'bg-white text-primary-500'
                                    }
                `}
                            >
                                {iconMap[event.icon || 'custom']}

                                {/* Pulse animation for active */}
                                {activeEvent === event.id && (
                                    <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-30" />
                                )}
                            </div>

                            {/* Time */}
                            <p className="mt-3 text-sm font-semibold text-primary-600">{event.time}</p>

                            {/* Title */}
                            <p className="text-sm font-medium text-secondary-800 text-center mt-1">
                                {event.title}
                            </p>

                            {/* Description on hover */}
                            {event.description && activeEvent === event.id && (
                                <p className="text-xs text-secondary-500 text-center mt-1 animate-fade-in">
                                    {event.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Vertical variant (default)
    return (
        <div className={`relative ${className}`}>
            {/* Central line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200 transform sm:-translate-x-1/2" />

            <div className="space-y-8">
                {events.map((event, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                        <div
                            key={event.id}
                            className={`
                relative flex items-start gap-4
                ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}
              `}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Content Card */}
                            <div
                                className={`
                  flex-1 ml-16 sm:ml-0
                  ${isLeft ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'}
                `}
                            >
                                <div
                                    className={`
                    bg-white rounded-2xl shadow-soft p-4 sm:p-5 
                    hover:shadow-elegant transition-all duration-300
                    animate-fade-in-up group
                    ${isLeft ? 'sm:mr-auto' : 'sm:ml-auto'}
                    max-w-sm
                  `}
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    {/* Time badge */}
                                    <div
                                        className={`
                      inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
                      bg-primary-50 text-primary-600 text-sm font-medium mb-2
                    `}
                                    >
                                        <Clock className="w-3.5 h-3.5" />
                                        {event.time}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-secondary-800 mb-1">
                                        {event.title}
                                    </h3>

                                    {/* Description */}
                                    {event.description && (
                                        <p className="text-secondary-500 text-sm mb-2">
                                            {event.description}
                                        </p>
                                    )}

                                    {/* Location */}
                                    {event.location && (
                                        <div className="flex items-center gap-1.5 text-secondary-400 text-xs">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Center Icon */}
                            <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 z-10">
                                <div
                                    className={`
                    w-12 h-12 rounded-full bg-white shadow-elegant 
                    flex items-center justify-center text-primary-500
                    group-hover:bg-primary-500 group-hover:text-white
                    transition-all duration-300
                  `}
                                >
                                    {iconMap[event.icon || 'custom']}
                                </div>
                            </div>

                            {/* Spacer for opposite side */}
                            <div className="hidden sm:block flex-1" />
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
        </div>
    );
};

// Default timeline events for Malaysian weddings
export const DEFAULT_WEDDING_TIMELINE: TimelineEvent[] = [
    {
        id: '1',
        time: '10:00 AM',
        title: 'Akad Nikah',
        description: 'Upacara pernikahan rasmi',
        location: 'Dewan Utama',
        icon: 'ceremony',
    },
    {
        id: '2',
        time: '12:00 PM',
        title: 'Sesi Bergambar',
        description: 'Foto keluarga dan tetamu',
        location: 'Taman Bunga',
        icon: 'photo',
    },
    {
        id: '3',
        time: '1:00 PM',
        title: 'Jamuan Makan',
        description: 'Hidangan untuk tetamu',
        location: 'Dewan Makan',
        icon: 'dinner',
    },
    {
        id: '4',
        time: '3:00 PM',
        title: 'Majlis Bersanding',
        description: 'Upacara bersanding pengantin',
        location: 'Pelamin Utama',
        icon: 'ceremony',
    },
    {
        id: '5',
        time: '5:00 PM',
        title: 'Persembahan & Hiburan',
        description: 'Persembahan istimewa',
        location: 'Dewan Utama',
        icon: 'music',
    },
];

export default WeddingTimeline;
