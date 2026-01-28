'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts';
import { useEvents } from '@/lib/hooks';
import { EventCard } from '@/components/events';
import { Button, EmptyState, Skeleton, Card } from '@/components/ui';
import { PlusCircle, Calendar } from 'lucide-react';

export default function EventsListPage() {
  const { user } = useAuthContext();
  const { events, loading, error } = useEvents(user?.uid || null);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-secondary-800 mb-2">
            My Wedding Events
          </h1>
          <p className="text-secondary-500">
            Manage all your wedding events and their memories
          </p>
        </div>
        <Link href="/dashboard/events/new">
          <Button icon={<PlusCircle className="w-4 h-4" />}>Create Event</Button>
        </Link>
      </div>

      {/* Events List */}
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
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
