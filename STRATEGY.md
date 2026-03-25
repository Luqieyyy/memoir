# Memoir — Full Product Strategy Document
## Senior Product & Brand Strategy for Premium Malaysian Wedding Tech

---

## 1️⃣ Brand & Theme Direction

### ✅ RECOMMENDED: Theme — "Midnight Bloom" (Selected for Implementation)

**Concept:** Dark luxury meets romantic warmth. Think high-end perfume branding meets modern tech startup. A deep, rich dark mode feel with warm rose-gold and lavender accents that glow like candlelight against a dark canvas.

**Why this works for Gen Z Malaysian couples:**
- Dark mode is the default for Instagram/TikTok users
- Feels premium, exclusive, and "different" from every other wedding site
- Creates contrast that makes photos and content pop
- Signals "tech startup" not "wedding blog"

#### Color Palette

| Token         | Color   | HSL                   | Usage                        |
|---------------|---------|------------------------|------------------------------|
| **Primary**   | `#E8B4B8` | Rose Quartz           | Primary brand, CTAs, accents |
| **Secondary** | `#1A1625` | Deep Plum/Night       | Backgrounds, cards           |
| **Accent**    | `#C9A96E` | Warm Gold             | Premium highlights, badges   |
| **Surface**   | `#241F31` | Elevated dark surface | Cards, modals                |
| **Text**      | `#F5F0EB` | Warm ivory            | Body text on dark            |
| **Muted**     | `#8B8693` | Soft lavender gray    | Secondary text               |
| **Glow**      | `#D4A0A7` | Soft rose glow        | Hover states, glows          |
| **Success**   | `#7DD3A8` | Mint green            | Success states               |
| **Gradient 1**| `#E8B4B8 → #C9A96E` | Rose to Gold | Hero CTAs, premium elements |
| **Gradient 2**| `#1A1625 → #2D1B3D` | Night to Plum | Section backgrounds |
| **Gradient 3**| `#C9A96E → #E8B4B8` | Gold to Rose | Pricing highlights |

#### Typography Pairing
- **Display/Headlines:** `Outfit` (Google Fonts) — Modern, geometric, premium
- **Body:** `Inter` (already installed) — Clean, readable
- **Accent/Script:** `Cormorant Garamond` — Elegant, editorial serif for special moments

#### Button Design Style
- **Primary:** Gradient fill (rose → gold), rounded-xl (12px), subtle glow on hover
- **Secondary:** Glass morphism (bg-white/10 backdrop-blur), border with glow
- **Ghost:** Text only with underline animation on hover

#### Card Design Style
- Glass morphism cards: `bg-white/5 backdrop-blur-xl border border-white/10`
- Subtle gradient border on hover
- Elevated shadow: `0 20px 60px rgba(0,0,0,0.3)`

#### Hero Section Concept
- Full-screen dark gradient background with floating bokeh particles (CSS animated)
- Large, bold headline with gradient text (rose → gold)
- Subtle animated rings/circles in background
- Phone mockup showing the app in action (generated image)
- Glowing CTA button with subtle pulse animation

#### Dashboard Concept
- Dark sidebar with glass morphism
- Cards with subtle borders and glow effects
- Data visualizations with rose/gold accent colors
- Clean, spacious layout with premium spacing

---

### Alternative Theme 2 — "Celestial White"

**Concept:** Ultra-clean white space meets warm gold accents. Think Apple-meets-wedding. Minimal, spacious, with photography-focused design.

| Token         | Color     | Usage                        |
|---------------|-----------|------------------------------|
| **Primary**   | `#B8860B` | Dark Gold                    |
| **Secondary** | `#FAFAFA` | Near-white background        |
| **Accent**    | `#D4AF37` | Soft Gold                    |
| **Surface**   | `#FFFFFF` | Pure white cards             |
| **Text**      | `#1A1A1A` | Near-black body text         |

- Clean, editorial feel
- Heavy use of whitespace
- Photography-first approach
- Risk: Could feel too minimal for Gen Z audience

---

### Alternative Theme 3 — "Velvet Dusk"

**Concept:** Rich jewel tones — deep burgundy, warm amber, champagne. Think luxury hotel lobby or high-end wine branding.

| Token         | Color     | Usage                        |
|---------------|-----------|------------------------------|
| **Primary**   | `#8B2252` | Deep Burgundy                |
| **Secondary** | `#FFF8F0` | Warm cream                   |
| **Accent**    | `#D4A574` | Warm Amber/Champagne         |
| **Surface**   | `#FFFFFF` | White cards                  |
| **Text**      | `#2D1B1B` | Deep warm text               |

- Feels very "luxury wedding" but modern
- Strong contrast and visual impact
- Risk: May skew slightly older than target demographic

---

## 2️⃣ Landing Page Structure (Conversion Optimized)

### New Section Flow (Top → Bottom)

```
1. NAVBAR           — Memoir standalone branding, Login, Get Started CTA
2. HERO             — Emotional hook + value prop + app preview
3. SOCIAL PROOF     — Animated stats banner (events, guests, photos, wishes)
4. HOW IT WORKS     — 3-step visual flow (Create → Share QR → Collect Memories)
5. FEATURES         — What makes Memoir special (real-time, AI wishes, templates)
6. LIVE PREVIEW     — Interactive demo/mockup of the guest experience
7. PRICING          — 3 tiers with psychological pricing
8. TESTIMONIALS     — Social proof from real couples
9. FAQ              — Address objections
10. FINAL CTA       — Urgency + emotional hook
11. FOOTER          — Memoir branding, links, social
```

### Hero Copy Strategy

**Headline (EN):**
> "Every Guest. Every Wish. Every Photo. One Beautiful Place."

**Headline (BM):**
> "Setiap Tetamu. Setiap Ucapan. Setiap Foto. Satu Tempat Indah."

**Subheadline (EN):**
> "The modern way Malaysian couples capture wedding memories — powered by a single QR code."

**Subheadline (BM):**
> "Cara moden pasangan Malaysia mengabadikan kenangan perkahwinan — dengan satu kod QR."

**Emotional Hook:**
> "Your wedding day flies by in a blink. But what if every smile, every tear of joy, every heartfelt wish from your guests was captured forever?"

**CTA Primary:** "Create Your Event — Free Preview"
**CTA Secondary:** "See How It Works"

### Positioning (Standalone — No KR Wedding)
- Memoir is positioned as an independent wedding tech product
- No collaboration language
- Focus on: Digital memories, QR technology, modern Malaysian couples
- Tagline: "Where Memories Come Alive"

---

## 3️⃣ Pricing Psychology Strategy

### Tier Positioning

| Tier | Price | Psychological Role | Label |
|------|-------|-------------------|-------|
| 🥂 **Basic** | RM15 | Foot-in-the-door / anchor | "Starter" |
| 💎 **Premium** | RM50 | **Revenue driver** — "Most Popular" | "Most Popular ★" |
| 👑 **Exclusive** | RM150 | Aspirational anchor / decoy | "Ultimate" |

### Why Premium = "Most Popular"
- RM50 feels like a "treat" not an expense (less than a nice dinner)
- When RM150 exists, RM50 feels like a deal
- RM15 feels "limited" — fear of missing out on better features
- The decoy effect: RM150 makes RM50 look like the smart choice

### Justifying RM150 (Exclusive)
- Frame as "lifetime memories" — "Your wedding only happens once"
- Unlimited storage = "Never worry about losing a single photo"
- Custom domain = "yournames.memoir.my" — extremely shareable and "wow"
- 1-year duration = "Relive your wedding for a whole year"
- Priority support = "We're with you every step of the way"
- Bundled value messaging: "Total value RM300+ for just RM150"

### Avoiding "Cheap Quality" Perception for RM15
- Never position it as "cheap" — call it "Essential" or "Starter"
- Use language: "Everything you need to get started"
- Show clear value: "Still includes unlimited wishes + QR code"
- Add micro-copy: "Perfect for engagement parties and intimate gatherings"
- Use design: Same card quality, just fewer features checked

### Pricing Table UX
- 3 cards side by side
- Premium card elevated (scale 1.05) with glowing border
- "Most Popular" badge with shimmer animation
- Feature comparison with checkmarks and X marks
- Annual/per-event toggle (future consideration)
- "Save RM__" calculation for Premium vs buying features separately

---

## 4️⃣ Payment & SaaS Architecture Strategy

### User Flow
```
1. Browse landing page → Click "Get Started"
2. Register (email + password) — FREE
3. Land on Dashboard (empty state with onboarding)
4. Click "Create Event" → Pricing modal appears
5. Select plan → Redirect to Billplz payment
6. Payment success → Event creation form
7. Event activated → QR code generated
```

### Why Register First, Pay Later
- Lower barrier to entry (free registration)
- Users can explore the dashboard
- Emotional investment before payment
- Can retarget non-paying registered users via email
- Matches SaaS best practices (Notion, Canva, etc.)

### Payment Failure Handling
1. Show clear error with retry button
2. Keep selected plan in session
3. Send follow-up email with payment link
4. Show "Pending" status in dashboard
5. Allow switching to a different plan
6. Auto-expire pending payments after 24 hours

### Feature Locking UX
- Show all features in dashboard, but lock premium ones with:
  - 🔒 Lock icon overlay
  - Blurred preview of premium features
  - "Upgrade to unlock" tooltip on hover
  - Glass card overlay: "Available on Premium plan"
- This creates desire and FOMO

### Upgrade Flow
1. User clicks locked feature → Upgrade modal appears
2. Show current plan vs. target plan comparison
3. Show price difference clearly
4. One-click upgrade → Billplz payment
5. Instant feature activation after payment

### Expired Event Flow
1. 7 days before expiry → Email + in-app notification
2. 3 days before → Urgent notification with countdown
3. On expiry: Event becomes "read-only" (can view but not add)
4. Grace period: 7 days to renew/upgrade
5. After grace: Event archived but data preserved
6. Can reactivate anytime with payment

### Key Database Fields
```
Event {
  id: string
  userId: string
  plan: 'basic' | 'premium' | 'exclusive'
  paymentStatus: 'pending' | 'paid' | 'expired' | 'cancelled'
  paymentId: string (Billplz)
  activatedAt: timestamp
  expiresAt: timestamp
  features: FeatureFlags
}
```

---

## 5️⃣ Micro-Interactions & Animation Strategy

### Animation Style: **"Subtle Luxury"**
- Not playful (not a kids app)
- Not stiff (not a bank)
- Smooth, elegant, intentional — like a luxury brand website
- Think: Apple product pages, Stripe, Linear

### Specific Animations

| Element | Animation | Details |
|---------|-----------|---------|
| **Page transitions** | Fade + slight slide up | 400ms ease-out |
| **Card hover** | Subtle lift + glow border | Scale 1.02, shadow increase |
| **Button hover** | Gradient shift + glow | Background position animation |
| **Scroll reveal** | Fade in + slide from bottom | Staggered, 200ms delay between items |
| **QR scan landing** | Confetti burst + logo reveal | When guest scans, brief celebration |
| **Guest upload success** | Checkmark morph + ripple | Satisfying completion feedback |
| **Payment success** | Confetti + "Welcome" animation | Celebratory, emotional |
| **Counter stats** | Count-up with spring easing | Numbers roll up when in viewport |
| **Navigation** | Underline slide-in on hover | 300ms ease |
| **Pricing cards** | Card tilt on hover (3D) | Subtle perspective transform |
| **Loading states** | Skeleton with shimmer | Rose-gold gradient shimmer |

### Premium Touches
- Bokeh/particle background on hero (CSS only, no canvas)
- Subtle parallax on scroll
- Smooth color transitions between sections
- Cursor glow effect on premium sections
- Stagger animations on list items

---

## 6️⃣ Perceived Value & Premium Positioning

### Copywriting Tone
- **Not formal, not casual — "confident intimate"**
- Like a trusted friend who also happens to be a tech entrepreneur
- Use "you/your" frequently
- Short paragraphs, punchy headlines
- Sprinkle Malay words naturally (feels authentic)

### Emotional Storytelling Framework
1. **Pain:** "Your wedding day flies by. Guests take photos on their phones. Wishes get lost in WhatsApp groups."
2. **Dream:** "But what if every moment was captured? Every wish preserved? Every photo collected in one beautiful place?"
3. **Solution:** "Memoir makes it happen — with just one QR code."
4. **Proof:** "Join 500+ Malaysian couples who chose Memoir."
5. **Urgency:** "Start creating your event today."

### Social Proof Strategy
- Counter stats (events created, photos shared, wishes collected)
- Real couple testimonials with photos
- "As seen on" badge area (add later when applicable)
- Live activity feed: "Sarah & Ahmad just created their event" (real-time)
- Star ratings from couples

### Scarcity Triggers
- "Limited template designs for Basic plan"
- "Custom domains available while supplies last" (for Exclusive)
- "Early bird pricing" — mention that prices may increase
- Show number of events created this month (social proof + urgency)

### Visual Hierarchy Tricks
- Use size contrast: Hero headline should be 4x-6x larger than body text
- Color contrast: CTAs in bright gradient, everything else subdued
- Whitespace: Generous spacing signals luxury
- Z-pattern reading flow for key sections
- F-pattern for feature lists and pricing

### Why Memoir > Google Drive
- **Google Drive:** Generic, ugly, no organization, no QR code, no themes, feels like schoolwork
- **Memoir:** Beautiful, organized, branded, shareable, themed, feels like a luxury experience
- Frame this as: "Your wedding deserves better than a shared folder"

---

## 7️⃣ Making It Feel Like a Funded Startup

### Brand Signals
- Clean, consistent typography (no more than 2 fonts)
- Cohesive color system (no random colors)
- Professional micro-copy (loading states, error messages, empty states)
- Responsive design that works perfectly on mobile
- Fast page loads (Next.js optimized)
- Professional domain and metadata

### Product Signals
- Onboarding flow (not just a form dump)
- Feature flags based on plan
- Activity dashboard with analytics
- Email notifications (coming soon)
- Support/help section
- Terms of service and privacy policy links

### Design Signals
- Consistent spacing system (8px grid)
- Icon consistency (all Lucide icons, same weight)
- Professional illustrations/mockups
- Subtle animations everywhere (not just the homepage)
- Dark mode as default (signals modern tech)
- Glass morphism and gradient usage (current design trends)

### Trust Signals for Landing Page
- "Trusted by 500+ Malaysian couples"
- "Secure payment via Billplz"
- "Your data is encrypted and protected"
- "Made in Malaysia 🇲🇾"
- Clear pricing (no hidden fees)
- Money-back guarantee consideration
- Contact information visible

---

## 📋 Implementation Priority

### Phase 1 (NOW — Landing Page Redesign)
1. ✅ New color system (Midnight Bloom)
2. ✅ Remove KR Wedding collaboration
3. ✅ New hero section with app preview
4. ✅ How it works section
5. ✅ New pricing section with RM pricing
6. ✅ Updated footer as Memoir standalone
7. ✅ All micro-animations

### Phase 2 (Next Sprint — Payment)
1. Billplz integration
2. Payment flow UI
3. Plan selection modal
4. Feature locking system
5. Event activation flow

### Phase 3 (Following Sprint — Polish)
1. Email notifications
2. Analytics dashboard
3. Custom templates per plan
4. Custom domain support (Exclusive)
5. Slideshow mode (Premium+)

---

*Document prepared for Memoir — Malaysian Wedding Tech Startup*
*Strategy aligns with Gen Z/millennial Malaysian market targeting couples aged 23-32*
