'use client';

import React, { useState } from 'react';
import { RSVPSettings, RSVPResponse, RSVPStats } from '@/types';
import { Card, Button, Badge } from '@/components/ui';
import {
    Users,
    Check,
    X,
    Info,
    Download,
    Settings,
    Calendar,
    Trash2,
    MessageSquare,
    Clock,
} from 'lucide-react';
import { getRelativeTime } from '@/lib/utils';

interface RSVPDashboardProps {
    settings: RSVPSettings;
    responses: RSVPResponse[];
    stats: RSVPStats;
    onUpdateSettings: (updates: Partial<RSVPSettings>) => Promise<void>;
    onDeleteResponse: (responseId: string) => Promise<void>;
}

export const RSVPDashboard: React.FC<RSVPDashboardProps> = ({
    settings,
    responses,
    stats,
    onUpdateSettings,
    onDeleteResponse,
}) => {
    const [showSettings, setShowSettings] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'attending' | 'not_attending' | 'maybe'>('all');

    // Settings form state
    const [isEnabled, setIsEnabled] = useState(settings.isEnabled);
    const [maxGuests, setMaxGuests] = useState(settings.maxGuestsPerRsvp);
    const [requirePhone, setRequirePhone] = useState(settings.requirePhone);
    const [showGuestCount, setShowGuestCount] = useState(settings.showGuestCount);
    const [deadline, setDeadline] = useState(
        settings.deadline ? settings.deadline.toISOString().split('T')[0] : ''
    );
    const [totalCapacity, setTotalCapacity] = useState(settings.totalCapacity || '');

    const handleSaveSettings = async () => {
        setIsUpdating(true);
        try {
            await onUpdateSettings({
                isEnabled,
                maxGuestsPerRsvp: maxGuests,
                requirePhone,
                showGuestCount,
                deadline: deadline ? new Date(deadline) : undefined,
                totalCapacity: totalCapacity ? parseInt(totalCapacity as string) : undefined,
            });
            setShowSettings(false);
        } catch (err) {
            console.error('Error updating settings:', err);
        } finally {
            setIsUpdating(false);
        }
    };

    const filteredResponses = responses.filter((response) => {
        if (activeTab === 'all') return true;
        return response.status === activeTab;
    });

    const exportToCSV = () => {
        const headers = ['Nama', 'No. Telefon', 'Status', 'Bilangan Tetamu', 'Ucapan', 'Tarikh'];
        const rows = responses.map((r) => [
            r.guestName,
            r.phoneNumber || '-',
            r.status === 'attending' ? 'Hadir' : r.status === 'not_attending' ? 'Tidak Hadir' : 'Belum Pasti',
            r.guestCount.toString(),
            r.message || '-',
            r.createdAt.toLocaleDateString('ms-MY'),
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `rsvp-list-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const capacityPercentage = settings.totalCapacity
        ? Math.min(100, (stats.totalGuestCount / settings.totalCapacity) * 100)
        : 0;

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="text-center" padding="md">
                    <div className="text-3xl font-bold text-secondary-800">{stats.total}</div>
                    <div className="text-sm text-secondary-500">Jumlah Respon</div>
                </Card>

                <Card className="text-center bg-green-50 border-green-200" padding="md">
                    <div className="text-3xl font-bold text-green-600">{stats.attending}</div>
                    <div className="text-sm text-green-700">Hadir</div>
                    <div className="text-xs text-green-600 mt-1">{stats.totalGuestCount} pax</div>
                </Card>

                <Card className="text-center bg-red-50 border-red-200" padding="md">
                    <div className="text-3xl font-bold text-red-500">{stats.notAttending}</div>
                    <div className="text-sm text-red-600">Tidak Hadir</div>
                </Card>

                <Card className="text-center bg-amber-50 border-amber-200" padding="md">
                    <div className="text-3xl font-bold text-amber-500">{stats.maybe}</div>
                    <div className="text-sm text-amber-600">Belum Pasti</div>
                </Card>
            </div>

            {/* Capacity Bar (if set) */}
            {settings.totalCapacity && (
                <Card padding="md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-secondary-700">
                            Kapasiti Tetamu
                        </span>
                        <span className="text-sm text-secondary-500">
                            {stats.totalGuestCount} / {settings.totalCapacity} pax
                        </span>
                    </div>
                    <div className="w-full h-3 bg-secondary-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all ${capacityPercentage > 90 ? 'bg-red-500' :
                                capacityPercentage > 70 ? 'bg-amber-500' : 'bg-green-500'
                                }`}
                            style={{ width: `${capacityPercentage}%` }}
                        />
                    </div>
                </Card>
            )}

            {/* Actions Bar */}
            <div className="flex flex-wrap gap-3">
                <Button
                    variant="outline"
                    size="sm"
                    icon={<Settings className="w-4 h-4" />}
                    onClick={() => setShowSettings(!showSettings)}
                >
                    Tetapan RSVP
                </Button>

                <Button
                    variant="secondary"
                    size="sm"
                    icon={<Download className="w-4 h-4" />}
                    onClick={exportToCSV}
                    disabled={responses.length === 0}
                >
                    Export CSV
                </Button>

                <div className="flex-1" />

                <Badge variant={settings.isEnabled ? 'success' : 'default'}>
                    {settings.isEnabled ? 'RSVP Aktif' : 'RSVP Tidak Aktif'}
                </Badge>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <Card className="border-primary-200 bg-primary-50/30" padding="lg">
                    <h4 className="text-lg font-semibold text-secondary-800 mb-4">
                        Tetapan RSVP
                    </h4>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Enable/Disable */}
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-sm font-medium text-secondary-700">RSVP Aktif</span>
                            <button
                                onClick={() => setIsEnabled(!isEnabled)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEnabled ? 'bg-primary-500' : 'bg-secondary-200'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Require Phone */}
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-sm font-medium text-secondary-700">Wajib No. Telefon</span>
                            <button
                                onClick={() => setRequirePhone(!requirePhone)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${requirePhone ? 'bg-primary-500' : 'bg-secondary-200'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${requirePhone ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Show Guest Count */}
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-sm font-medium text-secondary-700">Tanya Bil. Tetamu</span>
                            <button
                                onClick={() => setShowGuestCount(!showGuestCount)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showGuestCount ? 'bg-primary-500' : 'bg-secondary-200'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showGuestCount ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Max Guests */}
                        <div className="p-3 bg-white rounded-lg border">
                            <label className="text-sm font-medium text-secondary-700 mb-1 block">
                                Max Tetamu per RSVP
                            </label>
                            <select
                                value={maxGuests}
                                onChange={(e) => setMaxGuests(parseInt(e.target.value))}
                                className="w-full p-2 border rounded-lg text-sm"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        {/* Deadline */}
                        <div className="p-3 bg-white rounded-lg border">
                            <label className="text-sm font-medium text-secondary-700 mb-1 block">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Tarikh Akhir RSVP
                            </label>
                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="w-full p-2 border rounded-lg text-sm"
                            />
                        </div>

                        {/* Total Capacity */}
                        <div className="p-3 bg-white rounded-lg border">
                            <label className="text-sm font-medium text-secondary-700 mb-1 block">
                                <Users className="w-4 h-4 inline mr-1" />
                                Kapasiti Maksimum (pax)
                            </label>
                            <input
                                type="number"
                                value={totalCapacity}
                                onChange={(e) => setTotalCapacity(e.target.value)}
                                placeholder="cth: 200"
                                className="w-full p-2 border rounded-lg text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <Button
                            variant="primary"
                            onClick={handleSaveSettings}
                            loading={isUpdating}
                        >
                            Simpan Tetapan
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setShowSettings(false)}
                        >
                            Batal
                        </Button>
                    </div>
                </Card>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-secondary-200 pb-2">
                {[
                    { key: 'all', label: 'Semua', count: stats.total },
                    { key: 'attending', label: 'Hadir', count: stats.attending },
                    { key: 'not_attending', label: 'Tidak Hadir', count: stats.notAttending },
                    { key: 'maybe', label: 'Belum Pasti', count: stats.maybe },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as typeof activeTab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-secondary-500 hover:bg-secondary-100'
                            }`}
                    >
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div>

            {/* Responses List */}
            <div className="space-y-3">
                {filteredResponses.length === 0 ? (
                    <div className="text-center py-12 text-secondary-500">
                        <Users className="w-12 h-12 mx-auto mb-3 text-secondary-300" />
                        <p>Tiada respon RSVP lagi</p>
                    </div>
                ) : (
                    filteredResponses.map((response) => (
                        <Card key={response.id} padding="md" className="hover:shadow-soft transition-shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-secondary-800">
                                            {response.guestName}
                                        </h4>
                                        <Badge
                                            variant={
                                                response.status === 'attending' ? 'success' :
                                                    response.status === 'not_attending' ? 'error' : 'warning'
                                            }
                                            size="sm"
                                        >
                                            {response.status === 'attending' ? 'Hadir' :
                                                response.status === 'not_attending' ? 'Tidak Hadir' : 'Belum Pasti'}
                                        </Badge>
                                        {response.status !== 'not_attending' && (
                                            <span className="text-xs text-secondary-500">
                                                {response.guestCount} pax
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-3 text-sm text-secondary-500">
                                        {response.phoneNumber && (
                                            <span className="flex items-center gap-1">
                                                <MessageSquare className="w-3 h-3" />
                                                {response.phoneNumber}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {getRelativeTime(response.createdAt)}
                                        </span>
                                    </div>

                                    {response.message && (
                                        <div className="mt-2 p-2 bg-secondary-50 rounded-lg text-sm text-secondary-600">
                                            <MessageSquare className="w-3 h-3 inline mr-1" />
                                            {response.message}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => onDeleteResponse(response.id)}
                                    className="p-2 text-secondary-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Padam"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
