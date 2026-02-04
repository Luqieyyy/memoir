'use client';

import React, { useState } from 'react';
import { RSVPSettings, RSVPStatus } from '@/types';
import { Card, Button, Input, Textarea } from '@/components/ui';
import { Heart, X, Users, Check, Info, MessageSquare, User } from 'lucide-react';

interface RSVPFormProps {
    eventId: string;
    settings: RSVPSettings;
    brideName: string;
    groomName: string;
    onSubmit: (data: {
        guestName: string;
        phoneNumber?: string;
        status: RSVPStatus;
        guestCount: number;
        message?: string;
    }) => Promise<void>;
    onSuccess?: () => void;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({
    eventId,
    settings,
    brideName,
    groomName,
    onSubmit,
    onSuccess,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [guestName, setGuestName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState<RSVPStatus | null>(null);
    const [guestCount, setGuestCount] = useState(1);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!guestName.trim()) {
            setError('Sila masukkan nama anda');
            return;
        }

        if (!status) {
            setError('Sila pilih status kehadiran anda');
            return;
        }

        if (settings.requirePhone && !phoneNumber.trim()) {
            setError('Sila masukkan nombor telefon anda');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await onSubmit({
                guestName: guestName.trim(),
                phoneNumber: phoneNumber.trim() || undefined,
                status,
                guestCount,
                message: message.trim() || undefined,
            });

            setIsSubmitted(true);
            onSuccess?.();
        } catch (err) {
            console.error('RSVP submission error:', err);
            setError('Maaf, terdapat masalah. Sila cuba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success state
    if (isSubmitted) {
        return (
            <div className="text-center py-12 px-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-dustyrose rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft">
                    <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-secondary-800 mb-2">
                    Terima Kasih!
                </h3>
                <p className="text-secondary-600 mb-2">
                    RSVP anda telah direkodkan.
                </p>
                <p className="text-sm text-secondary-500">
                    {brideName} & {groomName} menghargai maklum balas anda.
                </p>

                {status === 'attending' && (
                    <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                        <p className="text-green-700 font-medium">
                            ✓ Kami tunggu kehadiran anda!
                        </p>
                    </div>
                )}
            </div>
        );
    }

    // Check if RSVP is disabled or deadline passed
    if (!settings.isEnabled) {
        return (
            <div className="text-center py-12 px-6">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-8 h-8 text-secondary-400" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-700 mb-2">
                    RSVP Ditutup
                </h3>
                <p className="text-secondary-500">
                    Tempoh RSVP untuk majlis ini telah tamat.
                </p>
            </div>
        );
    }

    if (settings.deadline && new Date() > settings.deadline) {
        return (
            <div className="text-center py-12 px-6">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-8 h-8 text-secondary-400" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-700 mb-2">
                    Tarikh Akhir RSVP Telah Lepas
                </h3>
                <p className="text-secondary-500">
                    Maaf, tempoh untuk membuat RSVP telah tamat.
                </p>
            </div>
        );
    }

    const statusOptions: { value: RSVPStatus; label: string; icon: React.ReactNode; color: string }[] = [
        {
            value: 'attending',
            label: 'Hadir',
            icon: <Check className="w-5 h-5" />,
            color: 'bg-green-500 border-green-500 text-white',
        },
        {
            value: 'not_attending',
            label: 'Tidak Hadir',
            icon: <X className="w-5 h-5" />,
            color: 'bg-red-400 border-red-400 text-white',
        },
        {
            value: 'maybe',
            label: 'Belum Pasti',
            icon: <Info className="w-5 h-5" />,
            color: 'bg-amber-400 border-amber-400 text-white',
        },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-dustyrose rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-secondary-800">
                    Pengesahan Kehadiran
                </h3>
                <p className="text-secondary-500 text-sm mt-1">
                    Sila sahkan kehadiran anda ke majlis perkahwinan kami
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Guest Name */}
            <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                    <User className="w-4 h-4 inline mr-1" />
                    Nama Penuh <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Nama anda"
                    className="block w-full rounded-xl border border-secondary-300 bg-white px-4 py-3 text-secondary-900 placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required
                />
            </div>

            {/* Phone Number */}
            <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    No. Telefon {settings.requirePhone && <span className="text-red-500">*</span>}
                    {!settings.requirePhone && <span className="text-secondary-400 text-xs ml-1">(pilihan)</span>}
                </label>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="01X-XXXXXXX"
                    className="block w-full rounded-xl border border-secondary-300 bg-white px-4 py-3 text-secondary-900 placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    required={settings.requirePhone}
                />
            </div>

            {/* Attendance Status */}
            <div>
                <label className="block text-sm font-medium text-secondary-700 mb-3">
                    Kehadiran Anda <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {statusOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setStatus(option.value)}
                            className={`
                p-4 rounded-xl border-2 transition-all duration-200
                flex flex-col items-center gap-2
                ${status === option.value
                                    ? option.color + ' shadow-md scale-105'
                                    : 'border-secondary-200 bg-white text-secondary-600 hover:border-primary-300 hover:bg-primary-50'
                                }
              `}
                        >
                            {option.icon}
                            <span className="text-sm font-medium">{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Guest Count - Only show if attending or maybe */}
            {settings.showGuestCount && (status === 'attending' || status === 'maybe') && (
                <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                        <Users className="w-4 h-4 inline mr-1" />
                        Bilangan Tetamu
                    </label>
                    <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(parseInt(e.target.value))}
                        className="block w-full rounded-xl border border-secondary-300 bg-white px-4 py-3 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                        {Array.from({ length: settings.maxGuestsPerRsvp }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>
                                {num} orang
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Message */}
            <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Ucapan kepada Pengantin <span className="text-secondary-400 text-xs">(pilihan)</span>
                </label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ucapan dan doa untuk pasangan pengantin..."
                    rows={3}
                    className="block w-full rounded-xl border border-secondary-300 bg-white px-4 py-3 text-secondary-900 placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                />
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                disabled={!status || !guestName.trim()}
                className="!rounded-xl !py-4 bg-gradient-to-r from-primary-500 to-dustyrose hover:from-primary-600 hover:to-dustyrose/90"
            >
                <Heart className="w-5 h-5 mr-2" />
                Hantar RSVP
            </Button>

            {/* Custom Message from Host */}
            {settings.customMessage && (
                <p className="text-center text-sm text-secondary-500 italic">
                    {settings.customMessage}
                </p>
            )}
        </form>
    );
};
