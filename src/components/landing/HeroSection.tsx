'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, QrCode, MessageSquare, Camera, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Floating bokeh particle component
const BokehParticle = ({ delay, size, x, y, color }: { delay: number; size: number; x: string; y: string; color: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 0.4, 0.2, 0.4, 0], scale: [0.8, 1, 0.9, 1, 0.8] }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }}
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: color,
      filter: 'blur(1px)',
    }}
  />
);

export default function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Ambient glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-500/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/5 rounded-full blur-[150px]" />
      </div>

      {/* Bokeh particles */}
      <div className="absolute inset-0 overflow-hidden">
        <BokehParticle delay={0} size={6} x="15%" y="20%" color="rgba(232,180,184,0.5)" />
        <BokehParticle delay={1} size={4} x="80%" y="15%" color="rgba(201,169,110,0.4)" />
        <BokehParticle delay={2} size={8} x="60%" y="70%" color="rgba(232,180,184,0.3)" />
        <BokehParticle delay={3} size={5} x="25%" y="80%" color="rgba(201,169,110,0.3)" />
        <BokehParticle delay={1.5} size={3} x="90%" y="50%" color="rgba(232,180,184,0.4)" />
        <BokehParticle delay={0.5} size={7} x="45%" y="30%" color="rgba(201,169,110,0.25)" />
        <BokehParticle delay={2.5} size={4} x="70%" y="85%" color="rgba(232,180,184,0.35)" />
        <BokehParticle delay={3.5} size={6} x="10%" y="55%" color="rgba(201,169,110,0.3)" />
      </div>

      {/* Decorative rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/[0.02] rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-primary-400 text-sm font-medium mb-6 border border-white/10"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('hero', 'badge')}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-ivory mb-6 leading-[1.1] tracking-tight"
            >
              {language === 'bm' ? (
                <>
                  Setiap Tetamu.{' '}
                  <span className="text-gradient">Setiap Ucapan.</span>
                  <br />
                  Setiap Foto.
                  <br />
                  <span className="text-gradient-gold">Satu Tempat Indah.</span>
                </>
              ) : (
                <>
                  Every Guest.{' '}
                  <span className="text-gradient">Every Wish.</span>
                  <br />
                  Every Photo.
                  <br />
                  <span className="text-gradient-gold">One Beautiful Place.</span>
                </>
              )}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl text-muted mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {t('hero', 'subheadline')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-400 to-accent-500 text-secondary-950 rounded-xl font-semibold hover:shadow-glow transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {t('hero', 'cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-ivory rounded-xl font-semibold border border-white/10 hover:bg-white/10 hover:border-primary-400/30 transition-all"
              >
                {t('hero', 'ctaSecondary')}
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-muted text-sm">
                <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                <span>{language === 'bm' ? '500+ pasangan' : '500+ couples'}</span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2 text-muted text-sm">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                <span>{language === 'bm' ? 'Selamat & terjamin' : 'Secure & trusted'}</span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-1 text-muted text-sm">
                <span>🇲🇾</span>
                <span>Made in Malaysia</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content — App Preview / Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="relative hidden lg:flex justify-center items-center"
          >
            {/* Glow behind the mockup */}
            <div className="absolute w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-[100px]" />

            {/* Phone mockup frame */}
            <div className="relative w-[300px]">
              {/* Phone shell */}
              <div className="relative bg-secondary-900 rounded-[2.5rem] p-3 shadow-luxury border border-white/10">
                {/* Screen */}
                <div className="bg-secondary-950 rounded-[2rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                    <span className="text-[10px] text-muted">9:41</span>
                    <div className="w-20 h-5 bg-secondary-900 rounded-full" />
                    <div className="flex gap-1">
                      <div className="w-3 h-2 bg-muted/50 rounded-sm" />
                      <div className="w-3 h-2 bg-muted/50 rounded-sm" />
                    </div>
                  </div>

                  {/* App content */}
                  <div className="px-5 pb-6">
                    {/* App header */}
                    <div className="text-center py-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center mx-auto mb-3 shadow-glow">
                        <Heart className="w-6 h-6 text-secondary-950 fill-secondary-950" />
                      </div>
                      <h3 className="font-display font-bold text-ivory text-base">
                        Sarah & Ahmad
                      </h3>
                      <p className="text-primary-400 text-xs mt-1 font-serif italic">
                        15 Mac 2026
                      </p>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { icon: MessageSquare, label: language === 'bm' ? 'Ucapan' : 'Wishes' },
                        { icon: Camera, label: language === 'bm' ? 'Foto' : 'Photos' },
                        { icon: QrCode, label: 'QR Code' },
                      ].map((action, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 + i * 0.15 }}
                          className="bg-white/5 rounded-xl p-3 text-center border border-white/5"
                        >
                          <action.icon className="w-5 h-5 text-primary-400 mx-auto mb-1.5" />
                          <span className="text-[10px] text-muted">{action.label}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Recent wishes preview */}
                    <div className="space-y-2">
                      {[
                        { name: 'Nurul Aisyah', msg: 'Selamat pengantin baru! 💕' },
                        { name: 'Hafiz Rahman', msg: 'Barakallahu lakuma 🤍' },
                      ].map((wish, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.5 + i * 0.2 }}
                          className="bg-white/5 rounded-xl p-3 border border-white/5"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-400 to-accent-500" />
                            <span className="text-[11px] font-semibold text-ivory">{wish.name}</span>
                          </div>
                          <p className="text-[10px] text-muted leading-relaxed">{wish.msg}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Photo grid preview */}
                    <div className="grid grid-cols-3 gap-1.5 mt-3">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 2 + i * 0.1 }}
                          className="aspect-square bg-gradient-to-br from-primary-400/20 to-accent-500/10 rounded-lg border border-white/5"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
                className="absolute -top-4 -right-8 bg-secondary-900 rounded-2xl p-3 shadow-luxury border border-white/10 max-w-[180px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-mint/20 flex items-center justify-center flex-shrink-0">
                    <Camera className="w-4 h-4 text-mint" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-ivory">{language === 'bm' ? 'Foto baru!' : 'New photo!'}</p>
                    <p className="text-[9px] text-muted">{language === 'bm' ? 'Mira baru muat naik' : 'Mira just uploaded'}</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 2.2, type: 'spring', stiffness: 200 }}
                className="absolute bottom-20 -left-12 bg-secondary-900 rounded-2xl p-3 shadow-luxury border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-400/20 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-primary-400 fill-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ivory">128</p>
                    <p className="text-[9px] text-muted">{language === 'bm' ? 'ucapan' : 'wishes'}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-primary-400/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
