'use client';

import { motion } from 'framer-motion';
import { Heart, Camera, MessageSquare, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data for wishes
const mockWishes = [
  {
    id: 1,
    name: 'Aisyah & Farhan',
    message: 'Semoga kekal bahagia hingga ke akhir hayat. Selamat pengantin baru! 💕',
    type: 'wish',
  },
  {
    id: 2,
    name: 'Nurul & Aiman',
    message: 'May your love grow stronger each day. Congratulations! 🌸',
    type: 'wish',
  },
  {
    id: 3,
    name: 'Sarah & Hafiz',
    message: "Barakallahu lakuma wa baraka 'alaikuma. Semoga berkekalan 🤍",
    type: 'wish',
  },
  {
    id: 4,
    name: 'Mira & Danish',
    message: 'Selamat menempuh alam perkahwinan. Semoga dipermudahkan segala urusan 💐',
    type: 'wish',
  },
];

export default function WishesGallerySection() {
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-darker" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-primary-400/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-[100px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-primary-400 text-sm font-medium mb-6 border border-white/10">
            <Heart className="w-4 h-4 fill-current" />
            {language === 'bm' ? 'Preview Ucapan' : 'Wishes Preview'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory mb-6">
            {language === 'bm' ? (
              <>Ucapan & <span className="text-gradient">Momen Istimewa</span></>
            ) : (
              <>Wishes & <span className="text-gradient">Special Moments</span></>
            )}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {language === 'bm'
              ? 'Lihat contoh bagaimana tetamu berkongsi cinta dan kegembiraan mereka melalui Memoir'
              : 'See examples of how guests share their love and joy through Memoir'}
          </p>
        </motion.div>

        {/* Wishes + Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Wishes Cards */}
          {mockWishes.map((wish, index) => (
            <motion.div
              key={`wish-${wish.id}`}
              variants={itemVariants}
              className="group glass-card-hover p-6 overflow-hidden"
            >
              <div className="h-full flex flex-col">
                <Quote className="w-6 h-6 text-primary-400/50 mb-3 flex-shrink-0" />
                <p className="text-ivory/70 text-sm leading-relaxed flex-1 overflow-hidden">
                  {wish.message}
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400/20 to-accent-500/20 rounded-full flex items-center justify-center border border-white/10">
                    <MessageSquare className="w-4 h-4 text-primary-400" />
                  </div>
                  <span className="text-xs font-medium text-muted">{wish.name}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Photo placeholder cards */}
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={`photo-${i}`}
              variants={itemVariants}
              className="group glass-card overflow-hidden aspect-square relative"
            >
              {/* Gradient placeholder */}
              <div className={`absolute inset-0 bg-gradient-to-br ${i === 1 ? 'from-primary-400/15 to-accent-500/10' :
                  i === 2 ? 'from-accent-500/15 to-primary-400/10' :
                    i === 3 ? 'from-mint/15 to-primary-300/10' :
                      'from-primary-300/15 to-accent-400/10'
                }`} />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Camera icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white/20 group-hover:text-white/40 transition-colors" />
              </div>

              {/* Heart on hover */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
                <Heart className="w-4 h-4 text-primary-400 fill-primary-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 glass-card rounded-full">
            <div className="flex items-center gap-2 text-primary-400">
              <Heart className="w-5 h-5 fill-current" />
              <span className="text-sm font-semibold text-ivory">128</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2 text-accent-500">
              <Camera className="w-5 h-5" />
              <span className="text-sm font-semibold text-ivory">56</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2 text-mint">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-semibold text-ivory">89</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
