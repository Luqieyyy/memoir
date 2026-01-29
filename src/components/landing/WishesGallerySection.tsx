'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Camera, MessageSquare, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data for wishes and photos - will be replaced with Firestore data
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
    message: 'Barakallahu lakuma wa baraka \'alaikuma. Semoga berkekalan 🤍',
    type: 'wish',
  },
  {
    id: 4,
    name: 'Mira & Danish',
    message: 'Selamat menempuh alam perkahwinan. Semoga dipermudahkan segala urusan 💐',
    type: 'wish',
  },
];

// Use actual wedding photos from public folder
const weddingPhotos = [
  { id: 1, src: '/weddingpic/weddingpic_1.jpg', aspectRatio: 'tall' },
  { id: 2, src: '/weddingpic/weddingpic_2.jpg', aspectRatio: 'square' },
  { id: 3, src: '/weddingpic/weddingpic_3.jpg', aspectRatio: 'wide' },
  { id: 4, src: '/weddingpic/weddingpic_4.jpg', aspectRatio: 'square' },
  { id: 5, src: '/weddingpic/weddingpic_5.jpg', aspectRatio: 'tall' },
  { id: 6, src: '/weddingpic/weddingpic_6.jpg', aspectRatio: 'square' },
];

const getAspectClass = (ratio: string) => {
  switch (ratio) {
    case 'tall':
      return 'row-span-2';
    case 'wide':
      return 'col-span-2';
    default:
      return '';
  }
};

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
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-white to-cream" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-blush/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-champagne/40 rounded-full blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-primary-700 text-sm font-medium mb-4 shadow-soft border border-champagne/50">
            <Heart className="w-4 h-4" />
            {language === 'bm' ? 'Kenangan Indah' : 'Beautiful Memories'}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-800 mb-4">
            {language === 'bm' ? 'Ucapan & Momen Istimewa' : 'Wishes & Special Moments'}
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            {language === 'bm'
              ? 'Lihat bagaimana tetamu berkongsi cinta dan kegembiraan mereka'
              : 'See how guests share their love and joy'}
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Wishes Cards */}
          {mockWishes.map((wish, index) => (
            <motion.div
              key={`wish-${wish.id}`}
              variants={itemVariants}
              className={`group bg-white rounded-2xl p-5 shadow-soft hover:shadow-elegant transition-all duration-300 border border-champagne/30 hover:border-primary-300 overflow-hidden ${
                index === 0 ? 'row-span-2' : ''
              }`}
            >
              <div className="h-full flex flex-col">
                <Quote className="w-6 h-6 text-primary-300 mb-3 flex-shrink-0" />
                <p className="text-secondary-700 text-sm leading-relaxed flex-1 overflow-hidden">
                  {wish.message}
                </p>
                <div className="mt-4 pt-3 border-t border-champagne/50 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-200 to-blush rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-xs font-medium text-secondary-600">{wish.name}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Photo Gallery with actual images */}
          {weddingPhotos.map((photo) => (
            <motion.div
              key={`photo-${photo.id}`}
              variants={itemVariants}
              className={`group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 ${getAspectClass(
                photo.aspectRatio
              )}`}
            >
              {/* Actual wedding photo */}
              <Image
                src={photo.src}
                alt={`Wedding photo ${photo.id}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Heart animation on hover */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-4 h-4 text-primary-500 fill-primary-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram-style interaction hints */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-soft border border-champagne/50">
            <div className="flex items-center gap-1 text-primary-600">
              <Heart className="w-5 h-5 fill-current" />
              <span className="text-sm font-medium">128</span>
            </div>
            <div className="w-px h-5 bg-champagne" />
            <div className="flex items-center gap-1 text-secondary-500">
              <Camera className="w-5 h-5" />
              <span className="text-sm font-medium">56</span>
            </div>
            <div className="w-px h-5 bg-champagne" />
            <div className="flex items-center gap-1 text-secondary-500">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium">89</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
