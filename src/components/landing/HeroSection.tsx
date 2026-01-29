'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-champagne/30 to-blush/20" />
        
        {/* Animated blobs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary-200/40 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blush/50 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-champagne/40 rounded-full blur-3xl"
        />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 wedding-pattern opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-primary-700 text-sm font-medium mb-6 shadow-soft border border-champagne/50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('hero', 'badge')}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-secondary-800 mb-4 leading-tight"
            >
              {t('hero', 'headline')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl sm:text-3xl font-script text-primary-600 mb-6"
            >
              {t('hero', 'subheadline')}
            </motion.p>

            {/* Collaboration Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <Image
                src="/krwedding.jpg"
                alt="KR Wedding"
                width={40}
                height={40}
                className="rounded-full shadow-soft border-2 border-white"
              />
              <Heart className="w-4 h-4 text-primary-500 fill-primary-500" />
              <Image
                src="/memoir.jpg"
                alt="Memoir"
                width={40}
                height={40}
                className="rounded-full shadow-soft border-2 border-white"
              />
              <span className="text-sm font-medium text-secondary-600 ml-2">
                KR Wedding × Memoir
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-secondary-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {t('hero', 'description')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="https://wa.me/60176457094"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 via-primary-600 to-dustyrose text-white rounded-full font-semibold hover:shadow-elegant transition-all hover:scale-105"
              >
                {t('hero', 'cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-secondary-700 rounded-full font-semibold hover:bg-white transition-all shadow-soft border border-champagne/50 hover:border-champagne"
              >
                {t('hero', 'ctaSecondary')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Decorative Image Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main decorative frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-blush/50 rounded-3xl transform rotate-3 shadow-elegant" />
              <div className="absolute inset-0 bg-gradient-to-tr from-champagne to-primary-50 rounded-3xl transform -rotate-3 shadow-soft" />
              
              {/* Center logo display */}
              <div className="absolute inset-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-elegant flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <Image
                    src="/krwedding.jpg"
                    alt="KR Wedding"
                    width={150}
                    height={150}
                    className="rounded-full shadow-elegant mx-auto mb-6 border-4 border-champagne/50"
                  />
                  <h3 className="font-display font-bold text-2xl text-secondary-800 mb-2">
                    KR Wedding
                  </h3>
                  <p className="text-secondary-500 text-sm font-medium tracking-wider uppercase">
                    & Event Planner
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-primary-600">
                    <Heart className="w-4 h-4 fill-current" />
                    <span className="font-script text-lg">× Memoir</span>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-400 to-dustyrose rounded-full flex items-center justify-center shadow-elegant"
              >
                <Heart className="w-10 h-10 text-white fill-white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-champagne to-primary-200 rounded-full flex items-center justify-center shadow-soft"
              >
                <Sparkles className="w-8 h-8 text-primary-600" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-secondary-300 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-secondary-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
