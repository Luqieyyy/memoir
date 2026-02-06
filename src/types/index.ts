// ============================================
// USER TYPES
// ============================================

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// EVENT TYPES
// ============================================

export interface WeddingEvent {
  id: string;
  weddingId: string; // Unique identifier for QR code URL
  ownerId: string; // Firebase Auth UID
  brideName: string;
  groomName: string;
  weddingDate: Date;
  venue: string;
  welcomeMessage?: string;
  qrCodeUrl: string; // Full URL for QR code
  coverImage?: string;
  isActive: boolean;
  timeline?: TimelineEvent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description?: string;
  location?: string;
  icon: string;
}

export interface CreateEventInput {
  brideName: string;
  groomName: string;
  weddingDate: Date;
  venue: string;
  welcomeMessage?: string;
  isActive?: boolean;
  coverImage?: string;
}

export interface UpdateEventInput {
  brideName?: string;
  groomName?: string;
  weddingDate?: Date;
  venue?: string;
  welcomeMessage?: string;
  isActive?: boolean;
  timeline?: TimelineEvent[];
}

// ============================================
// GUEST TYPES
// ============================================

export interface GuestEntry {
  id: string;
  weddingId: string;
  guestName: string;
  message?: string;
  createdAt: Date;
}

// ============================================
// WISH TYPES
// ============================================

export interface WeddingWish {
  id: string;
  eventId: string;
  guestName: string;
  message: string;
  createdAt: Date;
}

export interface CreateWishInput {
  guestName: string;
  message: string;
}

// ============================================
// PHOTO TYPES
// ============================================

export interface WeddingPhoto {
  id: string;
  eventId: string;
  guestName: string;
  url: string;
  storagePath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  caption?: string;
  createdAt: Date;
}

export interface UploadPhotoInput {
  guestName: string;
  file: File;
  caption?: string;
}

// ============================================
// UI STATE TYPES
// ============================================

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface EventStats {
  totalGuests: number;
  totalWishes: number;
  totalPhotos: number;
}

// ============================================
// FORM TYPES
// ============================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export interface EventFormData {
  brideName: string;
  groomName: string;
  weddingDate: string;
  venue: string;
  welcomeMessage: string;
}

export interface GuestSubmissionFormData {
  guestName: string;
  message: string;
  photos: File[];
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================
// COMPONENT PROPS TYPES
// ============================================

export interface EventCardProps {
  event: WeddingEvent;
  stats?: EventStats;
  onView: (eventId: string) => void;
  onEdit: (eventId: string) => void;
  onDelete: (eventId: string) => void;
}

export interface WishCardProps {
  wish: WeddingWish;
}

export interface PhotoCardProps {
  photo: WeddingPhoto;
  onView?: (photo: WeddingPhoto) => void;
}

export interface QRCodeDisplayProps {
  url: string;
  brideName: string;
  groomName: string;
  weddingId: string;
}

// ============================================
// RSVP TYPES
// ============================================

export type RSVPStatus = 'attending' | 'not_attending' | 'maybe';

export interface RSVPSettings {
  id: string;
  eventId: string;
  isEnabled: boolean;
  deadline?: Date;
  maxGuestsPerRsvp: number;
  totalCapacity?: number;
  requirePhone: boolean;
  showGuestCount: boolean;
  customMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RSVPResponse {
  id: string;
  eventId: string;
  guestName: string;
  phoneNumber?: string;
  status: RSVPStatus;
  guestCount: number;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RSVPStats {
  total: number;
  attending: number;
  notAttending: number;
  maybe: number;
  totalGuestCount: number;
}

export interface CreateRSVPInput {
  guestName: string;
  phoneNumber?: string;
  status: RSVPStatus;
  guestCount: number;
  message?: string;
}

export interface UpdateRSVPSettingsInput {
  isEnabled?: boolean;
  deadline?: Date | null;
  maxGuestsPerRsvp?: number;
  totalCapacity?: number | null;
  requirePhone?: boolean;
  showGuestCount?: boolean;
  customMessage?: string;
}

export interface RSVPFormData {
  guestName: string;
  phoneNumber: string;
  status: RSVPStatus;
  guestCount: number;
  message: string;
}

// ============================================
// THEME SYSTEM TYPES
// ============================================

export type TemplateId = 'modern-minimal' | 'malay-songket' | 'floral-romance' | 'islamic-geometric';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface FontSettings {
  heading: string;
  body: string;
}

export interface HeroSettings {
  layout: 'centered' | 'left-aligned' | 'split';
  showCountdown: boolean;
  overlayOpacity: number;
  backgroundImage?: string;
}

export interface SectionVisibility {
  rsvp: boolean;
  timeline: boolean;
  memories: boolean;
  share: boolean;
}

export interface ThemeConfig {
  templateId: TemplateId;
  colors: ColorPalette;
  fonts: FontSettings;
  hero: HeroSettings;
  sections: SectionVisibility;
  sectionOrder: string[];
  customCSS?: string;
}

export interface TemplatePreset {
  id: TemplateId;
  name: string;
  nameMs: string;
  description: string;
  descriptionMs: string;
  thumbnail: string;
  colors: ColorPalette;
  fonts: FontSettings;
  hero: Partial<HeroSettings>;
}

export interface UpdateThemeInput {
  templateId?: TemplateId;
  colors?: Partial<ColorPalette>;
  fonts?: Partial<FontSettings>;
  hero?: Partial<HeroSettings>;
  sections?: Partial<SectionVisibility>;
  sectionOrder?: string[];
  customCSS?: string;
}

