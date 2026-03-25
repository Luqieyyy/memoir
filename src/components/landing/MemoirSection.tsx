'use client';

import { motion } from 'framer-motion';
import { QrCode, Heart, Camera, MessageSquare, Image, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MemoirSection() {
  const { language } = useLanguage();

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
      <div className="absolute inset-0 section-darker" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400/20 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-primary-400/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[120px]" />

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
            <Sparkles className="w-4 h-4" />
            {language === 'bm' ? 'Pengalaman Live' : 'Live Experience'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory mb-6">
            {language === 'bm' ? (
              <>Lihat <span className="text-gradient">Memoir</span> Dalam Tindakan</>
            ) : (
              <>See <span className="text-gradient">Memoir</span> In Action</>
            )}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {language === 'bm'
              ? 'Ini apa yang tetamu anda alami apabila mereka imbas kod QR anda'
              : 'This is what your guests experience when they scan your QR code'}
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large card — QR Code Experience */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 glass-card p-8 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/5 to-transparent" />
            <div className="relative">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="font-display font-bold text-2xl text-ivory mb-2">
                    {language === 'bm' ? 'Imbas → Kongsi → Selesai' : 'Scan → Share → Done'}
                  </h3>
                  <p className="text-muted text-sm max-w-md">
                    {language === 'bm'
                      ? 'Tetamu tidak perlu muat turun app. Imbas kod QR dan terus boleh mula mengisi ucapan atau muat naik foto.'
                      : 'Guests don\'t need to download any app. Scan the QR code and start filling wishes or uploading photos right away.'}
                  </p>
                </div>
              </div>

              {/* Visual demo */}
              <div className="grid grid-cols-3 gap-4">
                {/* Step 1: QR */}
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-white rounded-2xl p-5 shadow-lg mx-auto w-fit mb-3"
                  >
                    <QrCode className="w-16 h-16 text-secondary-950" />
                  </motion.div>
                  <p className="text-xs text-muted">{language === 'bm' ? 'Imbas' : 'Scan'}</p>
                </div>

                {/* Step 2: Write */}
                <div className="text-center">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mx-auto w-fit mb-3">
                    <div className="space-y-2">
                      <div className="h-2 w-24 bg-primary-400/30 rounded" />
                      <div className="h-2 w-20 bg-primary-400/20 rounded" />
                      <div className="h-2 w-16 bg-primary-400/10 rounded" />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <MessageSquare className="w-4 h-4 text-primary-400" />
                      <Camera className="w-4 h-4 text-accent-500" />
                    </div>
                  </div>
                  <p className="text-xs text-muted">{language === 'bm' ? 'Tulis / Foto' : 'Write / Photo'}</p>
                </div>

                {/* Step 3: Collected */}
                <div className="text-center">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mx-auto w-fit mb-3">
                    <div className="grid grid-cols-2 gap-1.5 mb-2">
                      <div className="w-10 h-10 bg-primary-400/20 rounded-lg" />
                      <div className="w-10 h-10 bg-accent-500/20 rounded-lg" />
                      <div className="w-10 h-10 bg-mint/20 rounded-lg" />
                      <div className="w-10 h-10 bg-primary-300/20 rounded-lg" />
                    </div>
                    <Heart className="w-4 h-4 text-primary-400 mx-auto" />
                  </div>
                  <p className="text-xs text-muted">{language === 'bm' ? 'Dikumpul' : 'Collected'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column — stacked cards */}
          <div className="space-y-6">
            {/* Stats card */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/5 rounded-full blur-3xl" />
              <div className="relative">
                <h4 className="font-display font-semibold text-ivory mb-4 text-sm uppercase tracking-wider">
                  {language === 'bm' ? 'Pantas & Real-Time' : 'Fast & Real-Time'}
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">{language === 'bm' ? 'Masa muat naik' : 'Upload time'}</span>
                    <span className="text-mint font-semibold text-sm">{'< 3s'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">{language === 'bm' ? 'Tiada app diperlukan' : 'No app needed'}</span>
                    <span className="text-primary-400 font-semibold text-sm">✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-sm">{language === 'bm' ? 'Berfungsi di semua telefon' : 'Works on all phones'}</span>
                    <span className="text-primary-400 font-semibold text-sm">✓</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Gallery preview card */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-400/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="w-4 h-4 text-accent-500" />
                  <h4 className="font-display font-semibold text-ivory text-sm uppercase tracking-wider">
                    {language === 'bm' ? 'Galeri Live' : 'Live Gallery'}
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'from-primary-400/20 to-primary-300/10',
                    'from-accent-500/20 to-accent-400/10',
                    'from-mint/20 to-sage/10',
                    'from-primary-300/20 to-accent-500/10',
                    'from-accent-400/20 to-primary-400/10',
                    'from-mint/20 to-primary-300/10',
                  ].map((gradient, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`aspect-square bg-gradient-to-br ${gradient} rounded-lg border border-white/5`}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-muted mt-3 text-center">
                  {language === 'bm' ? '50+ foto dikumpul secara live' : '50+ photos collected live'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
