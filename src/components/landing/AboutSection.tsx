'use client';

import { motion } from 'framer-motion';
import { QrCode, MessageSquare, Camera, Heart, Palette, Shield, Zap, Smartphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const features = [
  {
    icon: QrCode,
    titleBm: 'Satu Kod QR, Seribu Kenangan',
    titleEn: 'One QR Code, A Thousand Memories',
    descBm: 'Hasilkan kod QR unik untuk event anda. Tetamu hanya perlu imbas — tiada app diperlukan.',
    descEn: 'Generate a unique QR code for your event. Guests just scan — no app needed.',
    gradient: 'from-primary-400 to-primary-300',
  },
  {
    icon: MessageSquare,
    titleBm: 'Ucapan Digital Ikhlas',
    titleEn: 'Heartfelt Digital Wishes',
    descBm: 'Tetamu tulis ucapan dan doa secara digital. Lebih bermakna daripada kad biasa.',
    descEn: 'Guests write wishes and prayers digitally. More meaningful than ordinary cards.',
    gradient: 'from-accent-500 to-accent-400',
  },
  {
    icon: Camera,
    titleBm: 'Galeri Foto Real-Time',
    titleEn: 'Real-Time Photo Gallery',
    descBm: 'Foto tetamu dimuatnaik terus ke galeri live. Tiada lagi foto hilang di telefon.',
    descEn: 'Guest photos upload straight to a live gallery. No more photos lost on phones.',
    gradient: 'from-mint to-sage',
  },
  {
    icon: Palette,
    titleBm: 'Tema & Template Cantik',
    titleEn: 'Beautiful Themes & Templates',
    descBm: 'Pilih daripada pelbagai reka bentuk premium yang sesuai dengan tema perkahwinan anda.',
    descEn: 'Choose from premium designs that match your wedding theme.',
    gradient: 'from-primary-300 to-accent-500',
  },
  {
    icon: Zap,
    titleBm: 'Ucapan AI Pintar',
    titleEn: 'Smart AI Wishes',
    descBm: 'Tetamu yang malu menulis boleh guna AI untuk jana ucapan yang ikhlas dan peribadi.',
    descEn: 'Shy guests can use AI to generate heartfelt, personalized wishes.',
    gradient: 'from-accent-400 to-primary-400',
  },
  {
    icon: Shield,
    titleBm: 'Selamat & Peribadi',
    titleEn: 'Secure & Private',
    descBm: 'Data anda dienkripsi. Hanya anda dan tetamu yang dijemput boleh akses event.',
    descEn: 'Your data is encrypted. Only you and invited guests can access the event.',
    gradient: 'from-mint to-primary-300',
  },
];

export default function AboutSection() {
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-darker" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-primary-400/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-40 -right-20 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[120px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-primary-400 text-sm font-medium mb-6 border border-white/10">
            {language === 'bm' ? 'Kenapa Memoir?' : 'Why Memoir?'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory mb-6">
            {language === 'bm' ? (
              <>Lebih Dari Sekadar <span className="text-gradient">Album Foto</span></>
            ) : (
              <>More Than Just a <span className="text-gradient">Photo Album</span></>
            )}
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            {language === 'bm'
              ? 'Memoir menggabungkan teknologi moden dengan emosi perkahwinan. Satu platform untuk semua kenangan istimewa anda.'
              : 'Memoir combines modern technology with wedding emotions. One platform for all your special memories.'}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative glass-card-hover p-8 overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-secondary-950" />
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-xl text-ivory mb-3">
                  {language === 'bm' ? feature.titleBm : feature.titleEn}
                </h3>

                {/* Description */}
                <p className="text-muted leading-relaxed text-sm">
                  {language === 'bm' ? feature.descBm : feature.descEn}
                </p>
              </div>

              {/* Decorative corner glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary-400/10 to-accent-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            </motion.div>
          ))}
        </div>

        {/* Bottom comparison callout */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 glass-card rounded-full">
            <Smartphone className="w-5 h-5 text-primary-400" />
            <p className="text-sm text-muted">
              {language === 'bm'
                ? 'Perkahwinan anda layak lebih daripada Google Drive atau WhatsApp group biasa'
                : 'Your wedding deserves more than Google Drive or a basic WhatsApp group'}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
