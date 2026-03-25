export type Language = 'bm' | 'en';

export const translations = {
  // Navigation
  nav: {
    home: { bm: 'Utama', en: 'Home' },
    features: { bm: 'Ciri-ciri', en: 'Features' },
    howItWorks: { bm: 'Cara Guna', en: 'How It Works' },
    pricing: { bm: 'Harga', en: 'Pricing' },
    contact: { bm: 'Hubungi', en: 'Contact' },
    // Legacy keys for compatibility
    about: { bm: 'Ciri-ciri', en: 'Features' },
    packages: { bm: 'Harga', en: 'Pricing' },
    gallery: { bm: 'Galeri', en: 'Gallery' },
  },

  // Hero Section
  hero: {
    badge: {
      bm: 'Platform Kenangan Perkahwinan #1 di Malaysia',
      en: '#1 Wedding Memory Platform in Malaysia',
    },
    headline: {
      bm: 'Setiap Tetamu.\nSetiap Ucapan.\nSetiap Foto.\nSatu Tempat Indah.',
      en: 'Every Guest.\nEvery Wish.\nEvery Photo.\nOne Beautiful Place.',
    },
    subheadline: {
      bm: 'Cara moden pasangan Malaysia mengabadikan kenangan perkahwinan — dengan satu kod QR.',
      en: 'The modern way Malaysian couples capture wedding memories — powered by a single QR code.',
    },
    description: {
      bm: 'Hari perkahwinan anda berlalu dalam sekelip mata. Tetapi bagaimana jika setiap senyuman, setiap air mata bahagia, setiap ucapan ikhlas dari tetamu anda diabadikan selama-lamanya?',
      en: 'Your wedding day flies by in a blink. But what if every smile, every tear of joy, every heartfelt wish from your guests was captured forever?',
    },
    cta: {
      bm: 'Cipta Event Anda',
      en: 'Create Your Event',
    },
    ctaSecondary: {
      bm: 'Lihat Cara Ia Berfungsi',
      en: 'See How It Works',
    },
    tagline: {
      bm: 'Di Mana Kenangan Menjadi Hidup',
      en: 'Where Memories Come Alive',
    },
  },

  // About/Features Section — Rebranded for Memoir
  about: {
    badge: { bm: 'Kenapa Memoir?', en: 'Why Memoir?' },
    title: {
      bm: 'Lebih Dari Sekadar Album Foto',
      en: 'More Than Just a Photo Album',
    },
    subtitle: {
      bm: 'Platform Kenangan Digital Premium',
      en: 'Premium Digital Memory Platform',
    },
    description: {
      bm: 'Memoir mengubah cara pasangan Malaysia mengumpul dan menyimpan kenangan perkahwinan. Dengan satu kod QR, tetamu boleh berkongsi ucapan ikhlas, muat naik foto, dan cipta kenangan digital yang cantik — semua secara real-time.',
      en: 'Memoir transforms how Malaysian couples collect and preserve wedding memories. With a single QR code, guests can share heartfelt wishes, upload photos, and create beautiful digital memories — all in real-time.',
    },
    description2: {
      bm: 'Tiada lagi WhatsApp group bersepah. Tiada lagi foto hilang dalam gallery telefon. Semua di satu tempat yang indah.',
      en: 'No more messy WhatsApp groups. No more photos lost in phone galleries. Everything in one beautiful place.',
    },
    stats: {
      events: { bm: 'Majlis Dicipta', en: 'Events Created' },
      experience: { bm: 'Ucapan Dikumpul', en: 'Wishes Collected' },
      clients: { bm: 'Pasangan Gembira', en: 'Happy Couples' },
    },
    followUs: { bm: 'Ikuti Kami', en: 'Follow Us' },
    contactUs: { bm: 'Hubungi Kami', en: 'Contact Us' },
  },

  // Why Choose Section — Rebranded
  whyChoose: {
    badge: { bm: 'Kelebihan Memoir', en: 'Why Choose Memoir' },
    title: {
      bm: 'Kenapa Pasangan Pilih Memoir?',
      en: 'Why Couples Choose Memoir',
    },
    subtitle: {
      bm: 'Pengalaman premium yang direka khas untuk perkahwinan moden',
      en: 'A premium experience designed for modern weddings',
    },
  },

  // Memoir / How It Works Section
  memoir: {
    badge: { bm: 'Cara Ia Berfungsi', en: 'How It Works' },
    title: {
      bm: 'Semudah 1, 2, 3',
      en: 'As Easy as 1, 2, 3',
    },
    subtitle: {
      bm: 'Cipta event, kongsikan QR, dan kumpul kenangan indah — semuanya automatik',
      en: 'Create an event, share the QR code, and collect beautiful memories — all automatic',
    },
    features: [
      {
        title: { bm: 'Imbas & Kongsi', en: 'Scan & Share' },
        description: {
          bm: 'Tetamu hanya perlu imbas kod QR untuk mula berkongsi ucapan dan foto',
          en: 'Guests simply scan the QR code to start sharing wishes and photos',
        },
      },
      {
        title: { bm: 'Ucapan Ikhlas', en: 'Heartfelt Wishes' },
        description: {
          bm: 'Kumpul ucapan dan doa daripada semua tetamu dalam satu platform',
          en: 'Collect wishes and prayers from all guests in one platform',
        },
      },
      {
        title: { bm: 'Galeri Foto Real-Time', en: 'Real-Time Photo Gallery' },
        description: {
          bm: 'Tetamu boleh memuat naik foto dan momen istimewa secara langsung',
          en: 'Guests can upload photos and special moments in real-time',
        },
      },
      {
        title: { bm: 'Kenangan Selamanya', en: 'Memories Forever' },
        description: {
          bm: 'Semua kenangan disimpan dengan selamat untuk diingati selamanya',
          en: 'All memories are safely stored to be cherished forever',
        },
      },
    ],
    howItWorks: {
      title: { bm: 'Cara Ia Berfungsi', en: 'How It Works' },
      steps: [
        { bm: 'Cipta event perkahwinan anda', en: 'Create your wedding event' },
        { bm: 'Dapat kod QR unik', en: 'Get your unique QR code' },
        { bm: 'Tetamu imbas dan kongsi', en: 'Guests scan and share' },
        { bm: 'Kenangan dikumpul secara automatik', en: 'Memories collected automatically' },
      ],
    },
  },

  // Pricing Section — New with actual prices
  packages: {
    badge: { bm: 'Harga & Pelan', en: 'Pricing & Plans' },
    title: {
      bm: 'Pilih Pelan Sempurna Anda',
      en: 'Choose Your Perfect Plan',
    },
    subtitle: {
      bm: 'Pelan untuk setiap pasangan. Tiada caj tersembunyi.',
      en: 'A plan for every couple. No hidden fees.',
    },
    contactForPrice: { bm: 'Hubungi untuk harga', en: 'Contact for price' },
    popular: { bm: 'Paling Popular', en: 'Most Popular' },
    selectPackage: { bm: 'Pilih Pelan Ini', en: 'Choose This Plan' },
    perEvent: { bm: 'per event', en: 'per event' },
    basic: {
      name: { bm: 'Starter', en: 'Starter' },
      description: {
        bm: 'Semua yang anda perlukan untuk mula mengumpul kenangan',
        en: 'Everything you need to start collecting memories',
      },
      features: [
        { bm: 'Cipta 1 event', en: 'Create 1 event' },
        { bm: 'Kod QR unik', en: 'Unique QR code' },
        { bm: 'Ucapan tanpa had', en: 'Unlimited wishes' },
        { bm: 'Muat naik foto (50 foto)', en: 'Photo uploads (50 photos)' },
        { bm: '1 template lalai', en: '1 default template' },
        { bm: 'Aktif 30 hari', en: 'Active for 30 days' },
      ],
    },
    premium: {
      name: { bm: 'Premium', en: 'Premium' },
      description: {
        bm: 'Pengalaman penuh dengan pilihan personalisasi',
        en: 'Full experience with personalization options',
      },
      features: [
        { bm: 'Semua dalam Starter', en: 'Everything in Starter' },
        { bm: 'Pelbagai template reka bentuk', en: 'Multiple design templates' },
        { bm: 'Tukar tema & dekorasi', en: 'Change themes & decorations' },
        { bm: 'Storan foto lebih tinggi (200 foto)', en: 'Higher photo storage (200 photos)' },
        { bm: 'Mod tayangan slaid', en: 'Slideshow mode' },
        { bm: 'Ucapan AI', en: 'AI-powered wishes' },
        { bm: 'Aktif 90 hari', en: 'Active for 90 days' },
      ],
    },
    exclusive: {
      name: { bm: 'Ultimate', en: 'Ultimate' },
      description: {
        bm: 'Pengalaman mewah tanpa kompromi untuk hari istimewa anda',
        en: 'Luxury experience without compromise for your special day',
      },
      features: [
        { bm: 'Semua dalam Premium', en: 'Everything in Premium' },
        { bm: 'Template sepenuhnya tersuai', en: 'Fully custom template' },
        { bm: 'Tema warna tersuai', en: 'Custom color theme' },
        { bm: 'Sokongan keutamaan', en: 'Priority support' },
        { bm: 'Storan tanpa had', en: 'Unlimited storage' },
        { bm: 'Aktif 1 tahun', en: 'Active for 1 year' },
        { bm: 'Domain tersuai (pilihan)', en: 'Custom domain (optional)' },
      ],
    },
  },

  // Gallery/Wishes Section
  gallery: {
    badge: { bm: 'Kenangan Indah', en: 'Beautiful Memories' },
    title: {
      bm: 'Ucapan & Momen Istimewa',
      en: 'Wishes & Special Moments',
    },
    subtitle: {
      bm: 'Lihat bagaimana tetamu berkongsi cinta dan kegembiraan mereka',
      en: 'See how guests share their love and joy',
    },
  },

  // Testimonials Section
  testimonials: {
    badge: { bm: 'Testimoni Pasangan', en: 'Couple Testimonials' },
    title: {
      bm: 'Dipercayai Oleh Pasangan Malaysia',
      en: 'Trusted by Malaysian Couples',
    },
    subtitle: {
      bm: 'Dengar pengalaman sebenar daripada pasangan yang telah menggunakan Memoir',
      en: 'Hear real experiences from couples who have used Memoir',
    },
  },

  // CTA Section
  cta: {
    title: {
      bm: 'Perkahwinan Anda Layak Mendapat Kenangan Yang Indah',
      en: 'Your Wedding Deserves Beautiful Memories',
    },
    subtitle: {
      bm: 'Sertai 500+ pasangan Malaysia yang memilih Memoir. Cipta event pertama anda hari ini.',
      en: 'Join 500+ Malaysian couples who chose Memoir. Create your first event today.',
    },
    whatsapp: {
      bm: 'Hubungi via WhatsApp',
      en: 'Contact via WhatsApp',
    },
    planNow: {
      bm: 'Cipta Event Sekarang',
      en: 'Create Event Now',
    },
  },

  // Footer
  footer: {
    description: {
      bm: 'Platform kenangan perkahwinan digital #1 di Malaysia. Cipta, kongsi, dan abadikan kenangan indah anda.',
      en: 'Malaysia\'s #1 digital wedding memory platform. Create, share, and preserve your beautiful memories.',
    },
    quickLinks: { bm: 'Pautan Pantas', en: 'Quick Links' },
    services: { bm: 'Ciri-ciri', en: 'Features' },
    contact: { bm: 'Hubungi', en: 'Contact' },
    followUs: { bm: 'Ikuti Kami', en: 'Follow Us' },
    qrMemories: { bm: 'Kenangan QR', en: 'QR Memories' },
    photoGallery: { bm: 'Galeri Foto', en: 'Photo Gallery' },
    digitalWishes: { bm: 'Ucapan Digital', en: 'Digital Wishes' },
    aiWishes: { bm: 'Ucapan AI', en: 'AI Wishes' },
    allRightsReserved: { bm: 'Hak Cipta Terpelihara', en: 'All Rights Reserved' },
    madeIn: { bm: 'Dibuat dengan ❤️ di Malaysia', en: 'Made with ❤️ in Malaysia' },
  },

  // Common
  common: {
    learnMore: { bm: 'Ketahui Lebih Lanjut', en: 'Learn More' },
    getStarted: { bm: 'Mulakan', en: 'Get Started' },
    viewAll: { bm: 'Lihat Semua', en: 'View All' },
  },
} as const;

export type TranslationKey = keyof typeof translations;
