'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthContext } from '@/contexts';
import { useEvent, useWishes, usePhotos, useRSVP, useTheme } from '@/lib/hooks';
import { QRCodeDisplay } from '@/components/events';
import { RSVPDashboard, MemoryWall, DEFAULT_WEDDING_TIMELINE } from '@/components/wedding';
import { AppearanceEditor, TimelineEditor } from '@/components/dashboard';
import { Button, Card, Badge, Spinner, Modal, Skeleton, EmptyState } from '@/components/ui';
import { formatDate, getDaysUntil, isDateInPast, isToday } from '@/lib/utils';
import { TimelineEvent } from '@/types';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Heart,
  QrCode,
  Edit,
  Trash2,
  ExternalLink,
  Download,
  Sparkles,
  Camera,
  Copy,
  Clock,
} from 'lucide-react';
import toast from 'react-hot-toast';

type TabType = 'qrcode' | 'rsvp' | 'timeline' | 'memories' | 'appearance';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;

  const { user } = useAuthContext();
  const { event, stats, loading, error, remove, update } = useEvent(eventId);
  const { wishes, loading: wishesLoading } = useWishes(eventId);
  const { photos, loading: photosLoading } = usePhotos(eventId);
  const {
    settings: rsvpSettings,
    responses: rsvpResponses,
    stats: rsvpStats,
    updateSettings: rsvpUpdateSettings,
    removeResponse: rsvpRemoveResponse,
    settingsLoading: rsvpLoading
  } = useRSVP(eventId);
  const { theme, loading: themeLoading, updateTheme, applyTemplate, presets } = useTheme(eventId);

  const [activeTab, setActiveTab] = useState<TabType>('qrcode');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Check ownership
  useEffect(() => {
    if (!loading && event && user && event.ownerId !== user.uid) {
      router.push('/dashboard');
      toast.error('You do not have access to this event');
    }
  }, [event, user, loading, router]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await remove();
      toast.success('Event deleted successfully');
      router.push('/dashboard/events');
    } catch (error) {
      toast.error('Failed to delete event');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleUpdateTimeline = async (timelineEvents: TimelineEvent[]) => {
    try {
      await update({ timeline: timelineEvents });
      toast.success('Aturcara berjaya dikemaskini!');
    } catch (err) {
      toast.error('Gagal mengemaskini aturcara');
    }
  };

  // Convert default timeline to match type if needed (ensure icon string compatibility)
  const initialTimeline = (event?.timeline || DEFAULT_WEDDING_TIMELINE).map(ev => ({
    ...ev,
    icon: ev.icon || 'clock'
  })) as TimelineEvent[];

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="mb-6">
          <Skeleton height={24} width={100} className="mb-4" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton height={200} />
            <Skeleton height={300} />
          </div>
          <div>
            <Skeleton height={400} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="p-6 lg:p-8">
        <EmptyState
          icon={<Calendar className="w-8 h-8" />}
          title="Event not found"
          description="The event you're looking for doesn't exist or has been deleted."
          action={
            <Link href="/dashboard/events">
              <Button>Go to Events</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const isPast = isDateInPast(event.weddingDate);
  const weddingToday = isToday(event.weddingDate);
  const daysUntil = getDaysUntil(event.weddingDate);

  const getStatusBadge = () => {
    if (!event.isActive) return <Badge variant="default">Inactive</Badge>;
    if (isPast) return <Badge variant="success">Completed</Badge>;
    if (weddingToday) return <Badge variant="warning">Today!</Badge>;
    if (daysUntil <= 7) return <Badge variant="info">{daysUntil} days left</Badge>;
    return <Badge variant="success">Upcoming</Badge>;
  };

  const tabs: { key: TabType; label: string; icon: React.ReactNode; count?: number }[] = [
    { key: 'qrcode', label: 'QR Code', icon: <QrCode className="w-4 h-4" /> },
    { key: 'rsvp', label: 'RSVP', icon: <Users className="w-4 h-4" />, count: rsvpStats?.total },
    { key: 'timeline', label: 'Aturcara', icon: <Clock className="w-4 h-4" /> },
    { key: 'memories', label: 'Kenangan', icon: <Heart className="w-4 h-4" />, count: (stats?.totalWishes || 0) + (stats?.totalPhotos || 0) },
    { key: 'appearance', label: 'Reka Bentuk', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/dashboard/events')}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Back to Events
        </Button>
      </div>

      {/* Event Header */}
      <Card className="mb-6 overflow-hidden" padding="none">
        <div className="p-6 bg-gradient-romantic">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-display font-bold text-secondary-800">
                  {event.brideName} & {event.groomName}
                </h1>
                {getStatusBadge()}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-secondary-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.weddingDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/wedding/${event.weddingId}`} target="_blank">
                <Button variant="outline" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                  Preview
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                icon={<Trash2 className="w-4 h-4 text-red-500" />}
              />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-secondary-100 border-t border-secondary-100">
          <div className="p-4 text-center group cursor-default hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-center gap-2 text-primary-600 mb-1 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-secondary-800">{rsvpStats?.attending || 0}</p>
            <p className="text-xs font-medium text-secondary-500 uppercase tracking-wider">Hadir</p>
          </div>
          <div className="p-4 text-center group cursor-default hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-center gap-2 text-blue-500 mb-1 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-secondary-800">{stats?.totalGuests || 0}</p>
            <p className="text-xs font-medium text-secondary-500 uppercase tracking-wider">Tetamu</p>
          </div>
          <div className="p-4 text-center group cursor-default hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-center gap-2 text-rose-500 mb-1 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-secondary-800">{stats?.totalWishes || 0}</p>
            <p className="text-xs font-medium text-secondary-500 uppercase tracking-wider">Ucapan</p>
          </div>
          <div className="p-4 text-center group cursor-default hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-center gap-2 text-amber-500 mb-1 group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-secondary-800">{stats?.totalPhotos || 0}</p>
            <p className="text-xs font-medium text-secondary-500 uppercase tracking-wider">Foto</p>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-secondary-50 p-3 flex justify-center gap-3 border-t border-secondary-100">
          <Button
            variant="ghost"
            size="sm"
            className="text-secondary-600 hover:text-primary-600 hover:bg-white"
            icon={<Download className="w-4 h-4" />}
            onClick={() => setActiveTab('qrcode')}
          >
            Download QR
          </Button>
          <div className="w-px bg-secondary-200 h-6 my-auto" />
          <Button
            variant="ghost"
            size="sm"
            className="text-secondary-600 hover:text-primary-600 hover:bg-white"
            icon={<Copy className="w-4 h-4" />}
            onClick={() => {
              const url = `${window.location.origin}/wedding/${event.weddingId}`;
              navigator.clipboard.writeText(url);
              toast.success('Link disalin!');
            }}
          >
            Copy Link
          </Button>
          <div className="w-px bg-secondary-200 h-6 my-auto" />
          <Button
            variant="ghost"
            size="sm"
            className="text-secondary-600 hover:text-primary-600 hover:bg-white"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => setActiveTab('appearance')}
          >
            Edit Design
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === tab.key
              ? 'bg-primary-600 text-white'
              : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.key
                  ? 'bg-white/20 text-white'
                  : 'bg-secondary-100 text-secondary-600'
                  }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in-up">
        {activeTab === 'qrcode' && (
          <div className="max-w-md mx-auto">
            <QRCodeDisplay
              url={event.qrCodeUrl}
              brideName={event.brideName}
              groomName={event.groomName}
              weddingId={event.weddingId}
            />
          </div>
        )}

        {activeTab === 'rsvp' && (
          <div>
            {rsvpLoading ? (
              <div className="flex justify-center p-12">
                <Spinner />
              </div>
            ) : rsvpSettings ? (
              <RSVPDashboard
                settings={rsvpSettings}
                responses={rsvpResponses}
                stats={rsvpStats}
                onUpdateSettings={rsvpUpdateSettings}
                onDeleteResponse={rsvpRemoveResponse}
              />
            ) : (
              <EmptyState
                title="Error loading RSVP"
                description="Could not load RSVP settings"
              />
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="max-w-3xl mx-auto">
            <TimelineEditor
              initialEvents={initialTimeline}
              onSave={handleUpdateTimeline}
            />
          </div>
        )}

        {activeTab === 'memories' && (
          <div>
            <MemoryWall
              wishes={wishes}
              photos={photos}
              wishesLoading={wishesLoading}
              photosLoading={photosLoading}
            />
          </div>
        )}

        {activeTab === 'appearance' && (
          <div>
            {themeLoading ? (
              <div className="flex justify-center p-12">
                <Spinner />
              </div>
            ) : theme ? (
              <AppearanceEditor
                theme={theme}
                presets={presets}
                onUpdateTheme={updateTheme}
                onApplyTemplate={applyTemplate}
                loading={themeLoading}
                previewUrl={`/wedding/${event.weddingId}`}
              />
            ) : (
              <EmptyState
                title="Error loading theme"
                description="Could not load appearance settings"
              />
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Event"
        size="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">
            Delete this event?
          </h3>
          <p className="text-secondary-500 mb-6">
            This will permanently delete the event and all associated wishes and photos.
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowDeleteModal(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              fullWidth
              onClick={handleDelete}
              loading={deleting}
            >
              Delete Event
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
