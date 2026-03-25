'use client';

import { motion } from 'framer-motion';
import { UserPlus, QrCode, Share2, Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    titleBm: 'Cipta Event Anda',
    titleEn: 'Create Your Event',
    descBm: 'Daftar dan cipta event perkahwinan anda. Pilih pelan, tambah butiran, dan personalkan reka bentuk anda.',
    descEn: 'Sign up and create your wedding event. Choose a plan, add details, and personalize your design.',
    color: 'primary-400',
  },
  {
    icon: QrCode,
    number: '02',
    titleBm: 'Dapat Kod QR Unik',
    titleEn: 'Get Your Unique QR Code',
    descBm: 'Sistem akan hasilkan kod QR khas untuk event anda. Cetak dan paparkan di majlis.',
    descEn: 'The system generates a unique QR code for your event. Print and display it at your venue.',
    color: 'accent-500',
  },
  {
    icon: Share2,
    number: '03',
    titleBm: 'Tetamu Imbas & Kongsi',
    titleEn: 'Guests Scan & Share',
    descBm: 'Tetamu imbas kod QR menggunakan telefon. Tiada muat turun app diperlukan — terus boleh berkongsi.',
    descEn: 'Guests scan the QR code with their phone. No app download needed — they can share instantly.',
    color: 'mint',
  },
  {
    icon: Heart,
    number: '04',
    titleBm: 'Kenangan Dikumpul',
    titleEn: 'Memories Collected',
    descBm: 'Semua ucapan, foto, dan momen istimewa dikumpul secara automatik di galeri live anda.',
    descEn: 'All wishes, photos, and special moments are automatically collected in your live gallery.',
    color: 'primary-400',
  },
];

export default function WhyChooseSection() {
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-dark" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-400/3 rounded-full blur-[150px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={cardVariants} className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-accent-500 text-sm font-medium mb-6 border border-white/10">
            {language === 'bm' ? 'Cara Ia Berfungsi' : 'How It Works'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory mb-6">
            {language === 'bm' ? (
              <>Semudah <span className="text-gradient-gold">1, 2, 3</span></>
            ) : (
              <>As Easy as <span className="text-gradient-gold">1, 2, 3</span></>
            )}
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            {language === 'bm'
              ? 'Cipta event, kongsikan QR, dan kumpul kenangan indah — semuanya automatik'
              : 'Create an event, share the QR code, and collect beautiful memories — all automatic'}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative"
            >
              {/* Connection line (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px bg-gradient-to-r from-white/10 via-white/5 to-white/10 z-0">
                  <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-white/10" />
                </div>
              )}

              <div className="glass-card-hover p-8 text-center h-full relative z-10">
                {/* Step number */}
                <span className={`text-6xl font-display font-bold text-${step.color}/10 absolute top-4 right-6`}>
                  {step.number}
                </span>

                {/* Icon */}
                <div className={`w-16 h-16 bg-${step.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-${step.color}/20`}>
                  <step.icon className={`w-8 h-8 text-${step.color}`} />
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-xl text-ivory mb-3">
                  {language === 'bm' ? step.titleBm : step.titleEn}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed">
                  {language === 'bm' ? step.descBm : step.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
