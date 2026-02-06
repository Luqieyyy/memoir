'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface CountdownTimerProps {
    targetDate: Date | string;
    className?: string;
    variant?: 'default' | 'elegant' | 'minimal';
    showLabels?: boolean;
    onComplete?: () => void;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
    targetDate,
    className = '',
    variant = 'default',
    showLabels = true,
    onComplete,
}) => {
    const target = useMemo(() => new Date(targetDate), [targetDate]);

    const calculateTimeLeft = (): TimeLeft => {
        const now = new Date().getTime();
        const difference = target.getTime() - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
            total: difference,
        };
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.total <= 0) {
                clearInterval(timer);
                onComplete?.();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [target, onComplete]);

    if (!isClient) {
        return (
            <div className={`flex justify-center gap-4 ${className}`}>
                {[0, 0, 0, 0].map((_, i) => (
                    <div key={i} className="w-16 h-20 bg-white/10 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    const timeUnits = [
        { value: timeLeft.days, label: 'Hari', labelEn: 'Days' },
        { value: timeLeft.hours, label: 'Jam', labelEn: 'Hours' },
        { value: timeLeft.minutes, label: 'Minit', labelEn: 'Min' },
        { value: timeLeft.seconds, label: 'Saat', labelEn: 'Sec' },
    ];

    if (variant === 'minimal') {
        return (
            <div className={`flex items-center gap-2 text-lg font-medium ${className}`}>
                <span>{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="opacity-50">:</span>
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="opacity-50">:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="opacity-50">:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
        );
    }

    if (variant === 'elegant') {
        return (
            <div className={`flex justify-center gap-3 sm:gap-6 ${className}`}>
                {timeUnits.map((unit, index) => (
                    <div key={unit.labelEn} className="relative group">
                        <div className="relative">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-primary-500/20 rounded-2xl blur-xl group-hover:bg-primary-500/30 transition-all" />

                            {/* Card */}
                            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-elegant overflow-hidden">
                                {/* Animated background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

                                {/* Number with flip animation */}
                                <div className="relative flex items-center justify-center">
                                    <span
                                        key={unit.value}
                                        className="text-3xl sm:text-5xl font-display font-bold text-white animate-flip-in"
                                    >
                                        {String(unit.value).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Label */}
                                {showLabels && (
                                    <p className="text-xs sm:text-sm text-white/70 text-center mt-2 uppercase tracking-wider">
                                        {unit.label}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Separator */}
                        {index < timeUnits.length - 1 && (
                            <div className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                                <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" />
                                <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-300" />
                            </div>
                        )}
                    </div>
                ))}

                <style jsx>{`
          @keyframes flip-in {
            0% {
              transform: rotateX(90deg);
              opacity: 0;
            }
            100% {
              transform: rotateX(0);
              opacity: 1;
            }
          }
          
          .animate-flip-in {
            animation: flip-in 0.3s ease-out;
          }
        `}</style>
            </div>
        );
    }

    // Default variant
    return (
        <div className={`flex justify-center gap-2 sm:gap-4 ${className}`}>
            {timeUnits.map((unit, index) => (
                <div key={unit.labelEn} className="text-center">
                    <div className="bg-white rounded-xl shadow-soft p-3 sm:p-4 min-w-[60px] sm:min-w-[80px]">
                        <span className="text-2xl sm:text-4xl font-display font-bold text-primary-600">
                            {String(unit.value).padStart(2, '0')}
                        </span>
                    </div>
                    {showLabels && (
                        <p className="text-xs sm:text-sm text-secondary-500 mt-2">{unit.label}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
