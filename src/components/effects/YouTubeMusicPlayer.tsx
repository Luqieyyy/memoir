'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BackgroundMusic } from '@/types';

interface YouTubeMusicPlayerProps {
    music: BackgroundMusic;
    variant?: 'floating' | 'minimal';
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

const MusicIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" fill="currentColor" />
        <circle cx="18" cy="16" r="3" fill="currentColor" />
    </svg>
);

// Extract YouTube video ID
const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
};

// YouTube Player States
const YT_PLAYING = 1;
const YT_PAUSED = 2;
const YT_ENDED = 0;

export const YouTubeMusicPlayer: React.FC<YouTubeMusicPlayerProps> = ({
    music,
    variant = 'floating',
    className = '',
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const playerRef = useRef<unknown>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const videoId = extractYouTubeId(music.youtubeUrl);

    // Load YouTube IFrame API
    useEffect(() => {
        if (!videoId || !music.enabled) return;

        const loadYouTubeAPI = () => {
            // Check if API is already loaded
            const win = window as unknown as { YT?: { Player?: unknown; PlayerState?: { PLAYING: number; PAUSED: number; ENDED: number } }; onYouTubeIframeAPIReady?: () => void };

            if (win.YT && win.YT.Player) {
                initializePlayer();
                return;
            }

            // Load the API
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            win.onYouTubeIframeAPIReady = () => {
                initializePlayer();
            };
        };

        loadYouTubeAPI();

        return () => {
            const player = playerRef.current as { destroy?: () => void } | null;
            if (player && player.destroy) {
                player.destroy();
            }
            if (checkIntervalRef.current) {
                clearInterval(checkIntervalRef.current);
            }
        };
    }, [videoId, music.enabled]);

    const initializePlayer = useCallback(() => {
        if (!videoId) return;

        const win = window as unknown as { YT?: { Player: new (id: string, config: unknown) => unknown } };
        if (!win.YT || !win.YT.Player) return;

        // Create a hidden div for the player
        const playerId = 'youtube-music-player';
        let playerDiv = document.getElementById(playerId);

        if (!playerDiv) {
            playerDiv = document.createElement('div');
            playerDiv.id = playerId;
            playerDiv.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;';
            document.body.appendChild(playerDiv);
        }

        playerRef.current = new win.YT.Player(playerId, {
            videoId: videoId,
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                playsinline: 1,
                start: music.startTime || 0,
                end: music.endTime || undefined,
                loop: 1,
                playlist: videoId,
            },
            events: {
                onReady: (event: { target: { setVolume: (v: number) => void } }) => {
                    setIsReady(true);
                    event.target.setVolume(music.volume);
                },
                onStateChange: (event: { data: number; target: { seekTo: (t: number, a: boolean) => void; playVideo: () => void } }) => {
                    if (event.data === YT_PLAYING) {
                        setIsPlaying(true);
                    } else if (event.data === YT_PAUSED) {
                        setIsPlaying(false);
                    } else if (event.data === YT_ENDED) {
                        // Loop back to start time
                        if (music.startTime > 0) {
                            event.target.seekTo(music.startTime, true);
                            event.target.playVideo();
                        }
                    }
                },
            },
        });

        // Set up interval to check and loop at endTime
        if (music.endTime > 0) {
            checkIntervalRef.current = setInterval(() => {
                const player = playerRef.current as { getCurrentTime?: () => number; seekTo?: (t: number, a: boolean) => void } | null;
                if (player && player.getCurrentTime && player.seekTo && isPlaying) {
                    const currentTime = player.getCurrentTime();
                    if (currentTime >= music.endTime) {
                        player.seekTo(music.startTime || 0, true);
                    }
                }
            }, 1000);
        }
    }, [videoId, music.startTime, music.endTime, music.volume, isPlaying]);

    // Handle user interaction for autoplay
    useEffect(() => {
        const handleFirstInteraction = () => {
            setHasUserInteracted(true);
            const player = playerRef.current as { playVideo?: () => void } | null;
            if (isReady && player && player.playVideo && music.enabled) {
                player.playVideo();
            }
        };

        document.addEventListener('click', handleFirstInteraction, { once: true });
        document.addEventListener('touchstart', handleFirstInteraction, { once: true });

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, [isReady, music.enabled]);

    const togglePlay = () => {
        const player = playerRef.current as { pauseVideo?: () => void; playVideo?: () => void } | null;
        if (!player || !isReady) return;

        if (isPlaying) {
            if (player.pauseVideo) player.pauseVideo();
        } else {
            if (player.playVideo) player.playVideo();
        }
    };

    // Don't render if music not enabled or no valid video
    if (!music.enabled || !videoId) {
        return null;
    }

    if (variant === 'minimal') {
        return (
            <div ref={containerRef}>
                <button
                    onClick={togglePlay}
                    disabled={!isReady}
                    className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all disabled:opacity-50 ${className}`}
                >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
            </div>
        );
    }

    // Floating variant (default)
    return (
        <div ref={containerRef} className={`fixed bottom-6 right-6 z-40 ${className}`}>
            <div className="relative group">
                <button
                    onClick={togglePlay}
                    disabled={!isReady}
                    className={`
            relative w-14 h-14 rounded-full shadow-elegant flex items-center justify-center
            transition-all duration-300 overflow-hidden disabled:opacity-50
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

                {/* Tooltip */}
                {!hasUserInteracted && isReady && (
                    <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-secondary-800 text-white text-xs rounded-lg whitespace-nowrap animate-bounce">
                        Klik untuk mainkan muzik 🎵
                    </div>
                )}
            </div>
        </div>
    );
};

export default YouTubeMusicPlayer;
