'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Calendar, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Custom icon components
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const AwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const stats = [
  { icon: Calendar, value: '500+', key: 'events' },
  { icon: AwardIcon, value: '10+', key: 'experience' },
  { icon: Users, value: '1000+', key: 'clients' },
];

const socialLinks = [
  { icon: InstagramIcon, href: 'https://www.instagram.com/krweddingevent/', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/pakejkahwinbatupahat', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: TikTokIcon, href: 'https://www.tiktok.com/@krweddingevent', label: 'TikTok', color: 'hover:bg-black' },
];

export default function AboutSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background with wedding photo */}
      <div className="absolute inset-0 bg-cream" />
      
      {/* Wedding photo background with transparency */}
      <div className="absolute inset-0">
        <Image
          src="/weddingpic/weddingpic_2.jpg"
          alt="Wedding background"
          fill
          className="object-cover object-center opacity-[0.06]"
          priority
        />
        {/* Gradient overlays for better blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/80 via-transparent to-cream/80" />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cream to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-champagne/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blush/20 rounded-full blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-700 text-sm font-medium mb-4">
            {t('about', 'badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-800 mb-4">
            {t('about', 'title')}
          </h2>
          <p className="text-xl text-primary-600 font-script">
            {t('about', 'subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image & Stats */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative">
              {/* Main Image Frame */}
              <div className="relative bg-gradient-to-br from-champagne/50 to-blush/50 rounded-3xl p-4 shadow-elegant">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <Image
                    src="/krwedding.jpg"
                    alt="KR Wedding & Event Planner"
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-6 shadow-elegant border-4 border-champagne/50"
                  />
                  <h3 className="font-display font-bold text-2xl text-secondary-800 mb-2">
                    KR Wedding & Event Planner
                  </h3>
                  <p className="text-secondary-500 mb-6">Batu Pahat, Johor</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat) => (
                      <div key={stat.key} className="text-center">
                        <stat.icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                        <div className="text-2xl font-display font-bold text-secondary-800">
                          {stat.value}
                        </div>
                        <div className="text-xs text-secondary-500">
                          {t('about', 'stats', stat.key)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Links Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -right-4 -bottom-4 bg-white rounded-2xl p-5 shadow-elegant border border-champagne/30"
              >
                <p className="text-sm font-medium text-secondary-600 mb-3">
                  {t('about', 'followUs')}
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 transition-all ${social.color} hover:text-white hover:scale-110`}
                    >
                      <social.icon className="w-5 h-5" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="prose prose-lg">
              <p className="text-secondary-600 leading-relaxed text-lg">
                {t('about', 'description')}
              </p>
              <p className="text-secondary-600 leading-relaxed text-lg">
                {t('about', 'description2')}
              </p>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-primary-50 to-blush/30 rounded-2xl p-6 border border-champagne/50">
              <h4 className="font-display font-semibold text-secondary-800 mb-3 flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-primary-600" />
                {t('about', 'contactUs')}
              </h4>
              <p className="text-secondary-600 mb-4">
                <span className="font-medium">Aisyah</span> — 017-645 7094
              </p>
              <Link
                href="https://wa.me/60176457094"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-medium hover:shadow-elegant transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
