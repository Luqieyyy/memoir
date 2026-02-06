import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  DocumentReference,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './config';
import { WeddingEvent, GuestEntry, WeddingWish, WeddingPhoto, RSVPSettings, RSVPResponse, RSVPStats, RSVPStatus, ThemeConfig, UpdateThemeInput } from '@/types';
import { generateWeddingId } from '@/lib/utils/helpers';

// ============================================
// EVENT OPERATIONS
// ============================================

/**
 * Create a new wedding event
 */
export async function createEvent(
  ownerId: string,
  eventData: {
    brideName: string;
    groomName: string;
    weddingDate: Date;
    venue: string;
    welcomeMessage?: string;
    coverImage?: string;
    isActive?: boolean;
  }
): Promise<WeddingEvent> {
  const weddingId = generateWeddingId();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://memoir.app';
  const qrCodeUrl = `${appUrl}/wedding/${weddingId}`;

  const eventRef = doc(collection(db, 'events'));

  // Build event object without undefined values (Firestore doesn't accept undefined)
  const event: Record<string, any> = {
    id: eventRef.id,
    weddingId,
    ownerId,
    brideName: eventData.brideName,
    groomName: eventData.groomName,
    weddingDate: eventData.weddingDate,
    venue: eventData.venue,
    welcomeMessage: eventData.welcomeMessage || '',
    qrCodeUrl,
    isActive: eventData.isActive ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  // Only add coverImage if it has a value
  if (eventData.coverImage) {
    event.coverImage = eventData.coverImage;
  }

  await setDoc(eventRef, event);

  return {
    id: event.id,
    weddingId: event.weddingId,
    ownerId: event.ownerId,
    brideName: event.brideName,
    groomName: event.groomName,
    weddingDate: event.weddingDate,
    venue: event.venue,
    welcomeMessage: event.welcomeMessage,
    qrCodeUrl: event.qrCodeUrl,
    isActive: event.isActive,
    coverImage: event.coverImage,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as WeddingEvent;
}

/**
 * Get event by ID
 */
export async function getEventById(eventId: string): Promise<WeddingEvent | null> {
  const docRef = doc(db, 'events', eventId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      ...data,
      id: docSnap.id,
      weddingDate: data.weddingDate instanceof Timestamp ? data.weddingDate.toDate() : new Date(data.weddingDate),
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as WeddingEvent;
  }

  return null;
}

/**
 * Get event by wedding ID (public access for guests)
 */
export async function getEventByWeddingId(weddingId: string): Promise<WeddingEvent | null> {
  const q = query(collection(db, 'events'), where('weddingId', '==', weddingId), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      weddingDate: data.weddingDate instanceof Timestamp ? data.weddingDate.toDate() : new Date(data.weddingDate),
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as WeddingEvent;
  }

  return null;
}

/**
 * Get all events for a specific owner
 */
export async function getEventsByOwner(ownerId: string): Promise<WeddingEvent[]> {
  const q = query(
    collection(db, 'events'),
    where('ownerId', '==', ownerId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      weddingDate: data.weddingDate instanceof Timestamp ? data.weddingDate.toDate() : new Date(data.weddingDate),
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as WeddingEvent;
  });
}

/**
 * Update event details
 */
export async function updateEvent(
  eventId: string,
  updates: Partial<Omit<WeddingEvent, 'id' | 'weddingId' | 'ownerId' | 'createdAt' | 'qrCodeUrl'>>
): Promise<void> {
  const eventRef = doc(db, 'events', eventId);
  await updateDoc(eventRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete an event
 */
export async function deleteEvent(eventId: string): Promise<void> {
  const eventRef = doc(db, 'events', eventId);
  await deleteDoc(eventRef);
}

/**
 * Subscribe to event updates
 */
export function subscribeToEvent(
  eventId: string,
  callback: (event: WeddingEvent | null) => void
): () => void {
  const eventRef = doc(db, 'events', eventId);

  return onSnapshot(eventRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback({
        ...data,
        id: docSnap.id,
        weddingDate: data.weddingDate instanceof Timestamp ? data.weddingDate.toDate() : new Date(data.weddingDate),
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as WeddingEvent);
    } else {
      callback(null);
    }
  });
}

// ============================================
// GUEST OPERATIONS
// ============================================

/**
 * Add a guest entry (wish + optional photos)
 */
export async function addGuestEntry(
  weddingId: string,
  guestData: {
    guestName: string;
    message?: string;
  }
): Promise<GuestEntry> {
  const guestRef = doc(collection(db, 'events', weddingId, 'guests'));

  const guest: Omit<GuestEntry, 'createdAt'> & { createdAt: any } = {
    id: guestRef.id,
    weddingId,
    guestName: guestData.guestName,
    message: guestData.message || '',
    createdAt: serverTimestamp(),
  };

  await setDoc(guestRef, guest);

  return {
    ...guest,
    createdAt: new Date(),
  };
}

/**
 * Get all guests for an event
 */
export async function getGuestsByWeddingId(weddingId: string): Promise<GuestEntry[]> {
  // First get the event by weddingId to get the event ID
  const event = await getEventByWeddingId(weddingId);
  if (!event) return [];

  const q = query(
    collection(db, 'events', event.id, 'guests'),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt?.toDate() || new Date(),
    } as GuestEntry;
  });
}

/**
 * Subscribe to guests updates
 */
export function subscribeToGuests(
  eventId: string,
  callback: (guests: GuestEntry[]) => void
): () => void {
  const q = query(
    collection(db, 'events', eventId, 'guests'),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (querySnapshot) => {
    const guests = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as GuestEntry;
    });
    callback(guests);
  });
}

// ============================================
// WISH OPERATIONS
// ============================================

/**
 * Add a wedding wish
 */
export async function addWish(
  eventId: string,
  wishData: {
    guestName: string;
    message: string;
  }
): Promise<WeddingWish> {
  const wishRef = doc(collection(db, 'events', eventId, 'wishes'));

  const wish: Omit<WeddingWish, 'createdAt'> & { createdAt: any } = {
    id: wishRef.id,
    eventId,
    guestName: wishData.guestName,
    message: wishData.message,
    createdAt: serverTimestamp(),
  };

  await setDoc(wishRef, wish);

  return {
    ...wish,
    createdAt: new Date(),
  };
}

/**
 * Get all wishes for an event
 */
export async function getWishesByEventId(eventId: string): Promise<WeddingWish[]> {
  const q = query(
    collection(db, 'events', eventId, 'wishes'),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt?.toDate() || new Date(),
    } as WeddingWish;
  });
}

/**
 * Subscribe to wishes updates (real-time)
 */
export function subscribeToWishes(
  eventId: string,
  callback: (wishes: WeddingWish[]) => void
): () => void {
  const q = query(
    collection(db, 'events', eventId, 'wishes'),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (querySnapshot) => {
    const wishes = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as WeddingWish;
    });
    callback(wishes);
  });
}

// ============================================
// PHOTO OPERATIONS
// ============================================

/**
 * Add a photo record
 */
export async function addPhotoRecord(
  eventId: string,
  photoData: {
    guestName: string;
    url: string;
    storagePath: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
  }
): Promise<WeddingPhoto> {
  const photoRef = doc(collection(db, 'events', eventId, 'photos'));

  const photo: Omit<WeddingPhoto, 'createdAt'> & { createdAt: any } = {
    id: photoRef.id,
    eventId,
    guestName: photoData.guestName,
    url: photoData.url,
    storagePath: photoData.storagePath,
    fileName: photoData.fileName,
    fileSize: photoData.fileSize,
    mimeType: photoData.mimeType,
    createdAt: serverTimestamp(),
  };

  await setDoc(photoRef, photo);

  return {
    ...photo,
    createdAt: new Date(),
  };
}

/**
 * Get all photos for an event
 */
export async function getPhotosByEventId(eventId: string): Promise<WeddingPhoto[]> {
  const q = query(
    collection(db, 'events', eventId, 'photos'),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt?.toDate() || new Date(),
    } as WeddingPhoto;
  });
}

/**
 * Subscribe to photos updates (real-time)
 */
export function subscribeToPhotos(
  eventId: string,
  callback: (photos: WeddingPhoto[]) => void
): () => void {
  const q = query(
    collection(db, 'events', eventId, 'photos'),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (querySnapshot) => {
    const photos = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as WeddingPhoto;
    });
    callback(photos);
  });
}

/**
 * Get event statistics
 */
export async function getEventStats(eventId: string): Promise<{
  totalGuests: number;
  totalWishes: number;
  totalPhotos: number;
}> {
  const [guestsSnap, wishesSnap, photosSnap] = await Promise.all([
    getDocs(collection(db, 'events', eventId, 'guests')),
    getDocs(collection(db, 'events', eventId, 'wishes')),
    getDocs(collection(db, 'events', eventId, 'photos')),
  ]);

  return {
    totalGuests: guestsSnap.size,
    totalWishes: wishesSnap.size,
    totalPhotos: photosSnap.size,
  };
}

// ============================================
// RSVP SETTINGS OPERATIONS
// ============================================

/**
 * Get or create RSVP settings for an event
 */
export async function getRSVPSettings(eventId: string): Promise<RSVPSettings> {
  const settingsRef = doc(db, 'events', eventId, 'rsvpSettings', 'settings');
  const docSnap = await getDoc(settingsRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      ...data,
      id: docSnap.id,
      eventId,
      deadline: data.deadline?.toDate() || undefined,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as RSVPSettings;
  }

  // Create default settings if not exists
  const defaultSettings: Omit<RSVPSettings, 'createdAt' | 'updatedAt'> & { createdAt: any; updatedAt: any } = {
    id: 'settings',
    eventId,
    isEnabled: true,
    maxGuestsPerRsvp: 5,
    requirePhone: false,
    showGuestCount: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(settingsRef, defaultSettings);

  return {
    ...defaultSettings,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Update RSVP settings
 */
export async function updateRSVPSettings(
  eventId: string,
  updates: Partial<Omit<RSVPSettings, 'id' | 'eventId' | 'createdAt'>>
): Promise<void> {
  const settingsRef = doc(db, 'events', eventId, 'rsvpSettings', 'settings');
  await updateDoc(settingsRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

// ============================================
// RSVP RESPONSE OPERATIONS
// ============================================

/**
 * Add an RSVP response
 */
export async function addRSVPResponse(
  eventId: string,
  responseData: {
    guestName: string;
    phoneNumber?: string;
    status: RSVPStatus;
    guestCount: number;
    message?: string;
  }
): Promise<RSVPResponse> {
  const responseRef = doc(collection(db, 'events', eventId, 'rsvpResponses'));

  const response: Omit<RSVPResponse, 'createdAt' | 'updatedAt'> & { createdAt: any; updatedAt: any } = {
    id: responseRef.id,
    eventId,
    guestName: responseData.guestName,
    phoneNumber: responseData.phoneNumber || '',
    status: responseData.status,
    guestCount: responseData.guestCount,
    message: responseData.message || '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(responseRef, response);

  return {
    ...response,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Get all RSVP responses for an event
 */
export async function getRSVPResponses(eventId: string): Promise<RSVPResponse[]> {
  const q = query(
    collection(db, 'events', eventId, 'rsvpResponses'),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as RSVPResponse;
  });
}

/**
 * Subscribe to RSVP responses (real-time)
 */
export function subscribeToRSVPResponses(
  eventId: string,
  callback: (responses: RSVPResponse[]) => void
): () => void {
  const q = query(
    collection(db, 'events', eventId, 'rsvpResponses'),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (querySnapshot) => {
    const responses = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as RSVPResponse;
    });
    callback(responses);
  });
}

/**
 * Get RSVP statistics
 */
export async function getRSVPStats(eventId: string): Promise<RSVPStats> {
  const responses = await getRSVPResponses(eventId);

  const stats: RSVPStats = {
    total: responses.length,
    attending: 0,
    notAttending: 0,
    maybe: 0,
    totalGuestCount: 0,
  };

  responses.forEach((response) => {
    switch (response.status) {
      case 'attending':
        stats.attending++;
        stats.totalGuestCount += response.guestCount;
        break;
      case 'not_attending':
        stats.notAttending++;
        break;
      case 'maybe':
        stats.maybe++;
        stats.totalGuestCount += response.guestCount; // Count maybe guests too
        break;
    }
  });

  return stats;
}

/**
 * Delete an RSVP response
 */
export async function deleteRSVPResponse(eventId: string, responseId: string): Promise<void> {
  const responseRef = doc(db, 'events', eventId, 'rsvpResponses', responseId);
  await deleteDoc(responseRef);
}

// ============================================
// THEME OPERATIONS
// ============================================

const DEFAULT_THEME: ThemeConfig = {
  templateId: 'modern-minimal',
  colors: {
    primary: '#D4A5A5',
    secondary: '#4A5568',
    accent: '#E8BCB9',
    background: '#FFFBF7',
    text: '#2D3748',
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Inter',
  },
  hero: {
    layout: 'centered',
    showCountdown: true,
    overlayOpacity: 0.1,
  },
  sections: {
    rsvp: true,
    timeline: true,
    memories: true,
    share: true,
  },
  sectionOrder: ['rsvp', 'timeline', 'memories', 'share'],
};

/**
 * Get theme configuration for an event
 */
export async function getThemeConfig(eventId: string): Promise<ThemeConfig> {
  const themeRef = doc(db, 'events', eventId, 'theme', 'config');
  const themeDoc = await getDoc(themeRef);

  if (themeDoc.exists()) {
    return themeDoc.data() as ThemeConfig;
  }

  // Create default theme if not exists
  await setDoc(themeRef, DEFAULT_THEME);
  return DEFAULT_THEME;
}

/**
 * Update theme configuration
 */
export async function updateThemeConfig(
  eventId: string,
  updates: UpdateThemeInput
): Promise<ThemeConfig> {
  const themeRef = doc(db, 'events', eventId, 'theme', 'config');
  const currentTheme = await getThemeConfig(eventId);

  const updatedTheme: ThemeConfig = {
    ...currentTheme,
    ...updates,
    colors: updates.colors
      ? { ...currentTheme.colors, ...updates.colors }
      : currentTheme.colors,
    fonts: updates.fonts
      ? { ...currentTheme.fonts, ...updates.fonts }
      : currentTheme.fonts,
    hero: updates.hero
      ? { ...currentTheme.hero, ...updates.hero }
      : currentTheme.hero,
    sections: updates.sections
      ? { ...currentTheme.sections, ...updates.sections }
      : currentTheme.sections,
  };

  await setDoc(themeRef, updatedTheme);
  return updatedTheme;
}

/**
 * Subscribe to theme changes (real-time)
 */
export function subscribeToTheme(
  eventId: string,
  callback: (theme: ThemeConfig) => void
): () => void {
  const themeRef = doc(db, 'events', eventId, 'theme', 'config');

  return onSnapshot(themeRef, async (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data() as ThemeConfig);
    } else {
      // Initialize default theme
      const defaultTheme = await getThemeConfig(eventId);
      callback(defaultTheme);
    }
  });
}

