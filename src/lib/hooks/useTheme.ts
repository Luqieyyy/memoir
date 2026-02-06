'use client';

import { useState, useEffect, useCallback } from 'react';
import { ThemeConfig, UpdateThemeInput, TemplateId } from '@/types';
import { getThemeConfig, updateThemeConfig, subscribeToTheme } from '@/lib/firebase/firestore';
import { TEMPLATE_PRESETS, applyPresetToTheme } from '@/lib/templates/presets';

interface UseThemeReturn {
    theme: ThemeConfig | null;
    loading: boolean;
    error: string | null;
    updateTheme: (updates: UpdateThemeInput) => Promise<void>;
    applyTemplate: (templateId: TemplateId) => Promise<void>;
    presets: typeof TEMPLATE_PRESETS;
}

export function useTheme(eventId: string | null): UseThemeReturn {
    const [theme, setTheme] = useState<ThemeConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Subscribe to theme changes
    useEffect(() => {
        if (!eventId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const unsubscribe = subscribeToTheme(eventId, (themeConfig) => {
            setTheme(themeConfig);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [eventId]);

    // Update theme
    const updateTheme = useCallback(async (updates: UpdateThemeInput) => {
        if (!eventId) return;

        try {
            const updated = await updateThemeConfig(eventId, updates);
            setTheme(updated);
        } catch (err) {
            console.error('Error updating theme:', err);
            setError('Gagal mengemaskini tema');
            throw err;
        }
    }, [eventId]);

    // Apply template preset
    const applyTemplate = useCallback(async (templateId: TemplateId) => {
        if (!eventId || !theme) return;

        try {
            const newTheme = applyPresetToTheme(theme, templateId);
            await updateThemeConfig(eventId, newTheme);
            setTheme(newTheme);
        } catch (err) {
            console.error('Error applying template:', err);
            setError('Gagal memilih templat');
            throw err;
        }
    }, [eventId, theme]);

    return {
        theme,
        loading,
        error,
        updateTheme,
        applyTemplate,
        presets: TEMPLATE_PRESETS,
    };
}
