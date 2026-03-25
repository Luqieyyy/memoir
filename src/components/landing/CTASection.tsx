'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CTASection() {
  const { language } = useLanguage();

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-dark" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-400/8 rounded-full blur-[150px]" />

      {/* Floating hearts */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-20 text-primary-400/10"
      >
        <Heart className="w-16 h-16 fill-current" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 left-20 text-accent-500/10"
      >
        <Heart className="w-12 h-12 fill-current" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-glow animate-glow-pulse"
        >
          <Sparkles className="w-10 h-10 text-secondary-950" />
        </motion.div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ivory mb-6 leading-tight">
          {language === 'bm'
            ? 'Perkahwinan Anda Layak Mendapat Kenangan Yang Indah'
            : 'Your Wedding Deserves Beautiful Memories'}
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">
          {language === 'bm'
            ? 'Sertai 500+ pasangan Malaysia yang memilih Memoir. Cipta event pertama anda hari ini.'
            : 'Join 500+ Malaysian couples who chose Memoir. Create your first event today.'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-primary-400 to-accent-500 text-secondary-950 rounded-xl font-bold text-lg hover:shadow-glow transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {language === 'bm' ? 'Cipta Event Sekarang' : 'Create Event Now'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/5 backdrop-blur-sm text-ivory rounded-xl font-semibold text-lg border border-white/10 hover:bg-white/10 hover:border-primary-400/30 transition-all"
          >
            {language === 'bm' ? 'Lihat Pelan & Harga' : 'View Plans & Pricing'}
          </Link>
        </div>

        {/* Bottom micro-copy */}
        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted">
          <span>{language === 'bm' ? 'Daftar percuma' : 'Free to sign up'}</span>
          <div className="w-1 h-1 rounded-full bg-muted" />
          <span>{language === 'bm' ? 'Bayar bila dah sedia' : 'Pay when you\'re ready'}</span>
          <div className="w-1 h-1 rounded-full bg-muted" />
          <span>🇲🇾</span>
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-primary-400/20 to-transparent mt-12 max-w-lg mx-auto"
        />
      </motion.div>
    </section>
  );
}
