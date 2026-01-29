'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Custom icon components for features
const ClipboardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <path d="m9 14 2 2 4-4"/>
  </svg>
);

const LayersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
  </svg>
);

const CalendarCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
    <path d="m9 16 2 2 4-4"/>
  </svg>
);

const HeadphonesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
  </svg>
);

const icons = [ClipboardIcon, LayersIcon, Users, CalendarCheckIcon, Heart, HeadphonesIcon];

export default function WhyChooseSection() {
  const { t, language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Get features from translations
  const translatedFeatures = [
    {
      title: language === 'bm' ? 'Perancangan Menyeluruh' : 'Comprehensive Planning',
      description: language === 'bm' 
        ? 'Dari konsep hingga pelaksanaan, semuanya diuruskan dengan teliti dan profesional'
        : 'From concept to execution, everything is managed carefully and professionally',
    },
    {
      title: language === 'bm' ? 'Pakej Fleksibel' : 'Flexible Packages',
      description: language === 'bm'
        ? 'Pilihan pakej yang boleh disesuaikan mengikut bajet dan keperluan anda'
        : 'Package options that can be customized according to your budget and needs',
    },
    {
      title: language === 'bm' ? 'Vendor Dipercayai' : 'Trusted Vendors',
      description: language === 'bm'
        ? 'Rangkaian vendor berkualiti yang telah kami kerjasama selama bertahun-tahun'
        : 'Network of quality vendors we have collaborated with for years',
    },
    {
      title: language === 'bm' ? 'Koordinasi Hari Majlis' : 'Event Day Coordination',
      description: language === 'bm'
        ? 'Pasukan profesional memastikan majlis berjalan lancar tanpa sebarang masalah'
        : 'Professional team ensures the event runs smoothly without any issues',
    },
    {
      title: language === 'bm' ? 'Sentuhan Peribadi' : 'Personal Touch',
      description: language === 'bm'
        ? 'Setiap perkahwinan direka khas untuk mencerminkan personaliti pasangan'
        : 'Every wedding is specially designed to reflect the couple\'s personality',
    },
    {
      title: language === 'bm' ? 'Sokongan 24/7' : '24/7 Support',
      description: language === 'bm'
        ? 'Kami sentiasa ada untuk menjawab pertanyaan dan menyelesaikan sebarang isu'
        : 'We are always available to answer questions and resolve any issues',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with wedding image */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white" />
        
        {/* Wedding photo background with transparency */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'url(/weddingpic/weddingpic_1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />
      </div>
      
      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-champagne/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blush/30 rounded-full blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={cardVariants} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-primary-700 text-sm font-medium mb-4 shadow-soft border border-champagne/50">
            {t('whyChoose', 'badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-800 mb-4">
            {t('whyChoose', 'title')}
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            {t('whyChoose', 'subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translatedFeatures.map((feature, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-all duration-500 border border-champagne/30 hover:border-champagne overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-blush/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-champagne rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-xl text-secondary-800 mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-secondary-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-champagne/50 to-blush/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
