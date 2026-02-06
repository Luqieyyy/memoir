'use client';

import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';

interface AIWishGeneratorProps {
    onSelect: (wish: string) => void;
    brideName: string;
    groomName: string;
}

const WISH_TEMPLATES = [
    "Selamat pengantin baru {B} & {G}! Semoga kekal bahagia hingga ke anak cucu dan syurga.",
    "Barakallahulakuma! Tahniah {B} & {G}. Semoga ikatan perkahwinan ini diberkati Allah SWT.",
    "Happy Wedding {B} & {G}! Wishing you a lifetime of love and happiness together.",
    "Pantun 1:\nIkan di laut asam di darat,\nDalam kuali bertemu jua,\nHati terpaut janji diikat,\nSelamat pengantin baru buat berdua.",
    "Tahniah atas majlis indah ini. Semoga {B} menjadi bidadari buat {G} selamanya.",
    "May your love story be as magical as Disney, but real and everlasting. Congrats {B} & {G}!"
];

export const AIWishGenerator: React.FC<AIWishGeneratorProps> = ({
    onSelect,
    brideName,
    groomName,
}) => {
    const [generating, setGenerating] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const handleGenerate = () => {
        setGenerating(true);
        setShowOptions(true);

        // Simulate AI generation delay
        setTimeout(() => {
            setGenerating(false);
        }, 800);
    };

    const getPersonalizedWish = (template: string) => {
        return template.replace(/{B}/g, brideName).replace(/{G}/g, groomName);
    };

    return (
        <div className="mb-4">
            {!showOptions ? (
                <Button
                    type="button"
                    variant="secondary" // Assuming secondary variant exist, else fallback to outline
                    size="sm"
                    onClick={handleGenerate}
                    className="w-full bg-gradient-to-r from-violet-100 to-fuchsia-100 hover:from-violet-200 hover:to-fuchsia-200 text-violet-700 border-none shadow-sm"
                    icon={<Sparkles className="w-4 h-4 text-violet-500" />}
                >
                    Takde idea? Guna AI Magic ✨
                </Button>
            ) : (
                <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-xl p-4 border border-violet-100 animate-fade-in-up">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-violet-800 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Cadangan Ucapan
                        </h4>
                        <button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="text-xs text-violet-600 hover:text-violet-800 flex items-center gap-1"
                        >
                            <RefreshCw className={`w-3 h-3 ${generating ? 'animate-spin' : ''}`} />
                            Tukar lain
                        </button>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {generating ? (
                            <div className="space-y-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-12 bg-white/50 rounded-lg animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            WISH_TEMPLATES.sort(() => 0.5 - Math.random()).slice(0, 3).map((template, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => onSelect(getPersonalizedWish(template))}
                                    className="w-full text-left p-3 text-sm text-secondary-700 bg-white/80 hover:bg-white rounded-lg border border-transparent hover:border-violet-200 transition-all hover:scale-[1.02] shadow-sm hover:shadow-md"
                                >
                                    {getPersonalizedWish(template)}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIWishGenerator;
