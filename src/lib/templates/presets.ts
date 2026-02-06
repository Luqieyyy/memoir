import { TemplatePreset, ThemeConfig } from '@/types';

// ============================================
// TEMPLATE PRESETS
// ============================================

export const TEMPLATE_PRESETS: TemplatePreset[] = [
    {
        id: 'modern-minimal',
        name: 'Modern Minimal',
        nameMs: 'Moden Minimalis',
        description: 'Clean, elegant design with soft tones',
        descriptionMs: 'Reka bentuk bersih dan elegan dengan warna lembut',
        thumbnail: '/templates/modern-minimal.jpg',
        colors: {
            primary: '#D4A5A5',
            secondary: '#4A5568',
            accent: '#E8BCB9',
            background: '#FFFBF7',
            text: '#2D3748',
        },
        fonts: {
            heading: 'Playfair Display',
            body: 'Inter',
        },
        hero: {
            layout: 'centered',
            showCountdown: true,
            overlayOpacity: 0.1,
        },
    },
    {
        id: 'malay-songket',
        name: 'Malay Songket',
        nameMs: 'Songket Melayu',
        description: 'Traditional elegance with golden accents',
        descriptionMs: 'Keanggunan tradisional dengan aksen emas',
        thumbnail: '/templates/malay-songket.jpg',
        colors: {
            primary: '#C9A227',
            secondary: '#1A472A',
            accent: '#8B0000',
            background: '#FDF5E6',
            text: '#2C1810',
        },
        fonts: {
            heading: 'Cinzel',
            body: 'Lora',
        },
        hero: {
            layout: 'centered',
            showCountdown: true,
            overlayOpacity: 0.2,
        },
    },
    {
        id: 'floral-romance',
        name: 'Floral Romance',
        nameMs: 'Bunga Romantis',
        description: 'Soft florals with watercolor aesthetics',
        descriptionMs: 'Motif bunga lembut dengan estetik cat air',
        thumbnail: '/templates/floral-romance.jpg',
        colors: {
            primary: '#E8B4B8',
            secondary: '#7C9885',
            accent: '#F5E6E8',
            background: '#FFF9FA',
            text: '#4A4A4A',
        },
        fonts: {
            heading: 'Great Vibes',
            body: 'Quicksand',
        },
        hero: {
            layout: 'centered',
            showCountdown: true,
            overlayOpacity: 0.15,
        },
    },
    {
        id: 'islamic-geometric',
        name: 'Islamic Geometric',
        nameMs: 'Geometri Islamik',
        description: 'Elegant patterns inspired by Islamic art',
        descriptionMs: 'Corak elegan terinspirasi seni Islam',
        thumbnail: '/templates/islamic-geometric.jpg',
        colors: {
            primary: '#1E6F5C',
            secondary: '#29BB89',
            accent: '#E6DDC6',
            background: '#F5F5F0',
            text: '#2C3E50',
        },
        fonts: {
            heading: 'Amiri',
            body: 'Source Sans Pro',
        },
        hero: {
            layout: 'centered',
            showCountdown: true,
            overlayOpacity: 0.1,
        },
    },
];

// ============================================
// DEFAULT THEME CONFIG
// ============================================

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
    templateId: 'modern-minimal',
    colors: TEMPLATE_PRESETS[0].colors,
    fonts: TEMPLATE_PRESETS[0].fonts,
    hero: {
        layout: 'centered',
        showCountdown: true,
        overlayOpacity: 0.1,
    },
    sections: {
        rsvp: true,
        wishes: true,
        photos: true,
        share: true,
    },
    sectionOrder: ['rsvp', 'wishes', 'photos', 'share'],
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getPresetById(templateId: string): TemplatePreset | undefined {
    return TEMPLATE_PRESETS.find((preset) => preset.id === templateId);
}

export function applyPresetToTheme(
    currentTheme: ThemeConfig,
    presetId: string
): ThemeConfig {
    const preset = getPresetById(presetId);
    if (!preset) return currentTheme;

    return {
        ...currentTheme,
        templateId: preset.id,
        colors: preset.colors,
        fonts: preset.fonts,
        hero: {
            ...currentTheme.hero,
            ...preset.hero,
        },
    };
}

export function generateCSSVariables(theme: ThemeConfig): string {
    return `
    --color-primary: ${theme.colors.primary};
    --color-secondary: ${theme.colors.secondary};
    --color-accent: ${theme.colors.accent};
    --color-background: ${theme.colors.background};
    --color-text: ${theme.colors.text};
    --font-heading: '${theme.fonts.heading}', serif;
    --font-body: '${theme.fonts.body}', sans-serif;
    --hero-overlay-opacity: ${theme.hero.overlayOpacity};
  `.trim();
}
