'use client';

import React, { useEffect, useState, useMemo } from 'react';

interface FloatingPetal {
    id: number;
    x: number;
    size: number;
    delay: number;
    duration: number;
    opacity: number;
    type: 'petal' | 'heart' | 'star';
}

interface FloatingPetalsProps {
    count?: number;
    colors?: string[];
    types?: Array<'petal' | 'heart' | 'star'>;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
    count = 15,
    colors = ['#FFB6C1', '#FFC0CB', '#FFE4E1', '#F0E6FA'],
    types = ['petal', 'heart'],
}) => {
    const petals = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: 10 + Math.random() * 15,
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 20,
            opacity: 0.3 + Math.random() * 0.5,
            type: types[Math.floor(Math.random() * types.length)],
        }));
    }, [count, types]);

    const renderShape = (petal: FloatingPetal, color: string) => {
        switch (petal.type) {
            case 'heart':
                return (
                    <svg
                        viewBox="0 0 24 24"
                        width={petal.size}
                        height={petal.size}
                        fill={color}
                        style={{ opacity: petal.opacity }}
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                );
            case 'star':
                return (
                    <svg
                        viewBox="0 0 24 24"
                        width={petal.size}
                        height={petal.size}
                        fill={color}
                        style={{ opacity: petal.opacity }}
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                );
            default: // petal
                return (
                    <div
                        className="rounded-full"
                        style={{
                            width: petal.size,
                            height: petal.size * 1.5,
                            backgroundColor: color,
                            opacity: petal.opacity,
                            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                        }}
                    />
                );
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="absolute animate-float-fall"
                    style={{
                        left: `${petal.x}%`,
                        top: '-50px',
                        animationDelay: `${petal.delay}s`,
                        animationDuration: `${petal.duration}s`,
                    }}
                >
                    <div className="animate-float-sway">
                        {renderShape(petal, colors[Math.floor(Math.random() * colors.length)])}
                    </div>
                </div>
            ))}

            <style jsx>{`
        @keyframes float-fall {
          0% {
            transform: translateY(-50px) translateX(0);
          }
          25% {
            transform: translateY(25vh) translateX(20px);
          }
          50% {
            transform: translateY(50vh) translateX(-20px);
          }
          75% {
            transform: translateY(75vh) translateX(10px);
          }
          100% {
            transform: translateY(110vh) translateX(-10px);
          }
        }
        
        @keyframes float-sway {
          0%, 100% {
            transform: rotate(-15deg) scale(1);
          }
          50% {
            transform: rotate(15deg) scale(1.1);
          }
        }
        
        .animate-float-fall {
          animation: float-fall linear infinite;
        }
        
        .animate-float-sway {
          animation: float-sway 3s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default FloatingPetals;
