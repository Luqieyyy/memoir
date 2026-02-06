'use client';

import React, { useState, useEffect } from 'react';
import { BackgroundMusic } from '@/types';
import { Button, Input, Card } from '@/components/ui';
import { Clock, Check, AlertCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

// Custom SVG Icons
const PlayIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M8 5v14l11-7z" />
    </svg>
);

const PauseIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
);

const VolumeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
);

interface MusicSettingsProps {
    initialSettings?: BackgroundMusic;
    onSave: (settings: BackgroundMusic) => Promise<void>;
}

// Extract YouTube video ID from various URL formats
const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;

    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }

    return null;
};

// Convert MM:SS to seconds
const timeToSeconds = (time: string): number => {
    if (!time) return 0;
    const parts = time.split(':').map(Number);
    if (parts.length === 2) {
        return (parts[0] * 60) + parts[1];
    }
    return parseInt(time) || 0;
};

// Convert seconds to MM:SS
const secondsToTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const DEFAULT_SETTINGS: BackgroundMusic = {
    youtubeUrl: '',
    startTime: 0,
    endTime: 0,
    enabled: false,
    volume: 50
};

export const MusicSettings: React.FC<MusicSettingsProps> = ({
    initialSettings,
    onSave,
}) => {
    const [settings, setSettings] = useState<BackgroundMusic>(initialSettings || DEFAULT_SETTINGS);
    const [startTimeInput, setStartTimeInput] = useState(secondsToTime(settings.startTime));
    const [endTimeInput, setEndTimeInput] = useState(secondsToTime(settings.endTime));
    const [saving, setSaving] = useState(false);
    const [videoId, setVideoId] = useState<string | null>(null);
    const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

    // Update video ID when URL changes
    useEffect(() => {
        const id = extractYouTubeId(settings.youtubeUrl);
        setVideoId(id);
    }, [settings.youtubeUrl]);

    // Update seconds when time inputs change
    useEffect(() => {
        setSettings(prev => ({
            ...prev,
            startTime: timeToSeconds(startTimeInput),
            endTime: timeToSeconds(endTimeInput)
        }));
    }, [startTimeInput, endTimeInput]);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setSettings(prev => ({ ...prev, youtubeUrl: url }));
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseInt(e.target.value);
        setSettings(prev => ({ ...prev, volume }));
    };

    const handleToggleEnabled = () => {
        setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
    };

    const handleSave = async () => {
        // Validation
        if (settings.enabled && !videoId) {
            toast.error('Sila masukkan URL YouTube yang sah');
            return;
        }

        if (settings.endTime > 0 && settings.startTime >= settings.endTime) {
            toast.error('Masa mula mesti lebih awal dari masa tamat');
            return;
        }

        setSaving(true);
        try {
            await onSave(settings);
            toast.success('Tetapan muzik berjaya disimpan!');
        } catch (error) {
            toast.error('Gagal menyimpan tetapan muzik');
        } finally {
            setSaving(false);
        }
    };

    const getPreviewUrl = () => {
        if (!videoId) return null;
        let url = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1`;
        if (settings.startTime > 0) url += `&start=${settings.startTime}`;
        if (settings.endTime > 0) url += `&end=${settings.endTime}`;
        return url;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-secondary-800">Muzik Latar Belakang</h3>
                    <p className="text-sm text-secondary-500">Tambah lagu YouTube sebagai muzik latar majlis anda</p>
                </div>
                <Button
                    onClick={handleSave}
                    loading={saving}
                    icon={<Check className="w-4 h-4" />}
                >
                    Simpan
                </Button>
            </div>

            {/* Enable Toggle */}
            <Card padding="md" className="bg-gradient-to-r from-primary-50 to-pink-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${settings.enabled ? 'bg-primary-500 text-white' : 'bg-secondary-200 text-secondary-500'}`}>
                            <VolumeIcon />
                        </div>
                        <div>
                            <p className="font-medium text-secondary-800">Aktifkan Muzik</p>
                            <p className="text-sm text-secondary-500">
                                {settings.enabled ? 'Tetamu akan mendengar muzik' : 'Muzik dimatikan'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleToggleEnabled}
                        className={`relative w-14 h-7 rounded-full transition-colors ${settings.enabled ? 'bg-primary-500' : 'bg-secondary-300'}`}
                    >
                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings.enabled ? 'translate-x-8' : 'translate-x-1'}`} />
                    </button>
                </div>
            </Card>

            {/* YouTube URL Input */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        URL YouTube
                    </label>
                    <Input
                        value={settings.youtubeUrl}
                        onChange={handleUrlChange}
                        placeholder="https://www.youtube.com/watch?v=... atau https://youtu.be/..."
                        className="font-mono text-sm"
                    />
                    {settings.youtubeUrl && !videoId && (
                        <div className="flex items-center gap-2 mt-2 text-amber-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>URL tidak sah. Sila guna link YouTube yang betul.</span>
                        </div>
                    )}
                    {videoId && (
                        <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
                            <Check className="w-4 h-4" />
                            <span>Video ID: {videoId}</span>
                        </div>
                    )}

                    {/* Popular Song Suggestions */}
                    {!videoId && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-primary-50 to-pink-50 rounded-lg">
                            <p className="text-sm font-medium text-secondary-700 mb-3">💡 Cadangan Lagu Popular:</p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { name: 'Perfect - Ed Sheeran', id: '2Vv-BfVoq4g' },
                                    { name: 'A Thousand Years', id: 'rtOvBOTyX00' },
                                    { name: 'Aku Cinta Kau', id: 'vxQvW1JyDZk' },
                                    { name: 'Marry You - Bruno Mars', id: 'dElRVQFqj-k' },
                                ].map((song) => (
                                    <button
                                        key={song.id}
                                        onClick={() => setSettings(prev => ({ ...prev, youtubeUrl: `https://youtube.com/watch?v=${song.id}` }))}
                                        className="px-3 py-1.5 text-xs bg-white rounded-full border border-primary-200 text-primary-700 hover:bg-primary-100 transition-colors"
                                    >
                                        {song.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Time Range */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Masa Mula (MM:SS)
                        </label>
                        <Input
                            value={startTimeInput}
                            onChange={(e) => setStartTimeInput(e.target.value)}
                            placeholder="0:00"
                            className="font-mono"
                        />
                        <p className="text-xs text-secondary-400 mt-1">
                            Contoh: 1:30 untuk bermula di saat ke-90
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Masa Tamat (MM:SS)
                        </label>
                        <Input
                            value={endTimeInput}
                            onChange={(e) => setEndTimeInput(e.target.value)}
                            placeholder="3:30"
                            className="font-mono"
                        />
                        <p className="text-xs text-secondary-400 mt-1">
                            Kosongkan untuk mainkan hingga habis
                        </p>
                    </div>
                </div>

                {/* Volume Slider */}
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                        <VolumeIcon className="w-4 h-4 inline mr-1" />
                        Kelantangan: {settings.volume}%
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={settings.volume}
                        onChange={handleVolumeChange}
                        className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                    <div className="flex justify-between text-xs text-secondary-400 mt-1">
                        <span>Senyap</span>
                        <span>Kuat</span>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            {videoId && (
                <Card padding="md" className="bg-secondary-50">
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-medium text-secondary-800">Pratonton Video</p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsPreviewPlaying(!isPreviewPlaying)}
                            icon={isPreviewPlaying ? <PauseIcon /> : <PlayIcon />}
                        >
                            {isPreviewPlaying ? 'Pause' : 'Preview'}
                        </Button>
                    </div>

                    {isPreviewPlaying && (
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                            <iframe
                                width="100%"
                                height="100%"
                                src={getPreviewUrl() || ''}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}

                    {!isPreviewPlaying && (
                        <div className="aspect-video rounded-lg bg-secondary-200 flex items-center justify-center">
                            <div className="text-center text-secondary-500">
                                <PlayIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Klik Preview untuk melihat video</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 p-3 bg-white rounded-lg text-sm text-secondary-600">
                        <p><strong>Akan dimainkan:</strong></p>
                        <p>
                            Dari {secondsToTime(settings.startTime)}
                            {settings.endTime > 0 ? ` hingga ${secondsToTime(settings.endTime)}` : ' hingga tamat'}
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
};
