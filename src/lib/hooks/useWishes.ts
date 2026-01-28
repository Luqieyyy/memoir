'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getWishesByEventId,
  addWish,
  subscribeToWishes,
} from '@/lib/firebase';
import { WeddingWish, CreateWishInput } from '@/types';

export interface UseWishesReturn {
  wishes: WeddingWish[];
  loading: boolean;
  error: string | null;
  addWish: (data: CreateWishInput) => Promise<WeddingWish>;
  adding: boolean;
}

export function useWishes(eventId: string | null): UseWishesReturn {
  const [wishes, setWishes] = useState<WeddingWish[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!eventId) {
      setWishes([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToWishes(eventId, (updatedWishes) => {
      setWishes(updatedWishes);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventId]);

  const addNewWish = useCallback(
    async (data: CreateWishInput): Promise<WeddingWish> => {
      if (!eventId) {
        throw new Error('Event ID is required');
      }

      setAdding(true);
      setError(null);

      try {
        const newWish = await addWish(eventId, data);
        return newWish;
      } catch (err) {
        console.error('Error adding wish:', err);
        const errorMessage = 'Failed to send wish';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setAdding(false);
      }
    },
    [eventId]
  );

  return {
    wishes,
    loading,
    error,
    addWish: addNewWish,
    adding,
  };
}
