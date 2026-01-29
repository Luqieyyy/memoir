'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles, Heart } from 'lucide-react';

// Custom Star icon component
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
import { useLanguage } from '@/contexts/LanguageContext';

export default function PackagesSection() {
  const { language } = useLanguage();

  const packages = [
    {
      name: language === 'bm' ? 'Pakej Asas' : 'Basic Package',
      description: language === 'bm'
        ? 'Sempurna untuk majlis intim dan mesra'
        : 'Perfect for intimate and cozy events',
      features: [
        language === 'bm' ? 'Koordinasi hari majlis' : 'Event day coordination',
        language === 'bm' ? 'Dekorasi asas' : 'Basic decoration',
        language === 'bm' ? 'Pelamin standard' : 'Standard dais',
        language === 'bm' ? 'Kad QR Memoir' : 'Memoir QR Card',
        language === 'bm' ? 'Konsultasi 2 sesi' : '2 consultation sessions',
      ],
      popular: false,
      icon: Sparkles,
    },
    {
      name: language === 'bm' ? 'Pakej Premium' : 'Premium Package',
      description: language === 'bm'
        ? 'Pilihan ideal untuk majlis yang lebih meriah'
        : 'Ideal choice for more festive events',
      features: [
        language === 'bm' ? 'Semua dalam Pakej Asas' : 'Everything in Basic Package',
        language === 'bm' ? 'Dekorasi premium' : 'Premium decoration',
        language === 'bm' ? 'Pelamin mewah' : 'Luxury dais',
        language === 'bm' ? 'Fotografi & Videografi' : 'Photography & Videography',
        language === 'bm' ? 'Memoir Premium dengan galeri penuh' : 'Premium Memoir with full gallery',
        language === 'bm' ? 'Doorgift eksklusif' : 'Exclusive doorgift',
      ],
      popular: true,
      icon: StarIcon,
    },
    {
      name: language === 'bm' ? 'Pakej Eksklusif' : 'Exclusive Package',
      description: language === 'bm'
        ? 'Pengalaman perkahwinan mewah tanpa kompromi'
        : 'Luxury wedding experience without compromise',
      features: [
        language === 'bm' ? 'Semua dalam Pakej Premium' : 'Everything in Premium Package',
        language === 'bm' ? 'Perancangan penuh A-Z' : 'Full A-Z planning',
        language === 'bm' ? 'Venue eksklusif' : 'Exclusive venue',
        language === 'bm' ? 'Katering 5 bintang' : '5-star catering',
        language === 'bm' ? 'Memoir VIP dengan ciri khas' : 'VIP Memoir with custom features',
        language === 'bm' ? 'Honeymoon arrangement' : 'Honeymoon arrangement',
        language === 'bm' ? 'Wedding planner dedicated' : 'Dedicated wedding planner',
      ],
      popular: false,
      icon: Sparkles,
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
    <section id="packages" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-champagne/20 to-white" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blush/30 rounded-full blur-3xl" />

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
            {language === 'bm' ? 'Pakej Perkahwinan' : 'Wedding Packages'}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-800 mb-4">
            {language === 'bm' ? 'Pilih Pakej Sempurna Anda' : 'Choose Your Perfect Package'}
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            {language === 'bm'
              ? 'Pakej lengkap yang boleh disesuaikan mengikut keperluan dan impian anda'
              : 'Complete packages that can be customized according to your needs and dreams'}
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative group bg-white rounded-3xl overflow-hidden transition-all duration-500 ${
                pkg.popular
                  ? 'shadow-elegant ring-2 ring-primary-400 scale-[1.02]'
                  : 'shadow-soft hover:shadow-elegant'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-500 to-dustyrose text-white text-center py-2 text-sm font-medium">
                  <StarIcon className="w-4 h-4 inline-block mr-1" />
                  {language === 'bm' ? 'Paling Popular' : 'Most Popular'}
                </div>
              )}

              <div className={`p-8 ${pkg.popular ? 'pt-14' : ''}`}>
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    pkg.popular
                      ? 'bg-gradient-to-br from-primary-400 to-dustyrose'
                      : 'bg-gradient-to-br from-champagne to-primary-100'
                  }`}
                >
                  <pkg.icon className={`w-7 h-7 ${pkg.popular ? 'text-white' : 'text-primary-600'}`} />
                </div>

                {/* Name & Description */}
                <h3 className="font-display font-bold text-2xl text-secondary-800 mb-2">
                  {pkg.name}
                </h3>
                <p className="text-secondary-500 mb-6">{pkg.description}</p>

                {/* Price Placeholder */}
                <div className="mb-6">
                  <span className="text-sm text-secondary-400">
                    {language === 'bm' ? 'Hubungi untuk harga' : 'Contact for price'}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          pkg.popular
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-champagne/50 text-primary-600'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-secondary-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="https://wa.me/60176457094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 rounded-xl text-center font-semibold transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-primary-500 to-dustyrose text-white hover:shadow-elegant hover:scale-[1.02]'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  {language === 'bm' ? 'Pilih Pakej Ini' : 'Select This Package'}
                </Link>
              </div>

              {/* Decorative corner */}
              {pkg.popular && (
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-blush/50 rounded-full" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
