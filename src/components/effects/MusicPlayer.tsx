'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface MusicPlayerProps {
    src?: string;
    autoPlay?: boolean;
    loop?: boolean;
    showVolume?: boolean;
    variant?: 'floating' | 'inline' | 'minimal';
    className?: string;
}

// Custom SVG Icons
const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const PauseIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
);

const VolumeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
);

const MuteIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
);

const MusicIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" fill="currentColor" />
        <circle cx="18" cy="16" r="3" fill="currentColor" />
    </svg>
);

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
    src = '/audio/wedding-bg.mp3',
    autoPlay = false,
    loop = true,
    showVolume = true,
    variant = 'floating',
    className = '',
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const handleFirstInteraction = () => {
            if (autoPlay && !hasInteracted) {
                setHasInteracted(true);
                handlePlay();
            }
        };

        document.addEventListener('click', handleFirstInteraction, { once: true });
        return () => document.removeEventListener('click', handleFirstInteraction);
    }, [autoPlay, hasInteracted]);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                console.log('Autoplay prevented');
            });
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume === 0) {
            setIsMuted(true);
        } else if (isMuted) {
            setIsMuted(false);
        }
    };

    if (variant === 'minimal') {
        return (
            <>
                <audio ref={audioRef} src={src} loop={loop} />
                <button
                    onClick={togglePlay}
                    className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all ${className}`}
                >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
            </>
        );
    }

    if (variant === 'inline') {
        return (
            <div className={`flex items-center gap-3 ${className}`}>
                <audio ref={audioRef} src={src} loop={loop} />

                <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-all shadow-soft"
                >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>

                {showVolume && (
                    <div className="flex items-center gap-2">
                        <button onClick={toggleMute} className="text-secondary-500 hover:text-primary-500 transition-colors">
                            {isMuted ? <MuteIcon /> : <VolumeIcon />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-20 accent-primary-500"
                        />
                    </div>
                )}
            </div>
        );
    }

    // Floating variant (default)
    return (
        <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
            <audio ref={audioRef} src={src} loop={loop} />

            <div className="relative group">
                <button
                    onClick={togglePlay}
                    className={`
            relative w-14 h-14 rounded-full shadow-elegant flex items-center justify-center
            transition-all duration-300 overflow-hidden
            ${isPlaying
                            ? 'bg-gradient-to-br from-primary-400 to-primary-600'
                            : 'bg-white hover:bg-primary-50'
                        }
          `}
                >
                    {isPlaying && (
                        <>
                            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                            <div className="absolute inset-2 rounded-full border border-white/20 animate-pulse" />
                        </>
                    )}

                    <div className={`relative z-10 ${isPlaying ? 'text-white' : 'text-primary-600'}`}>
                        {isPlaying ? (
                            <div className="flex items-center gap-0.5">
                                <div className="w-1 h-4 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1 h-4 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1 h-4 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        ) : (
                            <MusicIcon />
                        )}
                    </div>
                </button>

                {showVolume && (
                    <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                        <div className="bg-white rounded-2xl shadow-elegant p-3 flex flex-col items-center gap-2">
                            <button
                                onClick={toggleMute}
                                className="text-secondary-500 hover:text-primary-500 transition-colors"
                            >
                                {isMuted ? <MuteIcon /> : <VolumeIcon />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-16 accent-primary-500"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MusicPlayer;
