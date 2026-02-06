'use client';

import React, { useState } from 'react';
import { ThemeConfig, TemplatePreset, TemplateId, UpdateThemeInput } from '@/types';
import { Card, Button, Spinner } from '@/components/ui';
import { Check, Sparkles, Camera, QrCode, Eye, Settings, ChevronRight } from 'lucide-react';

interface AppearanceEditorProps {
    theme: ThemeConfig;
    presets: TemplatePreset[];
    onUpdateTheme: (updates: UpdateThemeInput) => Promise<void>;
    onApplyTemplate: (templateId: TemplateId) => Promise<void>;
    loading?: boolean;
    previewUrl: string;
}

type EditorTab = 'templates' | 'colors' | 'fonts' | 'sections';

export const AppearanceEditor: React.FC<AppearanceEditorProps> = ({
    theme,
    presets,
    onUpdateTheme,
    onApplyTemplate,
    loading = false,
    previewUrl,
}) => {
    const [activeTab, setActiveTab] = useState<EditorTab>('templates');
    const [saving, setSaving] = useState(false);
    const [pendingChanges, setPendingChanges] = useState<UpdateThemeInput>({});

    const tabs: { id: EditorTab; label: string; icon: React.ReactNode }[] = [
        { id: 'templates', label: 'Templat', icon: <QrCode className="w-4 h-4" /> },
        { id: 'colors', label: 'Warna', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'fonts', label: 'Fon', icon: <Camera className="w-4 h-4" /> },
        { id: 'sections', label: 'Seksyen', icon: <Settings className="w-4 h-4" /> },
    ];

    const handleApplyTemplate = async (templateId: TemplateId) => {
        setSaving(true);
        try {
            await onApplyTemplate(templateId);
        } finally {
            setSaving(false);
        }
    };

    const handleColorChange = async (colorKey: string, value: string) => {
        setSaving(true);
        try {
            await onUpdateTheme({
                colors: { [colorKey]: value },
            });
        } finally {
            setSaving(false);
        }
    };

    const handleFontChange = async (fontKey: string, value: string) => {
        setSaving(true);
        try {
            await onUpdateTheme({
                fonts: { [fontKey]: value },
            });
        } finally {
            setSaving(false);
        }
    };

    const handleSectionToggle = async (sectionKey: string, enabled: boolean) => {
        setSaving(true);
        try {
            await onUpdateTheme({
                sections: { [sectionKey]: enabled },
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Spinner size="lg" />
            </div>
        );
    }

    const fontOptions = [
        'Playfair Display',
        'Cinzel',
        'Great Vibes',
        'Amiri',
        'Inter',
        'Lora',
        'Quicksand',
        'Source Sans Pro',
        'Montserrat',
        'Open Sans',
    ];

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-secondary-100 p-1 rounded-xl">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center
              ${activeTab === tab.id
                                ? 'bg-white text-primary-700 shadow-sm'
                                : 'text-secondary-600 hover:text-secondary-800'
                            }
            `}
                    >
                        {tab.icon}
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Saving Indicator */}
            {saving && (
                <div className="flex items-center gap-2 text-sm text-primary-600">
                    <Spinner size="sm" />
                    <span>Menyimpan perubahan...</span>
                </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-secondary-800">Pilih Templat</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {presets.map((preset) => (
                            <Card
                                key={preset.id}
                                variant="outlined"
                                padding="none"
                                hover
                                className={`
                  cursor-pointer transition-all overflow-hidden
                  ${theme.templateId === preset.id ? 'ring-2 ring-primary-500' : ''}
                `}
                                onClick={() => handleApplyTemplate(preset.id)}
                            >
                                {/* Preview */}
                                <div
                                    className="h-32 relative"
                                    style={{ backgroundColor: preset.colors.background }}
                                >
                                    <div
                                        className="absolute inset-0 flex items-center justify-center"
                                        style={{ backgroundColor: `${preset.colors.primary}20` }}
                                    >
                                        <div className="text-center">
                                            <h4
                                                className="text-2xl font-bold"
                                                style={{
                                                    color: preset.colors.primary,
                                                    fontFamily: `'${preset.fonts.heading}', serif`,
                                                }}
                                            >
                                                Aisha & Farhan
                                            </h4>
                                            <p
                                                className="text-sm mt-1"
                                                style={{
                                                    color: preset.colors.text,
                                                    fontFamily: `'${preset.fonts.body}', sans-serif`,
                                                }}
                                            >
                                                14 Februari 2026
                                            </p>
                                        </div>
                                    </div>

                                    {/* Selected Badge */}
                                    {theme.templateId === preset.id && (
                                        <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-secondary-800">{preset.nameMs}</h4>
                                            <p className="text-sm text-secondary-500">{preset.descriptionMs}</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-secondary-400" />
                                    </div>

                                    {/* Color Swatches */}
                                    <div className="flex gap-1 mt-3">
                                        {Object.values(preset.colors).slice(0, 4).map((color, idx) => (
                                            <div
                                                key={idx}
                                                className="w-6 h-6 rounded-full border border-secondary-200"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Colors Tab */}
            {activeTab === 'colors' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-secondary-800">Sesuaikan Warna</h3>
                    <Card variant="outlined" padding="md">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { key: 'primary', label: 'Utama' },
                                { key: 'secondary', label: 'Sekunder' },
                                { key: 'accent', label: 'Aksen' },
                                { key: 'background', label: 'Latar Belakang' },
                                { key: 'text', label: 'Teks' },
                            ].map((color) => (
                                <div key={color.key} className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={theme.colors[color.key as keyof typeof theme.colors]}
                                        onChange={(e) => handleColorChange(color.key, e.target.value)}
                                        className="w-12 h-12 rounded-lg border-2 border-secondary-200 cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-secondary-700">
                                            {color.label}
                                        </label>
                                        <span className="text-xs text-secondary-400 uppercase">
                                            {theme.colors[color.key as keyof typeof theme.colors]}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* Fonts Tab */}
            {activeTab === 'fonts' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-secondary-800">Pilih Fon</h3>
                    <Card variant="outlined" padding="md">
                        <div className="space-y-4">
                            {/* Heading Font */}
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Fon Tajuk
                                </label>
                                <select
                                    value={theme.fonts.heading}
                                    onChange={(e) => handleFontChange('heading', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    {fontOptions.map((font) => (
                                        <option key={font} value={font} style={{ fontFamily: font }}>
                                            {font}
                                        </option>
                                    ))}
                                </select>
                                <p
                                    className="mt-2 text-2xl"
                                    style={{ fontFamily: `'${theme.fonts.heading}', serif` }}
                                >
                                    Aisha & Farhan
                                </p>
                            </div>

                            {/* Body Font */}
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Fon Teks
                                </label>
                                <select
                                    value={theme.fonts.body}
                                    onChange={(e) => handleFontChange('body', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    {fontOptions.map((font) => (
                                        <option key={font} value={font} style={{ fontFamily: font }}>
                                            {font}
                                        </option>
                                    ))}
                                </select>
                                <p
                                    className="mt-2 text-base"
                                    style={{ fontFamily: `'${theme.fonts.body}', sans-serif` }}
                                >
                                    Kami amat gembira menjemput anda ke majlis perkahwinan kami.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* Sections Tab */}
            {activeTab === 'sections' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-secondary-800">Urus Seksyen</h3>
                    <Card variant="outlined" padding="md">
                        <div className="space-y-3">
                            {[
                                { key: 'rsvp', label: 'RSVP', description: 'Borang kehadiran tetamu' },
                                { key: 'wishes', label: 'Ucapan', description: 'Paparan ucapan dari tetamu' },
                                { key: 'photos', label: 'Galeri', description: 'Galeri foto dari tetamu' },
                                { key: 'share', label: 'Kongsi', description: 'Butang kongsi ke media sosial' },
                            ].map((section) => (
                                <div
                                    key={section.key}
                                    className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg"
                                >
                                    <div>
                                        <h4 className="font-medium text-secondary-800">{section.label}</h4>
                                        <p className="text-sm text-secondary-500">{section.description}</p>
                                    </div>
                                    <button
                                        onClick={() => handleSectionToggle(
                                            section.key,
                                            !theme.sections[section.key as keyof typeof theme.sections]
                                        )}
                                        className={`
                      relative w-12 h-6 rounded-full transition-colors
                      ${theme.sections[section.key as keyof typeof theme.sections]
                                                ? 'bg-primary-500'
                                                : 'bg-secondary-300'
                                            }
                    `}
                                    >
                                        <div
                                            className={`
                        absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform
                        ${theme.sections[section.key as keyof typeof theme.sections]
                                                    ? 'translate-x-7'
                                                    : 'translate-x-1'
                                                }
                      `}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* Preview Button */}
            <Card variant="outlined" padding="md">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium text-secondary-800">Pratonton</h4>
                        <p className="text-sm text-secondary-500">Lihat rupa laman tetamu anda</p>
                    </div>
                    <Button
                        variant="outline"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => window.open(previewUrl, '_blank')}
                    >
                        Lihat Pratonton
                    </Button>
                </div>
            </Card>
        </div>
    );
};
