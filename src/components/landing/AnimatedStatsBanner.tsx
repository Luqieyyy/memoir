'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Users, Calendar, Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatItem {
    icon: React.ReactNode;
    value: number;
    labelBm: string;
    labelEn: string;
    suffix?: string;
    prefix?: string;
}

interface AnimatedStatsBannerProps {
    stats?: StatItem[];
    className?: string;
}

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [end, duration, start]);

    return count;
};

const defaultStats: StatItem[] = [
    {
        icon: <Heart className="w-6 h-6" />,
        value: 500,
        labelBm: 'Pasangan Gembira',
        labelEn: 'Happy Couples',
        suffix: '+',
    },
    {
        icon: <Users className="w-6 h-6" />,
        value: 25000,
        labelBm: 'Tetamu Berkongsi',
        labelEn: 'Guests Shared',
        suffix: '+',
    },
    {
        icon: <Calendar className="w-6 h-6" />,
        value: 1200,
        labelBm: 'Event Dicipta',
        labelEn: 'Events Created',
        suffix: '+',
    },
    {
        icon: <Camera className="w-6 h-6" />,
        value: 50000,
        labelBm: 'Foto Dikumpul',
        labelEn: 'Photos Collected',
        suffix: '+',
    },
];

export const AnimatedStatsBanner: React.FC<AnimatedStatsBannerProps> = ({
    stats = defaultStats,
    className = '',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`relative py-16 overflow-hidden ${className}`}
        >
            {/* Background — dark gradient with rose-gold accents */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-950 via-secondary-900 to-secondary-950" />

            {/* Top & bottom borders */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400/20 to-transparent" />

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary-400/5 rounded-full blur-[100px]" />

            <div className="relative max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            stat={stat}
                            isVisible={isVisible}
                            delay={index * 200}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

interface StatCardProps {
    stat: StatItem;
    isVisible: boolean;
    delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, isVisible, delay }) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const count = useCountUp(stat.value, 2000, shouldAnimate);
    const { language } = useLanguage();

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => setShouldAnimate(true), delay);
            return () => clearTimeout(timer);
        }
    }, [isVisible, delay]);

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
        }
        return num.toString();
    };

    return (
        <div
            className={`text-center transition-all duration-700 ${shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
        >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-400/10 text-primary-400 mb-4 border border-primary-400/10">
                {stat.icon}
            </div>
            <div className="text-3xl md:text-4xl font-display font-bold text-ivory mb-1">
                {stat.prefix}
                {formatNumber(count)}
                {stat.suffix}
            </div>
            <div className="text-sm text-muted">
                {language === 'bm' ? stat.labelBm : stat.labelEn}
            </div>
        </div>
    );
};

export default AnimatedStatsBanner;
