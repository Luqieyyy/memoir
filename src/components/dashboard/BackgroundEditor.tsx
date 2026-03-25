'use client';

import React, { useState, useRef } from 'react';
import { SectionBackgrounds, SectionBackgroundConfig, BackgroundImage } from '@/types';
import { Button, Input, Card } from '@/components/ui';
import { Check, Trash2, Plus, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

interface BackgroundEditorProps {
    initialBackgrounds?: SectionBackgrounds;
    onSave: (backgrounds: SectionBackgrounds) => Promise<void>;
    onUploadImage?: (file: File) => Promise<string>; // Returns URL
}

const SECTIONS = [
    { id: 'hero', label: 'Hero / Banner', description: 'Gambar utama di bahagian atas' },
    { id: 'rsvp', label: 'RSVP', description: 'Bahagian borang kehadiran' },
    { id: 'timeline', label: 'Aturcara', description: 'Jadual perjalanan majlis' },
    { id: 'memories', label: 'Kenangan', description: 'Galeri ucapan dan foto' },
    { id: 'share', label: 'Kongsi', description: 'Bahagian kongsi ucapan' },
];

const LAYOUT_OPTIONS = [
    { value: 'single', label: 'Satu Gambar', description: 'Papar satu gambar sahaja' },
    { value: 'carousel', label: 'Carousel', description: 'Slide gambar secara horizontal' },
    { value: 'slideshow', label: 'Slideshow', description: 'Gambar bertukar dengan fade effect' },
    { value: 'parallax', label: 'Parallax', description: 'Kesan 3D semasa scroll' },
];

const DEFAULT_SECTION_CONFIG: SectionBackgroundConfig = {
    enabled: false,
    images: [],
    opacity: 80,
    layout: 'single',
    overlayColor: '#000000',
    overlayOpacity: 30,
    autoScroll: true,
    scrollSpeed: 5,
};

// Custom Icons
const ChevronUpIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <polyline points="18 15 12 9 6 15" />
    </svg>
);

const ImageIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21,15 16,10 5,21" />
    </svg>
);

const SettingsIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

export const BackgroundEditor: React.FC<BackgroundEditorProps> = ({
    initialBackgrounds,
    onSave,
    onUploadImage,
}) => {
    const [backgrounds, setBackgrounds] = useState<SectionBackgrounds>(initialBackgrounds || {});
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const [urlInputs, setUrlInputs] = useState<{ [key: string]: string }>({});
    const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const getSectionConfig = (sectionId: string): SectionBackgroundConfig => {
        return (backgrounds as Record<string, SectionBackgroundConfig | undefined>)[sectionId] || DEFAULT_SECTION_CONFIG;
    };

    const updateSectionConfig = (sectionId: string, updates: Partial<SectionBackgroundConfig>) => {
        setBackgrounds(prev => ({
            ...prev,
            [sectionId]: { ...getSectionConfig(sectionId), ...updates },
        }));
    };

    const handleImageUpload = async (sectionId: string, files: FileList | null) => {
        if (!files || !onUploadImage) return;

        setUploading(sectionId);
        try {
            const currentConfig = getSectionConfig(sectionId);
            const newImages: BackgroundImage[] = [...currentConfig.images];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.startsWith('image/')) continue;

                const url = await onUploadImage(file);
                newImages.push({
                    id: `img-${Date.now()}-${i}`,
                    url,
                    alt: file.name,
                });
            }

            updateSectionConfig(sectionId, { images: newImages, enabled: true });
            toast.success(`${files.length} gambar berjaya dimuat naik!`);
        } catch (error) {
            toast.error('Gagal memuat naik gambar');
        } finally {
            setUploading(null);
        }
    };

    const handleAddImageUrl = (sectionId: string) => {
        const url = urlInputs[sectionId] || '';
        if (!url.trim()) {
            toast.error('Sila masukkan URL gambar');
            return;
        }

        // Basic URL validation
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            toast.error('URL mesti bermula dengan http:// atau https://');
            return;
        }

        const currentConfig = getSectionConfig(sectionId);
        const newImages = [
            ...currentConfig.images,
            { id: `img-${Date.now()}`, url: url.trim(), alt: 'Custom image' },
        ];
        updateSectionConfig(sectionId, { images: newImages, enabled: true });
        setUrlInputs(prev => ({ ...prev, [sectionId]: '' }));
        toast.success('Gambar berjaya ditambah!');
    };

    const handleRemoveImage = (sectionId: string, imageId: string) => {
        const currentConfig = getSectionConfig(sectionId);
        const newImages = currentConfig.images.filter(img => img.id !== imageId);
        updateSectionConfig(sectionId, { images: newImages });
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(backgrounds);
            toast.success('Latar belakang berjaya disimpan!');
        } catch (error) {
            toast.error('Gagal menyimpan latar belakang');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-secondary-800">Latar Belakang Section</h3>
                    <p className="text-sm text-secondary-500">Tambah gambar latar untuk setiap bahagian</p>
                </div>
                <Button onClick={handleSave} loading={saving} icon={<Check className="w-4 h-4" />}>
                    Simpan
                </Button>
            </div>

            {/* Section Cards */}
            <div className="space-y-4">
                {SECTIONS.map((section) => {
                    const config = getSectionConfig(section.id);
                    const isExpanded = expandedSection === section.id;

                    return (
                        <Card key={section.id} padding="none" className="overflow-hidden">
                            {/* Section Header */}
                            <button
                                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                                className="w-full p-4 flex items-center justify-between hover:bg-secondary-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.enabled && config.images.length > 0
                                        ? 'bg-primary-100 text-primary-600'
                                        : 'bg-secondary-100 text-secondary-400'
                                        }`}>
                                        <ImageIcon />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-secondary-800">{section.label}</p>
                                        <p className="text-xs text-secondary-500">
                                            {config.enabled && config.images.length > 0
                                                ? `${config.images.length} gambar • ${LAYOUT_OPTIONS.find(l => l.value === config.layout)?.label}`
                                                : section.description
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {config.enabled && (
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Aktif</span>
                                    )}
                                    {isExpanded ? (
                                        <ChevronUpIcon />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-secondary-400" />
                                    )}
                                </div>
                            </button>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="border-t border-secondary-100 p-4 space-y-6 bg-secondary-50/50">
                                    {/* Enable Toggle */}
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-secondary-700">Aktifkan latar belakang</span>
                                        <button
                                            onClick={() => updateSectionConfig(section.id, { enabled: !config.enabled })}
                                            className={`relative w-12 h-6 rounded-full transition-colors ${config.enabled ? 'bg-primary-500' : 'bg-secondary-300'
                                                }`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${config.enabled ? 'translate-x-7' : 'translate-x-1'
                                                }`} />
                                        </button>
                                    </div>

                                    {/* Image Gallery */}
                                    <div>
                                        <label className="block text-sm font-medium text-secondary-700 mb-3">
                                            Gambar ({config.images.length})
                                        </label>

                                        {/* Image Grid */}
                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                                            {config.images.map((img, index) => (
                                                <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden bg-secondary-200">
                                                    <img
                                                        src={img.url}
                                                        alt={img.alt || `Image ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        onClick={() => handleRemoveImage(section.id, img.id)}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/50 text-white text-xs rounded">
                                                        {index + 1}
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Add Image Button */}
                                            <button
                                                onClick={() => fileInputRefs.current[section.id]?.click()}
                                                disabled={uploading === section.id}
                                                className="aspect-square rounded-lg border-2 border-dashed border-secondary-300 hover:border-primary-400 hover:bg-primary-50 flex flex-col items-center justify-center gap-1 text-secondary-400 hover:text-primary-500 transition-all"
                                            >
                                                {uploading === section.id ? (
                                                    <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        <Plus className="w-5 h-5" />
                                                        <span className="text-xs">Tambah</span>
                                                    </>
                                                )}
                                            </button>
                                            <input
                                                ref={el => { fileInputRefs.current[section.id] = el; }}
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => handleImageUpload(section.id, e.target.files)}
                                                className="hidden"
                                            />
                                        </div>

                                        {/* URL Input */}
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Atau paste URL gambar..."
                                                className="flex-1 text-sm px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                                value={urlInputs[section.id] || ''}
                                                onChange={(e) => setUrlInputs(prev => ({ ...prev, [section.id]: e.target.value }))}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddImageUrl(section.id);
                                                    }
                                                }}
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleAddImageUrl(section.id)}
                                            >
                                                Tambah
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Layout Options */}
                                    <div>
                                        <label className="block text-sm font-medium text-secondary-700 mb-3">Layout</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {LAYOUT_OPTIONS.map((layout) => (
                                                <button
                                                    key={layout.value}
                                                    onClick={() => updateSectionConfig(section.id, { layout: layout.value as SectionBackgroundConfig['layout'] })}
                                                    className={`p-3 rounded-lg border text-left transition-all ${config.layout === layout.value
                                                        ? 'border-primary-500 bg-primary-50'
                                                        : 'border-secondary-200 hover:border-primary-300'
                                                        }`}
                                                >
                                                    <p className={`text-sm font-medium ${config.layout === layout.value ? 'text-primary-700' : 'text-secondary-700'
                                                        }`}>
                                                        {layout.label}
                                                    </p>
                                                    <p className="text-xs text-secondary-500">{layout.description}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sliders */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-secondary-700 mb-2">
                                                Opacity Gambar: {config.opacity}%
                                            </label>
                                            <input
                                                type="range"
                                                min="10"
                                                max="100"
                                                value={config.opacity}
                                                onChange={(e) => updateSectionConfig(section.id, { opacity: parseInt(e.target.value) })}
                                                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-secondary-700 mb-2">
                                                Overlay Gelap: {config.overlayOpacity}%
                                            </label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="80"
                                                value={config.overlayOpacity}
                                                onChange={(e) => updateSectionConfig(section.id, { overlayOpacity: parseInt(e.target.value) })}
                                                className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-secondary-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Auto Scroll (for carousel/slideshow) */}
                                    {(config.layout === 'carousel' || config.layout === 'slideshow') && config.images.length > 1 && (
                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-secondary-700">Auto Scroll</p>
                                                <p className="text-xs text-secondary-500">
                                                    Tukar gambar automatik setiap {11 - config.scrollSpeed} saat
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="10"
                                                    value={config.scrollSpeed}
                                                    onChange={(e) => updateSectionConfig(section.id, { scrollSpeed: parseInt(e.target.value) })}
                                                    className="w-20 h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                                    disabled={!config.autoScroll}
                                                />
                                                <button
                                                    onClick={() => updateSectionConfig(section.id, { autoScroll: !config.autoScroll })}
                                                    className={`relative w-10 h-5 rounded-full transition-colors ${config.autoScroll ? 'bg-primary-500' : 'bg-secondary-300'
                                                        }`}
                                                >
                                                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${config.autoScroll ? 'translate-x-5' : 'translate-x-0.5'
                                                        }`} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Preview Thumbnail */}
                                    {config.images.length > 0 && (
                                        <div className="p-3 bg-white rounded-lg">
                                            <p className="text-xs font-medium text-secondary-500 mb-2">PREVIEW</p>
                                            <div
                                                className="aspect-video rounded-lg overflow-hidden relative"
                                                style={{
                                                    backgroundImage: `url(${config.images[0].url})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            >
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        backgroundColor: config.overlayColor,
                                                        opacity: config.overlayOpacity / 100,
                                                    }}
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
                                                    {section.label}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
