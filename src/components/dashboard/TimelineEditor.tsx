'use client';

import React, { useState } from 'react';
import { TimelineEvent } from '@/types';
import { Button, Input, Card } from '@/components/ui';
import {
    Clock, MapPin, Heart, Camera, Check,
    Sparkles, Plus, Trash2, ArrowRight
} from 'lucide-react';

interface TimelineEditorProps {
    initialEvents: TimelineEvent[];
    onSave: (events: TimelineEvent[]) => Promise<void>;
}

const AVAILABLE_ICONS = [
    { value: 'clock', icon: <Clock className="w-4 h-4" />, label: 'Clock' },
    { value: 'map-pin', icon: <MapPin className="w-4 h-4" />, label: 'Location' },
    { value: 'heart', icon: <Heart className="w-4 h-4" />, label: 'Love' },
    { value: 'camera', icon: <Camera className="w-4 h-4" />, label: 'Photo' },
    { value: 'music', icon: <Sparkles className="w-4 h-4" />, label: 'Music' },
    { value: 'utensils', icon: <Clock className="w-4 h-4" />, label: 'Food' },
    { value: 'sparkles', icon: <Sparkles className="w-4 h-4" />, label: 'Sparkles' },
];

export const TimelineEditor: React.FC<TimelineEditorProps> = ({
    initialEvents,
    onSave,
}) => {
    const [events, setEvents] = useState<TimelineEvent[]>(
        initialEvents.length > 0 ? initialEvents : [
            { id: '1', time: '10:00 AM', title: 'Ketibaan Tetamu', icon: 'users', description: 'Selamat datang ke majlis kami' }
        ]
    );

    const [saving, setSaving] = useState(false);

    const handleAddEvent = () => {
        const newEvent: TimelineEvent = {
            id: Date.now().toString(),
            time: '',
            title: '',
            description: '',
            icon: 'clock'
        };
        setEvents([...events, newEvent]);
    };

    const handleChange = (id: string, field: keyof TimelineEvent, value: string) => {
        setEvents(events.map(ev => ev.id === id ? { ...ev, [field]: value } : ev));
    };

    const handleDelete = (id: string) => {
        setEvents(events.filter(ev => ev.id !== id));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(events);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-secondary-800">Sunting Aturcara</h3>
                <Button
                    onClick={handleSave}
                    loading={saving}
                    icon={<Check className="w-4 h-4" />}
                >
                    Simpan Perubahan
                </Button>
            </div>

            <div className="space-y-4">
                {events.map((event, index) => (
                    <Card key={event.id} padding="sm" className="relative group">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                            {/* Icon Selector */}
                            <div className="md:col-span-1 flex justify-center pt-2">
                                <div className="relative group/icon cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 border border-primary-100">
                                        {AVAILABLE_ICONS.find(i => i.value === event.icon)?.icon || <Clock className="w-5 h-5" />}
                                    </div>
                                    {/* Simple Dropdown on Hover */}
                                    <div className="absolute top-full left-0 z-10 w-32 bg-white shadow-xl rounded-lg border border-secondary-100 p-2 hidden group-hover/icon:grid grid-cols-3 gap-1">
                                        {AVAILABLE_ICONS.map((icon) => (
                                            <button
                                                key={icon.value}
                                                onClick={() => handleChange(event.id, 'icon', icon.value)}
                                                className={`p-2 rounded hover:bg-primary-50 flex justify-center ${event.icon === icon.value ? 'text-primary-600 bg-primary-50' : 'text-secondary-500'}`}
                                                title={icon.label}
                                            >
                                                {icon.icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Masa (cth: 11:00 AM)"
                                    value={event.time}
                                    onChange={(e) => handleChange(event.id, 'time', e.target.value)}
                                    className="w-full"
                                />
                                <Input
                                    placeholder="Tajuk Aktiviti"
                                    value={event.title}
                                    onChange={(e) => handleChange(event.id, 'title', e.target.value)}
                                    className="font-medium"
                                />
                                <div className="md:col-span-2">
                                    <Input
                                        placeholder="Deskripsi (Optional)"
                                        value={event.description || ''}
                                        onChange={(e) => handleChange(event.id, 'description', e.target.value)}
                                        className="text-sm text-secondary-500"
                                    />
                                </div>
                            </div>

                            {/* Delete Button */}
                            <div className="md:col-span-1 flex justify-center pt-2">
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className="text-red-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                    title="Remove event"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Connector Line */}
                        {index < events.length - 1 && (
                            <div className="hidden md:block absolute left-[2.4rem] -bottom-4 w-px h-4 bg-secondary-200" />
                        )}
                    </Card>
                ))}

                <Button
                    variant="outline"
                    fullWidth
                    onClick={handleAddEvent}
                    icon={<Plus className="w-4 h-4" />}
                    className="py-4 border-dashed"
                >
                    Tambah Aktiviti
                </Button>
            </div>
        </div>
    );
};
