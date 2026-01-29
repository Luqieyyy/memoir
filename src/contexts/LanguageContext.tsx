'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Language, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (section: keyof typeof translations, key: string, subKey?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('bm');

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'bm' ? 'en' : 'bm'));
  }, []);

  const t = useCallback(
    (section: keyof typeof translations, key: string, subKey?: string): string => {
      try {
        const sectionData = translations[section];
        if (!sectionData) return key;

        // @ts-ignore - Dynamic access
        const keyData = sectionData[key];
        if (!keyData) return key;

        if (subKey) {
          // @ts-ignore - Dynamic access
          const subKeyData = keyData[subKey];
          if (subKeyData && typeof subKeyData === 'object' && language in subKeyData) {
            return subKeyData[language];
          }
          return subKey;
        }

        if (typeof keyData === 'object' && language in keyData) {
          return keyData[language];
        }

        return key;
      } catch {
        return key;
      }
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
