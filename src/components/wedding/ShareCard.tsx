'use client';

import React, { useState } from 'react';
import { Heart, Check, Copy } from 'lucide-react';

interface ShareCardProps {
    brideName: string;
    groomName: string;
    weddingDate: Date | string;
    weddingId: string;
    location?: string;
    className?: string;
}

export const ShareCard: React.FC<ShareCardProps> = ({
    brideName,
    groomName,
    weddingDate,
    weddingId,
    location,
    className = '',
}) => {
    const [copied, setCopied] = useState(false);
    const [shareSuccess, setShareSuccess] = useState(false);

    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/wedding/${weddingId}`
        : `/wedding/${weddingId}`;

    const formattedDate = new Date(weddingDate).toLocaleDateString('ms-MY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const shareText = `💍 Jemputan Perkahwinan\n\n${brideName} & ${groomName}\n📅 ${formattedDate}\n${location ? `📍 ${location}\n` : ''}\nKami menjemput anda ke majlis perkahwinan kami!\n\n`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = async (platform: 'whatsapp' | 'telegram' | 'facebook' | 'twitter') => {
        const encodedText = encodeURIComponent(shareText);
        const encodedUrl = encodeURIComponent(shareUrl);

        const links = {
            whatsapp: `https://wa.me/?text=${encodedText}${encodedUrl}`,
            telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        };

        window.open(links[platform], '_blank', 'noopener,noreferrer');
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Jemputan Perkahwinan ${brideName} & ${groomName}`,
                    text: shareText,
                    url: shareUrl,
                });
                setShareSuccess(true);
                setTimeout(() => setShareSuccess(false), 2000);
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    console.error('Share failed:', err);
                }
            }
        }
    };

    return (
        <div className={`bg-white rounded-2xl shadow-elegant overflow-hidden ${className}`}>
            {/* Decorative Header */}
            <div className="bg-gradient-romantic p-6 text-center relative overflow-hidden">
                {/* Floating hearts decoration */}
                <div className="absolute inset-0 opacity-10">
                    {[...Array(8)].map((_, i) => (
                        <Heart
                            key={i}
                            className="absolute text-primary-600 animate-pulse"
                            style={{
                                left: `${10 + Math.random() * 80}%`,
                                top: `${10 + Math.random() * 80}%`,
                                width: `${12 + Math.random() * 16}px`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10">
                    <p className="text-sm text-primary-600 font-medium mb-2">Jemputan Ke Majlis</p>
                    <h2 className="text-2xl font-display font-bold text-secondary-800">
                        {brideName} & {groomName}
                    </h2>
                    <p className="text-secondary-600 mt-2">{formattedDate}</p>
                    {location && (
                        <p className="text-sm text-secondary-500 mt-1">📍 {location}</p>
                    )}
                </div>
            </div>

            {/* Share Actions */}
            <div className="p-6">
                <p className="text-center text-secondary-600 text-sm mb-4">
                    Kongsikan majlis kami kepada rakan & keluarga
                </p>

                {/* Social Share Buttons */}
                <div className="flex justify-center gap-3 mb-6">
                    {/* WhatsApp */}
                    <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-soft"
                        title="Share via WhatsApp"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </button>

                    {/* Telegram */}
                    <button
                        onClick={() => handleShare('telegram')}
                        className="w-12 h-12 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-soft"
                        title="Share via Telegram"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                    </button>

                    {/* Facebook */}
                    <button
                        onClick={() => handleShare('facebook')}
                        className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-soft"
                        title="Share via Facebook"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </button>

                    {/* Twitter/X */}
                    <button
                        onClick={() => handleShare('twitter')}
                        className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-soft"
                        title="Share via X"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </button>
                </div>

                {/* Copy Link */}
                <div className="flex items-center gap-2 bg-secondary-50 rounded-xl p-3">
                    <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="flex-1 bg-transparent text-sm text-secondary-600 outline-none truncate"
                    />
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${copied
                            ? 'bg-emerald-500 text-white'
                            : 'bg-primary-500 text-white hover:bg-primary-600'
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4" />
                                <span>Disalin!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                <span>Salin</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Native Share (Mobile) */}
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                    <button
                        onClick={handleNativeShare}
                        className="w-full mt-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all shadow-soft flex items-center justify-center gap-2"
                    >
                        <Heart className="w-5 h-5" />
                        <span>Kongsi Jemputan</span>
                    </button>
                )}

                {/* Success Message */}
                {shareSuccess && (
                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-700 text-sm animate-fade-in">
                        ✅ Terima kasih kerana berkongsi!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShareCard;
