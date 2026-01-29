'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Custom icon components
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

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const socialLinks = [
  {
    icon: InstagramIcon,
    href: 'https://www.instagram.com/krweddingevent/',
    label: 'Instagram',
  },
  {
    icon: FacebookIcon,
    href: 'https://www.facebook.com/pakejkahwinbatupahat',
    label: 'Facebook',
  },
  {
    icon: TikTokIcon,
    href: 'https://www.tiktok.com/@krweddingevent',
    label: 'TikTok',
  },
];

export default function Footer() {
  const { language } = useLanguage();

  const footerLinks = {
    quickLinks: [
      { name: language === 'bm' ? 'Utama' : 'Home', href: '#' },
      { name: language === 'bm' ? 'Tentang Kami' : 'About Us', href: '#about' },
      { name: language === 'bm' ? 'Pakej' : 'Packages', href: '#packages' },
      { name: language === 'bm' ? 'Galeri' : 'Gallery', href: '#gallery' },
    ],
    services: [
      { name: language === 'bm' ? 'Perancangan Perkahwinan' : 'Wedding Planning' },
      { name: language === 'bm' ? 'Koordinasi Majlis' : 'Event Coordination' },
      { name: language === 'bm' ? 'Dekorasi & Pelamin' : 'Decoration & Dais' },
      { name: language === 'bm' ? 'Kenangan Digital' : 'Digital Memories' },
    ],
  };

  return (
    <footer className="relative bg-secondary-900 pt-20 pb-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-dustyrose/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/krwedding.jpg"
                alt="KR Wedding"
                width={48}
                height={48}
                className="rounded-full border-2 border-champagne/50"
              />
              <div>
                <h3 className="font-display font-bold text-white text-lg">KR Wedding</h3>
                <p className="text-primary-300 text-xs">× Memoir</p>
              </div>
            </div>
            <p className="text-secondary-400 text-sm leading-relaxed mb-6">
              {language === 'bm'
                ? 'Perancang perkahwinan profesional yang mengubah impian anda menjadi kenyataan'
                : 'Professional wedding planner that turns your dreams into reality'}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-secondary-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">
              {language === 'bm' ? 'Pautan Pantas' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-300 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">
              {language === 'bm' ? 'Perkhidmatan' : 'Services'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((service) => (
                <li key={service.name}>
                  <span className="text-secondary-400 text-sm">{service.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">
              {language === 'bm' ? 'Hubungi' : 'Contact'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <PhoneIcon className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">Aisyah</p>
                  <p className="text-secondary-400 text-sm">017-645 7094</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <p className="text-secondary-400 text-sm">Batu Pahat, Johor</p>
              </li>
              <li>
                <Link
                  href="https://wa.me/60176457094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-full hover:bg-green-700 transition-colors mt-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-secondary-400 text-sm">
            <span>© {new Date().getFullYear()} KR Wedding & Event Planner.</span>
            <span>{language === 'bm' ? 'Hak Cipta Terpelihara' : 'All Rights Reserved'}.</span>
          </div>

          {/* Powered by */}
          <div className="flex items-center gap-2 text-secondary-400 text-sm">
            <span>{language === 'bm' ? 'Dikuasakan oleh' : 'Powered by'}</span>
            <div className="flex items-center gap-1">
              <Image
                src="/memoir.jpg"
                alt="Memoir"
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-primary-300 font-medium">Memoir</span>
            </div>
            <Heart className="w-3 h-3 text-primary-400 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
}
