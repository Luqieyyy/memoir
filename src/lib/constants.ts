// Application Constants

export const APP_NAME = 'Memoir';
export const APP_TAGLINE = 'Capture Your Wedding Memories';
export const APP_DESCRIPTION =
  'A beautiful wedding memory app where guests can share wishes, photos, and memories with the happy couple via QR code.';

// Image constraints
export const IMAGE_CONFIG = {
  maxFileSizeMB: 10,
  maxCompressedSizeMB: 2,
  maxWidthOrHeight: 1920,
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'],
  acceptedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'],
} as const;

// QR Code settings
export const QR_CODE_CONFIG = {
  defaultSize: 300,
  downloadSizes: {
    small: 256,
    medium: 512,
    large: 1024,
    xlarge: 2048,
  },
  errorCorrectionLevel: 'M' as const,
} as const;

// Validation limits
export const VALIDATION_LIMITS = {
  eventTitle: {
    min: 1,
    max: 100,
  },
  brideGroomName: {
    min: 1,
    max: 50,
  },
  guestName: {
    min: 1,
    max: 100,
  },
  wishMessage: {
    min: 1,
    max: 2000,
  },
  venue: {
    max: 200,
  },
  photosPerUpload: 10,
  photosPerEvent: 1000,
  wishesPerGuest: 5, // reasonable limit per guest/IP
} as const;

// Date formatting options
export const DATE_FORMATS = {
  display: {
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
  },
  short: {
    year: 'numeric' as const,
    month: 'short' as const,
    day: 'numeric' as const,
  },
  input: 'yyyy-MM-dd',
} as const;

// Color theme values (matching Tailwind config)
export const COLORS = {
  primary: {
    50: '#fdf6f4',
    100: '#fceae4',
    200: '#f9d5c9',
    300: '#f3b5a2',
    400: '#e99070',
    500: '#d4856a',
    600: '#bb6a4f',
    700: '#9c5540',
    800: '#824839',
    900: '#6d3e33',
  },
  blush: '#fce4ec',
  champagne: '#f7e7ce',
  sage: '#9caf88',
  dustyrose: '#d4a5a5',
  cream: '#fdfcfa',
} as const;

// Animation durations (in ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Firebase collection names
export const COLLECTIONS = {
  users: 'users',
  events: 'events',
  wishes: 'wishes',
  photos: 'photos',
  guests: 'guests',
} as const;

// Storage paths
export const STORAGE_PATHS = {
  photos: 'photos',
  userAvatars: 'avatars',
  eventCovers: 'covers',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  invalidCredentials: 'Invalid email or password.',
  emailInUse: 'This email is already in use.',
  weakPassword: 'Password should be at least 6 characters.',
  invalidEmail: 'Please enter a valid email address.',
  eventNotFound: 'Event not found or has been deleted.',
  eventInactive: 'This event is no longer active.',
  uploadFailed: 'Failed to upload file. Please try again.',
  fileTooLarge: 'File is too large. Maximum size is 10MB.',
  invalidFileType: 'Invalid file type. Please upload an image.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  wishSubmitted: 'Your wish has been submitted! Thank you! 💕',
  photosUploaded: 'Photos uploaded successfully! 📸',
  eventCreated: 'Event created successfully!',
  eventUpdated: 'Event updated successfully!',
  eventDeleted: 'Event deleted successfully.',
  passwordReset: 'Password reset email sent. Check your inbox.',
  profileUpdated: 'Profile updated successfully!',
} as const;

// Feature flags (for future use)
export const FEATURES = {
  enableVideoMessages: false,
  enableRSVP: false,
  enableAnalytics: false,
  enableExport: false,
  maxEventsPerUser: 10,
} as const;
