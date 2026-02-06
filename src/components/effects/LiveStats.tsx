'use client';

import React from 'react';
import { Heart, Users, Camera, MessageSquare, Calendar, TrendingUp } from 'lucide-react';

interface LiveStatsProps {
    wishes: number;
    photos: number;
    rsvpConfirmed: number;
    rsvpTotal: number;
    daysLeft: number;
    variant?: 'horizontal' | 'vertical' | 'grid';
    className?: string;
    animated?: boolean;
}

export const LiveStats: React.FC<LiveStatsProps> = ({
    wishes,
    photos,
    rsvpConfirmed,
    rsvpTotal,
    daysLeft,
    variant = 'horizontal',
    className = '',
    animated = true,
}) => {
    const stats = [
        {
            icon: <MessageSquare className="w-5 h-5" />,
            value: wishes,
            label: 'Ucapan',
            color: 'from-rose-400 to-pink-500',
            bgColor: 'bg-rose-50',
            textColor: 'text-rose-600',
        },
        {
            icon: <Camera className="w-5 h-5" />,
            value: photos,
            label: 'Foto',
            color: 'from-violet-400 to-purple-500',
            bgColor: 'bg-violet-50',
            textColor: 'text-violet-600',
        },
        {
            icon: <Users className="w-5 h-5" />,
            value: rsvpConfirmed,
            label: 'Hadir',
            suffix: `/${rsvpTotal}`,
            color: 'from-emerald-400 to-green-500',
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-600',
        },
        {
            icon: <Calendar className="w-5 h-5" />,
            value: daysLeft,
            label: daysLeft <= 0 ? 'Hari Ini!' : 'Hari Lagi',
            color: 'from-amber-400 to-orange-500',
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600',
        },
    ];

    if (variant === 'vertical') {
        return (
            <div className={`space-y-3 ${className}`}>
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`flex items-center gap-4 p-4 bg-white rounded-xl shadow-soft ${animated ? 'animate-fade-in-up' : ''
                            }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                            {stat.icon}
                        </div>
                        <div className="flex-1">
                            <p className="text-2xl font-bold text-secondary-800">
                                {stat.value}
                                {stat.suffix && <span className="text-secondary-400 text-lg">{stat.suffix}</span>}
                            </p>
                            <p className="text-sm text-secondary-500">{stat.label}</p>
                        </div>
                        {animated && (
                            <TrendingUp className="w-4 h-4 text-emerald-500 animate-pulse" />
                        )}
                    </div>
                ))}
            </div>
        );
    }

    if (variant === 'grid') {
        return (
            <div className={`grid grid-cols-2 gap-3 ${className}`}>
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`relative p-4 bg-white rounded-2xl shadow-soft overflow-hidden group ${animated ? 'animate-fade-in-up' : ''
                            }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Background gradient on hover */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                        />

                        <div className={`inline-flex p-2 rounded-lg ${stat.bgColor} ${stat.textColor} mb-2`}>
                            {stat.icon}
                        </div>

                        <p className="text-2xl font-bold text-secondary-800">
                            <span className={`${animated ? 'animate-count-up' : ''}`}>
                                {stat.value}
                            </span>
                            {stat.suffix && <span className="text-secondary-400 text-base">{stat.suffix}</span>}
                        </p>
                        <p className="text-xs text-secondary-500">{stat.label}</p>
                    </div>
                ))}
            </div>
        );
    }

    // Horizontal variant (default)
    return (
        <div className={`flex flex-wrap justify-center gap-4 sm:gap-6 ${className}`}>
            {stats.map((stat, index) => (
                <div
                    key={stat.label}
                    className={`flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-soft ${animated ? 'animate-fade-in-up' : ''
                        }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className={`p-2 rounded-full bg-gradient-to-br ${stat.color} text-white`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-lg font-bold text-secondary-800 leading-tight">
                            {stat.value}
                            {stat.suffix && <span className="text-secondary-400 text-sm">{stat.suffix}</span>}
                        </p>
                        <p className="text-xs text-secondary-500">{stat.label}</p>
                    </div>
                </div>
            ))}

            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
        </div>
    );
};

export default LiveStats;
