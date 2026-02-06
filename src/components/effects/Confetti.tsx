'use client';

import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
    id: number;
    x: number;
    color: string;
    delay: number;
    duration: number;
    rotation: number;
}

interface ConfettiProps {
    active: boolean;
    duration?: number;
    particleCount?: number;
}

export const Confetti: React.FC<ConfettiProps> = ({
    active,
    duration = 3000,
    particleCount = 50,
}) => {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    const colors = [
        '#FFD700', // Gold
        '#FF69B4', // Pink
        '#87CEEB', // Sky Blue
        '#98FB98', // Pale Green
        '#DDA0DD', // Plum
        '#F0E68C', // Khaki
        '#FFB6C1', // Light Pink
        '#E6E6FA', // Lavender
    ];

    useEffect(() => {
        if (active) {
            const newPieces: ConfettiPiece[] = Array.from({ length: particleCount }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 0.5,
                duration: 2 + Math.random() * 2,
                rotation: Math.random() * 360,
            }));
            setPieces(newPieces);
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [active, duration, particleCount]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {pieces.map((piece) => (
                <div
                    key={piece.id}
                    className="absolute animate-confetti-fall"
                    style={{
                        left: `${piece.x}%`,
                        top: '-20px',
                        animationDelay: `${piece.delay}s`,
                        animationDuration: `${piece.duration}s`,
                    }}
                >
                    <div
                        className="w-3 h-3 animate-confetti-spin"
                        style={{
                            backgroundColor: piece.color,
                            transform: `rotate(${piece.rotation}deg)`,
                            borderRadius: Math.random() > 0.5 ? '50%' : '0',
                        }}
                    />
                </div>
            ))}

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes confetti-spin {
          0% { transform: rotateY(0deg) rotateX(0deg); }
          50% { transform: rotateY(180deg) rotateX(180deg); }
          100% { transform: rotateY(360deg) rotateX(360deg); }
        }
        
        .animate-confetti-fall {
          animation: confetti-fall linear forwards;
        }
        
        .animate-confetti-spin {
          animation: confetti-spin 1s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Confetti;
