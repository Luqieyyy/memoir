'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
    brideName?: string;
    groomName?: string;
    minDuration?: number;
    onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
    brideName = 'Mr',
    groomName = 'Mrs',
    minDuration = 2000,
    onComplete,
}) => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / minDuration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsVisible(false);
                    onComplete?.();
                }, 500);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [minDuration, onComplete]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cream via-white to-primary-50 transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative text-center px-8">
                {/* Animated Rings */}
                <div className="relative w-40 h-40 mx-auto mb-8">
                    {/* Outer ring */}
                    <div
                        className="absolute inset-0 rounded-full border-4 border-primary-100 animate-spin"
                        style={{ animationDuration: '8s' }}
                    />
                    {/* Middle ring */}
                    <div
                        className="absolute inset-3 rounded-full border-4 border-primary-200 animate-spin"
                        style={{ animationDuration: '6s', animationDirection: 'reverse' }}
                    />
                    {/* Inner ring */}
                    <div
                        className="absolute inset-6 rounded-full border-4 border-primary-300 animate-spin"
                        style={{ animationDuration: '4s' }}
                    />

                    {/* Center heart */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <Heart
                                className="w-12 h-12 text-primary-500 fill-primary-500 animate-pulse"
                            />
                            {/* Glow effect */}
                            <div className="absolute inset-0 blur-xl opacity-50">
                                <Heart className="w-12 h-12 text-primary-500 fill-primary-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Names */}
                <div className="mb-6">
                    <h1 className="text-3xl font-display font-bold text-secondary-800 mb-2">
                        <span className="inline-block animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            {brideName}
                        </span>
                        <span className="mx-3 text-primary-400">&</span>
                        <span className="inline-block animate-fade-in" style={{ animationDelay: '0.5s' }}>
                            {groomName}
                        </span>
                    </h1>
                    <p className="text-secondary-500 text-sm animate-fade-in" style={{ animationDelay: '0.7s' }}>
                        Sila tunggu sebentar...
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 mx-auto">
                    <div className="h-1.5 bg-primary-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-100 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-xs text-secondary-400 mt-2">
                        {Math.round(progress)}%
                    </p>
                </div>

                {/* Floating hearts decoration */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <Heart
                            key={i}
                            className="absolute text-primary-200 fill-primary-200 animate-float"
                            style={{
                                left: `${15 + Math.random() * 70}%`,
                                bottom: '-20px',
                                width: `${16 + Math.random() * 16}px`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;
