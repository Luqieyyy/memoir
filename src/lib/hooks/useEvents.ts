'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getEventsByOwner,
  getEventById,
  getEventByWeddingId,
  createEvent,
  updateEvent,
  deleteEvent,
  subscribeToEvent,
  getEventStats,
} from '@/lib/firebase';
import { WeddingEvent, CreateEventInput, UpdateEventInput, EventStats } from '@/types';

// ============================================
// useEvents - Get all events for owner
// ============================================

export interface UseEventsReturn {
  events: WeddingEvent[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useEvents(ownerId: string | null): UseEventsReturn {
  const [events, setEvents] = useState<WeddingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!ownerId) {
      setEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedEvents = await getEventsByOwner(ownerId);
      setEvents(fetchedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [ownerId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    refresh: fetchEvents,
  };
}

// ============================================
// useEvent - Get single event with real-time updates
// ============================================

export interface UseEventReturn {
  event: WeddingEvent | null;
  stats: EventStats | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  update: (updates: UpdateEventInput) => Promise<void>;
  remove: () => Promise<void>;
}

export function useEvent(eventId: string | null): UseEventReturn {
  const [event, setEvent] = useState<WeddingEvent | null>(null);
  const [stats, setStats] = useState<EventStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!eventId) {
      setEvent(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedEvent = await getEventById(eventId);
      setEvent(fetchedEvent);

      if (fetchedEvent) {
        const eventStats = await getEventStats(eventId);
        setStats(eventStats);
      }
    } catch (err) {
      console.error('Error fetching event:', err);
      setError('Failed to load event');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!eventId) return;

    const unsubscribe = subscribeToEvent(eventId, (updatedEvent) => {
      setEvent(updatedEvent);
    });

    return () => unsubscribe();
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const update = useCallback(
    async (updates: UpdateEventInput) => {
      if (!eventId) return;

      try {
        await updateEvent(eventId, updates);
      } catch (err) {
        console.error('Error updating event:', err);
        throw new Error('Failed to update event');
      }
    },
    [eventId]
  );

  const remove = useCallback(async () => {
    if (!eventId) return;

    try {
      await deleteEvent(eventId);
      setEvent(null);
    } catch (err) {
      console.error('Error deleting event:', err);
      throw new Error('Failed to delete event');
    }
  }, [eventId]);

  return {
    event,
    stats,
    loading,
    error,
    refresh: fetchEvent,
    update,
    remove,
  };
}

// ============================================
// usePublicEvent - Get event by wedding ID (for guests)
// ============================================

export interface UsePublicEventReturn {
  event: WeddingEvent | null;
  loading: boolean;
  error: string | null;
}

export function usePublicEvent(weddingId: string | null): UsePublicEventReturn {
  const [event, setEvent] = useState<WeddingEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!weddingId) {
      setEvent(null);
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedEvent = await getEventByWeddingId(weddingId);
        
        if (!fetchedEvent) {
          setError('Wedding not found');
        } else if (!fetchedEvent.isActive) {
          setError('This wedding event is no longer active');
        } else {
          setEvent(fetchedEvent);
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load wedding details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [weddingId]);

  return {
    event,
    loading,
    error,
  };
}

// ============================================
// useCreateEvent hook
// ============================================

export interface UseCreateEventReturn {
  create: (data: CreateEventInput) => Promise<WeddingEvent>;
  loading: boolean;
  error: string | null;
}

export function useCreateEvent(ownerId: string | null): UseCreateEventReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(
    async (data: CreateEventInput): Promise<WeddingEvent> => {
      if (!ownerId) {
        throw new Error('User not authenticated');
      }

      setLoading(true);
      setError(null);

      try {
        const newEvent = await createEvent(ownerId, data);
        return newEvent;
      } catch (err) {
        console.error('Error creating event:', err);
        const errorMessage = 'Failed to create event';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [ownerId]
  );

  return {
    create,
    loading,
    error,
  };
}
