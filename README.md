# Memoir - Wedding Memory Application

A production-ready, self-service, multi-event, QR-based wedding memory web application.

![Memoir Logo](https://via.placeholder.com/200x80?text=Memoir)

## 🌟 Overview

Memoir allows couples to create their wedding events, generate unique QR codes, and collect heartfelt wishes and photos from their guests. It's designed to be a beautiful, emotional experience that captures the magic of wedding celebrations.

### Key Features

- **Self-Service Event Management**: Couples create and manage their own wedding events
- **Automatic QR Code Generation**: One static QR code per event, never expires
- **Guest Submissions**: No login required for guests to share wishes and photos
- **Real-Time Gallery**: Photos and wishes appear instantly
- **Mobile-First Design**: Optimized for QR code scanning on mobile devices
- **Beautiful Wedding Theme**: Elegant, premium UI designed for special occasions

## 📁 Project Structure

```
memoir/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (auth)/              
│   │   │   ├── login/           # Login page
│   │   │   └── register/        # Registration page
│   │   ├── dashboard/           # Protected dashboard routes
│   │   │   ├── events/          # Event management
│   │   │   │   ├── [eventId]/   # Event details
│   │   │   │   └── new/         # Create new event
│   │   │   └── page.tsx         # Dashboard home
│   │   ├── wedding/             # Public wedding pages
│   │   │   └── [weddingId]/     # Guest-facing page
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── ui/                  # Reusable UI components
│   │   ├── events/              # Event-related components
│   │   ├── wedding/             # Guest-facing components
│   │   └── layout/              # Layout components
│   ├── lib/                     # Utilities and services
│   │   ├── firebase/            # Firebase configuration
│   │   ├── hooks/               # Custom React hooks
│   │   └── utils/               # Helper functions
│   ├── types/                   # TypeScript definitions
│   └── contexts/                # React context providers
├── firebase/                    # Firebase configuration
│   ├── firestore.rules         # Firestore security rules
│   ├── storage.rules           # Storage security rules
│   └── firestore.indexes.json  # Firestore indexes
├── public/                      # Static assets
└── package.json
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, Custom wedding theme |
| Backend | Firebase (Firestore, Storage, Authentication) |
| QR Code | qrcode library |
| Image Processing | browser-image-compression |
| Deployment | Vercel (frontend), Firebase (backend) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/memoir.git
   cd memoir
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   
   Create a Firebase project at [Firebase Console](https://console.firebase.google.com/):
   - Enable Authentication (Email/Password)
   - Create Firestore Database
   - Create Storage bucket

4. **Configure environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

5. **Deploy Firebase security rules**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only firestore:rules,storage:rules
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## 📊 Firestore Data Model

### Schema Design

```
users/
└── {userId}
    ├── email: string
    ├── displayName: string
    ├── photoURL?: string
    ├── createdAt: timestamp
    └── updatedAt: timestamp

events/
└── {eventId}
    ├── weddingId: string (unique, 8 chars)
    ├── ownerId: string (user UID)
    ├── brideName: string
    ├── groomName: string
    ├── weddingDate: timestamp
    ├── venue: string
    ├── welcomeMessage?: string
    ├── qrCodeUrl: string
    ├── isActive: boolean
    ├── createdAt: timestamp
    ├── updatedAt: timestamp
    │
    ├── /guests/{guestId}
    │   ├── guestName: string
    │   ├── message?: string
    │   └── createdAt: timestamp
    │
    ├── /wishes/{wishId}
    │   ├── guestName: string
    │   ├── message: string
    │   └── createdAt: timestamp
    │
    └── /photos/{photoId}
        ├── guestName: string
        ├── url: string
        ├── storagePath: string
        ├── fileName: string
        ├── fileSize: number
        ├── mimeType: string
        └── createdAt: timestamp
```

### Relationships

- **User → Events**: One-to-many (each user can create multiple events)
- **Event → Guests/Wishes/Photos**: One-to-many (subcollections)

### Scalability Considerations

1. **Subcollections**: Wishes and photos are stored as subcollections under events for efficient querying
2. **Indexed Queries**: Composite indexes for owner-based event listing
3. **Real-time Listeners**: Optimized for real-time updates without excessive reads
4. **Pagination Ready**: Structure supports pagination for large galleries

## 🔐 Security Rules

### Firestore Rules Summary

| Collection | Read | Create | Update | Delete |
|------------|------|--------|--------|--------|
| users | Owner only | Owner only | Owner only | Owner only |
| events | Owner + Public (if active) | Authenticated | Owner only | Owner only |
| guests | Owner only | Public (if event active) | ❌ | ❌ |
| wishes | Owner + Public | Public (if event active) | ❌ | Owner only |
| photos | Owner + Public | Public (if event active) | ❌ | Owner only |

### Key Security Features

- Event owners can only access their own events
- Guests can submit wishes/photos without authentication
- Guests cannot modify or delete any data
- Cross-event access is prevented
- Data validation enforced at rule level

## 🎨 UI Screens

### Landing Page
- Hero section with product overview
- Feature highlights
- Call-to-action for registration

### Authentication
- Login with email/password
- Registration with validation
- Password reset functionality

### Dashboard
- Overview statistics (events, guests, wishes, photos)
- Event list with quick actions
- Create new event button

### Event Management
- Event details view
- QR code display with download options
- Wishes gallery
- Photo gallery with lightbox
- Delete event confirmation

### Guest Wedding Page
- Beautiful hero with couple names and date
- Welcome message display
- Guest submission form
- Real-time wishes display
- Photo gallery

## 📱 QR Code Strategy

### URL Format
```
https://memoir.app/wedding/{weddingId}
```

### Rules
- Generated automatically when event is created
- Static, never changes
- Never expires
- 8-character alphanumeric unique ID
- High error correction for reliable scanning

### Download Options
- PNG format (for digital use)
- SVG format (for print - high resolution)

## 🚢 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Link your GitHub repository to Vercel

2. **Configure Environment**
   - Add all environment variables from `.env.local`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Firebase Deployment

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules  
firebase deploy --only storage:rules

# Deploy indexes
firebase deploy --only firestore:indexes
```

### Custom Domain

1. Add custom domain in Vercel dashboard
2. Update `NEXT_PUBLIC_APP_URL` environment variable
3. Redeploy to apply changes to QR code URLs

## 🔮 Future Expansion Ideas

1. **Photo Slideshow**: Automated presentation mode for reception
2. **Social Sharing**: Share specific photos to social media
3. **Export**: Download all wishes and photos as PDF/ZIP
4. **Multiple Languages**: i18n support
5. **Custom Themes**: Different color schemes per event
6. **Video Messages**: Support for short video wishes
7. **RSVP Integration**: Track guest RSVPs
8. **Analytics Dashboard**: Engagement metrics
9. **Email Notifications**: New wish/photo alerts
10. **Premium Tiers**: Storage limits, custom domains

## 🐛 Troubleshooting

### Common Issues

**Firebase Auth Errors**
- Ensure Email/Password auth is enabled in Firebase Console
- Check API key restrictions

**Storage Upload Fails**
- Verify Storage rules are deployed
- Check file size limits (15MB max)

**QR Code Not Scanning**
- Ensure sufficient lighting
- Try higher quality download (SVG)

**Real-time Updates Not Working**
- Check Firestore security rules
- Verify Firebase configuration

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

---

Built with ❤️ for wedding celebrations
