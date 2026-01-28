'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts';
import { useEvents } from '@/lib/hooks';
import { getEventStats } from '@/lib/firebase';
import { EventCard } from '@/components/events';
import { Button, Card, EmptyState, Skeleton } from '@/components/ui';
import { EventStats, WeddingEvent } from '@/types';
import {
  PlusCircle,
  Calendar,
  Users,
  Heart,
  Image,
  TrendingUp,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, profile } = useAuthContext();
  const { events, loading, error } = useEvents(user?.uid || null);
  const [eventStats, setEventStats] = useState<Map<string, EventStats>>(new Map());
  const [statsLoading, setStatsLoading] = useState(true);

  // Load stats for all events
  useEffect(() => {
    const loadStats = async () => {
      if (events.length === 0) {
        setStatsLoading(false);
        return;
      }

      setStatsLoading(true);
      const statsMap = new Map<string, EventStats>();

      await Promise.all(
        events.map(async (event) => {
          const stats = await getEventStats(event.id);
          statsMap.set(event.id, stats);
        })
      );

      setEventStats(statsMap);
      setStatsLoading(false);
    };

    if (!loading) {
      loadStats();
    }
  }, [events, loading]);

  // Calculate total stats
  const totalStats = {
    totalEvents: events.length,
    totalGuests: Array.from(eventStats.values()).reduce((sum, s) => sum + s.totalGuests, 0),
    totalWishes: Array.from(eventStats.values()).reduce((sum, s) => sum + s.totalWishes, 0),
    totalPhotos: Array.from(eventStats.values()).reduce((sum, s) => sum + s.totalPhotos, 0),
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-secondary-800 mb-2">
          Welcome back, {profile?.displayName?.split(' ')[0] || 'there'}! 💕
        </h1>
        <p className="text-secondary-500">
          Manage your wedding events and see your guests' memories
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="flex items-center gap-4" padding="md">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary-800">
              {loading ? '-' : totalStats.totalEvents}
            </p>
            <p className="text-sm text-secondary-500">Events</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4" padding="md">
          <div className="w-12 h-12 bg-sage/30 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary-800">
              {statsLoading ? '-' : totalStats.totalGuests}
            </p>
            <p className="text-sm text-secondary-500">Guests</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4" padding="md">
          <div className="w-12 h-12 bg-blush/50 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary-800">
              {statsLoading ? '-' : totalStats.totalWishes}
            </p>
            <p className="text-sm text-secondary-500">Wishes</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4" padding="md">
          <div className="w-12 h-12 bg-champagne/50 rounded-xl flex items-center justify-center">
            <Image className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary-800">
              {statsLoading ? '-' : totalStats.totalPhotos}
            </p>
            <p className="text-sm text-secondary-500">Photos</p>
          </div>
        </Card>
      </div>

      {/* Events Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-semibold text-secondary-800">
          Your Wedding Events
        </h2>
        <Link href="/dashboard/events/new">
          <Button icon={<PlusCircle className="w-4 h-4" />}>Create Event</Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="none">
              <div className="p-6 bg-secondary-50 animate-pulse">
                <Skeleton height={24} width="60%" className="mb-2" />
                <Skeleton height={16} width="40%" />
              </div>
              <div className="p-6 space-y-4">
                <Skeleton height={16} width="80%" />
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="text-center" padding="lg">
          <p className="text-red-600">{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Card>
      ) : events.length === 0 ? (
        <EmptyState
          icon={<Calendar className="w-8 h-8" />}
          title="No wedding events yet"
          description="Create your first wedding event to start collecting memories from your guests"
          action={
            <Link href="/dashboard/events/new">
              <Button icon={<PlusCircle className="w-4 h-4" />}>Create Your First Event</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              stats={eventStats.get(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
