'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CTASection() {
  const { language } = useLanguage();

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-800 via-secondary-900 to-secondary-950" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-dustyrose/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/20 rounded-full blur-3xl" />
      </div>
      
      {/* Animated hearts */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-20 text-primary-400/30"
      >
        <Heart className="w-16 h-16 fill-current" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 left-20 text-dustyrose/30"
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
          className="w-20 h-20 bg-gradient-to-br from-primary-400 to-dustyrose rounded-full flex items-center justify-center mx-auto mb-8 shadow-elegant"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
          {language === 'bm'
            ? 'Wujudkan Perkahwinan Impian Anda Tanpa Tekanan'
            : 'Create Your Dream Wedding Without Stress'}
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-secondary-300 mb-10 max-w-2xl mx-auto">
          {language === 'bm'
            ? 'Hubungi kami hari ini dan mulakan perjalanan ke hari bahagia anda'
            : 'Contact us today and start your journey to your happy day'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://wa.me/60176457094"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold hover:shadow-elegant transition-all hover:scale-105"
          >
            <MessageSquare className="w-5 h-5" />
            {language === 'bm' ? 'Hubungi via WhatsApp' : 'Contact via WhatsApp'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#packages"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20 hover:border-white/40"
          >
            {language === 'bm' ? 'Lihat Pakej Kami' : 'View Our Packages'}
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-secondary-400 mb-2">
            {language === 'bm' ? 'Hubungi terus:' : 'Direct contact:'}
          </p>
          <p className="text-white font-medium">
            <span className="text-primary-300">Aisyah</span> — 017-645 7094
          </p>
        </div>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent mt-12 max-w-lg mx-auto"
        />
      </motion.div>
    </section>
  );
}
