'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, Crown, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PackagesSection() {
  const { language } = useLanguage();

  const packages = [
    {
      name: 'Starter',
      nameBm: 'Starter',
      price: 15,
      description: language === 'bm'
        ? 'Semua yang anda perlukan untuk mula mengumpul kenangan'
        : 'Everything you need to start collecting memories',
      features: [
        { text: language === 'bm' ? 'Cipta 1 event' : 'Create 1 event', included: true },
        { text: language === 'bm' ? 'Kod QR unik' : 'Unique QR code', included: true },
        { text: language === 'bm' ? 'Ucapan tanpa had' : 'Unlimited wishes', included: true },
        { text: language === 'bm' ? 'Muat naik foto (50 foto)' : 'Photo uploads (50 photos)', included: true },
        { text: language === 'bm' ? '1 template lalai' : '1 default template', included: true },
        { text: language === 'bm' ? 'Aktif 30 hari' : 'Active for 30 days', included: true },
        { text: language === 'bm' ? 'Pelbagai template' : 'Multiple templates', included: false },
        { text: language === 'bm' ? 'Mod tayangan slaid' : 'Slideshow mode', included: false },
      ],
      popular: false,
      icon: Zap,
      gradient: 'from-muted to-muted',
      borderColor: 'border-white/10',
      ctaStyle: 'bg-white/10 text-ivory hover:bg-white/20 border border-white/10',
      subtitleBm: 'Sesuai untuk majlis intim',
      subtitleEn: 'Perfect for intimate events',
    },
    {
      name: 'Premium',
      nameBm: 'Premium',
      price: 50,
      description: language === 'bm'
        ? 'Pengalaman penuh dengan pilihan personalisasi'
        : 'Full experience with personalization options',
      features: [
        { text: language === 'bm' ? 'Semua dalam Starter' : 'Everything in Starter', included: true },
        { text: language === 'bm' ? 'Pelbagai template reka bentuk' : 'Multiple design templates', included: true },
        { text: language === 'bm' ? 'Tukar tema & dekorasi' : 'Change themes & decorations', included: true },
        { text: language === 'bm' ? 'Storan foto (200 foto)' : 'Photo storage (200 photos)', included: true },
        { text: language === 'bm' ? 'Mod tayangan slaid' : 'Slideshow mode', included: true },
        { text: language === 'bm' ? 'Ucapan AI pintar' : 'Smart AI wishes', included: true },
        { text: language === 'bm' ? 'Aktif 90 hari' : 'Active for 90 days', included: true },
        { text: language === 'bm' ? 'Domain tersuai' : 'Custom domain', included: false },
      ],
      popular: true,
      icon: Sparkles,
      gradient: 'from-primary-400 to-accent-500',
      borderColor: 'border-primary-400/30',
      ctaStyle: 'bg-gradient-to-r from-primary-400 to-accent-500 text-secondary-950 hover:shadow-glow',
      subtitleBm: 'Pilihan paling popular',
      subtitleEn: 'Most popular choice',
    },
    {
      name: 'Ultimate',
      nameBm: 'Ultimate',
      price: 150,
      description: language === 'bm'
        ? 'Pengalaman mewah tanpa kompromi'
        : 'Luxury experience without compromise',
      features: [
        { text: language === 'bm' ? 'Semua dalam Premium' : 'Everything in Premium', included: true },
        { text: language === 'bm' ? 'Template sepenuhnya tersuai' : 'Fully custom template', included: true },
        { text: language === 'bm' ? 'Tema warna tersuai' : 'Custom color theme', included: true },
        { text: language === 'bm' ? 'Sokongan keutamaan' : 'Priority support', included: true },
        { text: language === 'bm' ? 'Storan tanpa had' : 'Unlimited storage', included: true },
        { text: language === 'bm' ? 'Aktif 1 tahun' : 'Active for 1 year', included: true },
        { text: language === 'bm' ? 'Domain tersuai' : 'Custom domain (optional)', included: true },
        { text: language === 'bm' ? 'Muzik YouTube' : 'YouTube music integration', included: true },
      ],
      popular: false,
      icon: Crown,
      gradient: 'from-accent-500 to-accent-400',
      borderColor: 'border-accent-500/20',
      ctaStyle: 'bg-white/10 text-ivory hover:bg-white/20 border border-accent-500/30',
      subtitleBm: 'Untuk pasangan yang mahu segalanya',
      subtitleEn: 'For couples who want it all',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-dark" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary-400/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[120px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={cardVariants} className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-accent-500 text-sm font-medium mb-6 border border-white/10">
            {language === 'bm' ? 'Harga Mudah & Telus' : 'Simple & Transparent Pricing'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory mb-6">
            {language === 'bm' ? (
              <>Pelan Untuk <span className="text-gradient-gold">Setiap Pasangan</span></>
            ) : (
              <>A Plan For <span className="text-gradient-gold">Every Couple</span></>
            )}
          </h2>
          <p className="text-lg text-muted">
            {language === 'bm'
              ? 'Tiada caj tersembunyi. Bayar sekali, gunakan untuk event anda.'
              : 'No hidden fees. Pay once, use for your event.'}
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative group ${pkg.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-6 py-2 bg-gradient-to-r from-primary-400 to-accent-500 text-secondary-950 text-sm font-bold rounded-full shadow-glow flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {language === 'bm' ? 'Paling Popular' : 'Most Popular'}
                  </div>
                </div>
              )}

              <div className={`glass-card ${pkg.borderColor} overflow-hidden transition-all duration-500 ${pkg.popular
                ? 'ring-1 ring-primary-400/30 shadow-glow'
                : 'hover:border-white/20'
                }`}>
                <div className={`p-8 ${pkg.popular ? 'pt-10' : ''}`}>
                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center shadow-lg`}>
                      <pkg.icon className={`w-6 h-6 ${pkg.popular ? 'text-secondary-950' : 'text-secondary-950'}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-ivory">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-muted">
                        {language === 'bm' ? pkg.subtitleBm : pkg.subtitleEn}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-muted font-medium">RM</span>
                      <span className={`text-5xl font-display font-bold ${pkg.popular ? 'text-gradient' : 'text-ivory'
                        }`}>
                        {pkg.price}
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-1">
                      {language === 'bm' ? 'per event' : 'per event'}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${pkg.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Check className="w-3 h-3 text-secondary-950" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="w-3 h-3 text-muted/30" />
                          </div>
                        )}
                        <span className={`text-sm ${feature.included ? 'text-ivory/80' : 'text-muted/40'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/register"
                    className={`block w-full py-4 rounded-xl text-center font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${pkg.ctaStyle}`}
                  >
                    {language === 'bm' ? 'Pilih Pelan Ini' : 'Choose This Plan'}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust note */}
        <motion.div
          variants={cardVariants}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-muted">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-mint" />
              <span>{language === 'bm' ? 'Pembayaran selamat via Billplz' : 'Secure payment via Billplz'}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-400" />
              <span>{language === 'bm' ? 'Tiada langganan — bayar sekali' : 'No subscription — pay once'}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-500" />
              <span>{language === 'bm' ? 'Sokongan 24/7' : '24/7 support'}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
