'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SectionBackgroundConfig } from '@/types';

interface SectionBackgroundProps {
    config?: SectionBackgroundConfig;
    children: React.ReactNode;
    className?: string;
    sectionId?: string;
}

export const SectionBackground: React.FC<SectionBackgroundProps> = ({
    config,
    children,
    className = '',
    sectionId,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<number>(0);

    // Handle slideshow/carousel auto-scroll
    useEffect(() => {
        if (!config?.enabled || !config.images?.length) return;
        if (config.layout !== 'slideshow' && config.layout !== 'carousel') return;
        if (!config.autoScroll) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % config.images.length);
        }, (11 - config.scrollSpeed) * 1000); // slower speed = longer interval

        return () => clearInterval(interval);
    }, [config]);

    // Parallax effect
    useEffect(() => {
        if (!config?.enabled || config.layout !== 'parallax') return;

        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            scrollRef.current = Math.max(0, Math.min(1, scrollPercent)) * 50;

            const bgElement = containerRef.current.querySelector('.parallax-bg') as HTMLElement;
            if (bgElement) {
                bgElement.style.transform = `translateY(${scrollRef.current}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [config]);

    // Preload images
    useEffect(() => {
        if (!config?.enabled || !config.images?.length) return;

        const loadImages = async () => {
            const promises = config.images.map((img) => {
                return new Promise((resolve) => {
                    const image = new Image();
                    image.onload = resolve;
                    image.onerror = resolve;
                    image.src = img.url;
                });
            });
            await Promise.all(promises);
            setIsLoaded(true);
        };

        loadImages();
    }, [config]);

    // If no config or not enabled, just render children
    if (!config?.enabled || !config.images?.length) {
        return <div className={className}>{children}</div>;
    }

    const overlayStyle = {
        backgroundColor: config.overlayColor || '#000000',
        opacity: (config.overlayOpacity || 0) / 100,
    };

    const renderBackground = () => {
        switch (config.layout) {
            case 'single':
                return (
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
                        style={{
                            backgroundImage: `url(${config.images[0].url})`,
                            opacity: config.opacity / 100,
                        }}
                    />
                );

            case 'carousel':
                return (
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="flex h-full transition-transform duration-1000 ease-in-out"
                            style={{
                                width: `${config.images.length * 100}%`,
                                transform: `translateX(-${currentImageIndex * (100 / config.images.length)}%)`,
                            }}
                        >
                            {config.images.map((img, index) => (
                                <div
                                    key={img.id}
                                    className="h-full bg-cover bg-center bg-no-repeat flex-shrink-0"
                                    style={{
                                        width: `${100 / config.images.length}%`,
                                        backgroundImage: `url(${img.url})`,
                                        opacity: config.opacity / 100,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Carousel Indicators */}
                        {config.images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                                {config.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                                                ? 'bg-white w-6'
                                                : 'bg-white/50 hover:bg-white/75'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );

            case 'slideshow':
                return (
                    <div className="absolute inset-0 overflow-hidden">
                        {config.images.map((img, index) => (
                            <div
                                key={img.id}
                                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                    }`}
                                style={{
                                    backgroundImage: `url(${img.url})`,
                                    opacity: index === currentImageIndex ? config.opacity / 100 : 0,
                                }}
                            />
                        ))}

                        {/* Progress Bar */}
                        {config.autoScroll && config.images.length > 1 && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                <div
                                    className="h-full bg-white/60 transition-all"
                                    style={{
                                        width: `${((currentImageIndex + 1) / config.images.length) * 100}%`,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                );

            case 'parallax':
                return (
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="parallax-bg absolute inset-[-50px] bg-cover bg-center bg-no-repeat transition-transform duration-100"
                            style={{
                                backgroundImage: `url(${config.images[0].url})`,
                                opacity: config.opacity / 100,
                            }}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            {/* Background Layer */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {renderBackground()}

                {/* Overlay */}
                <div className="absolute inset-0" style={overlayStyle} />
            </div>

            {/* Content Layer */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default SectionBackground;
