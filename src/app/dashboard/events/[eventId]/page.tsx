'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthContext } from '@/contexts';
import { useEvent, useWishes, usePhotos } from '@/lib/hooks';
import { QRCodeDisplay } from '@/components/events';
import { WishDisplay, PhotoGallery } from '@/components/wedding';
import { Button, Card, Badge, Spinner, Modal, Skeleton, EmptyState } from '@/components/ui';
import { formatDate, getDaysUntil, isDateInPast, isToday } from '@/lib/utils';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Heart,
  Image,
  QrCode,
  Edit,
  Trash2,
  ExternalLink,
  Download,
  MessageSquare,
} from 'lucide-react';
import toast from 'react-hot-toast';

type TabType = 'qrcode' | 'wishes' | 'photos';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  
  const { user } = useAuthContext();
  const { event, stats, loading, error, remove } = useEvent(eventId);
  const { wishes, loading: wishesLoading } = useWishes(eventId);
  const { photos, loading: photosLoading } = usePhotos(eventId);

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
    { key: 'wishes', label: 'Wishes', icon: <MessageSquare className="w-4 h-4" />, count: stats?.totalWishes },
    { key: 'photos', label: 'Photos', icon: <Image className="w-4 h-4" />, count: stats?.totalPhotos },
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
        <div className="grid grid-cols-3 divide-x divide-secondary-100 border-t border-secondary-100">
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
              <Users className="w-4 h-4" />
            </div>
            <p className="text-xl font-semibold text-secondary-800">{stats?.totalGuests || 0}</p>
            <p className="text-xs text-secondary-500">Guests</p>
          </div>
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
              <Heart className="w-4 h-4" />
            </div>
            <p className="text-xl font-semibold text-secondary-800">{stats?.totalWishes || 0}</p>
            <p className="text-xs text-secondary-500">Wishes</p>
          </div>
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
              <Image className="w-4 h-4" />
            </div>
            <p className="text-xl font-semibold text-secondary-800">{stats?.totalPhotos || 0}</p>
            <p className="text-xs text-secondary-500">Photos</p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-primary-600 text-white'
                : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.key
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
      <div>
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

        {activeTab === 'wishes' && (
          <div>
            <WishDisplay wishes={wishes} loading={wishesLoading} />
          </div>
        )}

        {activeTab === 'photos' && (
          <div>
            <PhotoGallery photos={photos} loading={photosLoading} />
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
