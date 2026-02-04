'use client';

import { useState, useEffect, useCallback } from 'react';
import { RSVPSettings, RSVPResponse, RSVPStats } from '@/types';
import {
    getRSVPSettings,
    updateRSVPSettings as updateRSVPSettingsFirestore,
    getRSVPResponses,
    addRSVPResponse,
    subscribeToRSVPResponses,
    getRSVPStats,
    deleteRSVPResponse,
} from '@/lib/firebase/firestore';

interface UseRSVPReturn {
    // Settings
    settings: RSVPSettings | null;
    settingsLoading: boolean;
    updateSettings: (updates: Partial<RSVPSettings>) => Promise<void>;

    // Responses
    responses: RSVPResponse[];
    responsesLoading: boolean;
    submitRSVP: (data: {
        guestName: string;
        phoneNumber?: string;
        status: 'attending' | 'not_attending' | 'maybe';
        guestCount: number;
        message?: string;
    }) => Promise<RSVPResponse>;
    removeResponse: (responseId: string) => Promise<void>;

    // Stats
    stats: RSVPStats;

    // State
    error: string | null;
}

export function useRSVP(eventId: string | null): UseRSVPReturn {
    const [settings, setSettings] = useState<RSVPSettings | null>(null);
    const [settingsLoading, setSettingsLoading] = useState(true);
    const [responses, setResponses] = useState<RSVPResponse[]>([]);
    const [responsesLoading, setResponsesLoading] = useState(true);
    const [stats, setStats] = useState<RSVPStats>({
        total: 0,
        attending: 0,
        notAttending: 0,
        maybe: 0,
        totalGuestCount: 0,
    });
    const [error, setError] = useState<string | null>(null);

    // Load settings
    useEffect(() => {
        if (!eventId) {
            setSettingsLoading(false);
            return;
        }

        const loadSettings = async () => {
            try {
                setSettingsLoading(true);
                const rsvpSettings = await getRSVPSettings(eventId);
                setSettings(rsvpSettings);
                setError(null);
            } catch (err) {
                console.error('Error loading RSVP settings:', err);
                setError('Failed to load RSVP settings');
            } finally {
                setSettingsLoading(false);
            }
        };

        loadSettings();
    }, [eventId]);

    // Subscribe to responses (real-time)
    useEffect(() => {
        if (!eventId) {
            setResponsesLoading(false);
            return;
        }

        setResponsesLoading(true);

        const unsubscribe = subscribeToRSVPResponses(eventId, (rsvpResponses) => {
            setResponses(rsvpResponses);
            setResponsesLoading(false);

            // Calculate stats from responses
            const newStats: RSVPStats = {
                total: rsvpResponses.length,
                attending: 0,
                notAttending: 0,
                maybe: 0,
                totalGuestCount: 0,
            };

            rsvpResponses.forEach((response) => {
                switch (response.status) {
                    case 'attending':
                        newStats.attending++;
                        newStats.totalGuestCount += response.guestCount;
                        break;
                    case 'not_attending':
                        newStats.notAttending++;
                        break;
                    case 'maybe':
                        newStats.maybe++;
                        newStats.totalGuestCount += response.guestCount;
                        break;
                }
            });

            setStats(newStats);
        });

        return () => unsubscribe();
    }, [eventId]);

    // Update settings
    const updateSettings = useCallback(async (updates: Partial<RSVPSettings>) => {
        if (!eventId) throw new Error('No event ID');

        try {
            await updateRSVPSettingsFirestore(eventId, updates);
            setSettings((prev) => prev ? { ...prev, ...updates } : null);
        } catch (err) {
            console.error('Error updating RSVP settings:', err);
            throw err;
        }
    }, [eventId]);

    // Submit RSVP
    const submitRSVP = useCallback(async (data: {
        guestName: string;
        phoneNumber?: string;
        status: 'attending' | 'not_attending' | 'maybe';
        guestCount: number;
        message?: string;
    }) => {
        if (!eventId) throw new Error('No event ID');

        try {
            const response = await addRSVPResponse(eventId, data);
            return response;
        } catch (err) {
            console.error('Error submitting RSVP:', err);
            throw err;
        }
    }, [eventId]);

    // Remove response
    const removeResponse = useCallback(async (responseId: string) => {
        if (!eventId) throw new Error('No event ID');

        try {
            await deleteRSVPResponse(eventId, responseId);
        } catch (err) {
            console.error('Error removing RSVP response:', err);
            throw err;
        }
    }, [eventId]);

    return {
        settings,
        settingsLoading,
        updateSettings,
        responses,
        responsesLoading,
        submitRSVP,
        removeResponse,
        stats,
        error,
    };
}
