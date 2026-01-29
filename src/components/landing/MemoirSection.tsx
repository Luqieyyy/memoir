'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { QrCode, MessageSquare, Camera, Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const icons = [QrCode, MessageSquare, Camera, Heart];

export default function MemoirSection() {
  const { language } = useLanguage();

  const features = [
    {
      icon: QrCode,
      title: language === 'bm' ? 'Imbas & Kongsi' : 'Scan & Share',
      description: language === 'bm'
        ? 'Tetamu hanya perlu imbas kod QR untuk mula berkongsi ucapan dan foto'
        : 'Guests simply scan the QR code to start sharing wishes and photos',
    },
    {
      icon: MessageSquare,
      title: language === 'bm' ? 'Ucapan Ikhlas' : 'Heartfelt Wishes',
      description: language === 'bm'
        ? 'Kumpul ucapan dan doa daripada semua tetamu dalam satu platform'
        : 'Collect wishes and prayers from all guests in one platform',
    },
    {
      icon: Camera,
      title: language === 'bm' ? 'Galeri Foto' : 'Photo Gallery',
      description: language === 'bm'
        ? 'Tetamu boleh memuat naik foto dan momen istimewa secara langsung'
        : 'Guests can upload photos and special moments directly',
    },
    {
      icon: Heart,
      title: language === 'bm' ? 'Kenangan Selamanya' : 'Memories Forever',
      description: language === 'bm'
        ? 'Semua kenangan disimpan dengan selamat untuk diingati selamanya'
        : 'All memories are safely stored to be cherished forever',
    },
  ];

  const steps = [
    language === 'bm' ? 'Paparkan kod QR di majlis' : 'Display QR code at the event',
    language === 'bm' ? 'Tetamu imbas dengan telefon' : 'Guests scan with their phone',
    language === 'bm' ? 'Tulis ucapan atau muat naik foto' : 'Write wishes or upload photos',
    language === 'bm' ? 'Kenangan dikumpul secara automatik' : 'Memories collected automatically',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-800 via-secondary-900 to-secondary-950" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-dustyrose/30 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-4 border border-white/20">
            {language === 'bm' ? 'Pengalaman Digital' : 'Digital Experience'}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {language === 'bm' ? 'Memoir — Abadikan Setiap Kenangan' : 'Memoir — Capture Every Memory'}
          </h2>
          <p className="text-lg text-secondary-300 max-w-2xl mx-auto">
            {language === 'bm'
              ? 'Platform kenangan digital yang membolehkan tetamu berkongsi ucapan dan foto melalui satu kod QR'
              : 'A digital memory platform that allows guests to share wishes and photos through a single QR code'}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Features */}
          <motion.div variants={containerVariants} className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary-400/50 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-dustyrose rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - How It Works */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-8">
                <Image
                  src="/memoir.jpg"
                  alt="Memoir"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-primary-400"
                />
                <div>
                  <h3 className="font-display font-semibold text-xl text-white">
                    {language === 'bm' ? 'Cara Ia Berfungsi' : 'How It Works'}
                  </h3>
                  <p className="text-primary-300 text-sm">Memoir</p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-dustyrose rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{step}</p>
                      {index < steps.length - 1 && (
                        <div className="w-0.5 h-6 bg-gradient-to-b from-primary-400/50 to-transparent ml-3 mt-2" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* QR Code Preview */}
              <div className="mt-8 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative bg-white rounded-2xl p-6 shadow-elegant"
                >
                  <QrCode className="w-24 h-24 text-secondary-800" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary-400 to-dustyrose rounded-full flex items-center justify-center">
                    <Heart className="w-3 h-3 text-white fill-white" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
