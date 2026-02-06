'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { ThemeConfig } from '@/types';
import { generateCSSVariables } from '@/lib/templates/presets';

interface ThemeContextValue {
    theme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within ThemeProvider');
    }
    return context;
}

interface ThemeProviderProps {
    theme: ThemeConfig;
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {

    const cssVariables = useMemo(() => generateCSSVariables(theme), [theme]);

    const googleFontsUrl = useMemo(() => {
        const fonts = [theme.fonts.heading, theme.fonts.body]
            .filter((font, index, self) => self.indexOf(font) === index)
            .map(font => font.replace(/\s+/g, '+'))
            .join('&family=');
        return `https://fonts.googleapis.com/css2?family=${fonts}:wght@400;500;600;700&display=swap`;
    }, [theme.fonts]);

    return (
        <ThemeContext.Provider value={{ theme }}>
            {/* Load Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href={googleFontsUrl} rel="stylesheet" />

            {/* Apply CSS Variables */}
            <style jsx global>{`
        :root {
          ${cssVariables}
        }
        
        .theme-heading {
          font-family: var(--font-heading);
        }
        
        .theme-body {
          font-family: var(--font-body);
        }
        
        .theme-primary {
          color: var(--color-primary);
        }
        
        .theme-bg-primary {
          background-color: var(--color-primary);
        }
        
        .theme-bg-accent {
          background-color: var(--color-accent);
        }
        
        .theme-bg-page {
          background-color: var(--color-background);
        }
        
        .theme-text {
          color: var(--color-text);
        }
      `}</style>

            <div
                className="theme-body theme-text"
                style={{
                    backgroundColor: theme.colors.background,
                    minHeight: '100vh',
                }}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};
