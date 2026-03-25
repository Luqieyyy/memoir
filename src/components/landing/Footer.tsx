'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Social icon components
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: TikTokIcon, href: '#', label: 'TikTok' },
  { icon: TwitterIcon, href: '#', label: 'X' },
];

export default function Footer() {
  const { language } = useLanguage();

  const footerLinks = {
    product: [
      { name: language === 'bm' ? 'Ciri-ciri' : 'Features', href: '#features' },
      { name: language === 'bm' ? 'Harga' : 'Pricing', href: '#pricing' },
      { name: language === 'bm' ? 'Cara Guna' : 'How It Works', href: '#how-it-works' },
      { name: language === 'bm' ? 'Testimoni' : 'Testimonials', href: '#testimonials' },
    ],
    features: [
      { name: language === 'bm' ? 'Kenangan QR' : 'QR Memories' },
      { name: language === 'bm' ? 'Galeri Foto' : 'Photo Gallery' },
      { name: language === 'bm' ? 'Ucapan Digital' : 'Digital Wishes' },
      { name: language === 'bm' ? 'Ucapan AI' : 'AI Wishes' },
    ],
    company: [
      { name: language === 'bm' ? 'Tentang Kami' : 'About Us', href: '#' },
      { name: language === 'bm' ? 'Polisi Privasi' : 'Privacy Policy', href: '#' },
      { name: language === 'bm' ? 'Terma Perkhidmatan' : 'Terms of Service', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-secondary-950 pt-20 pb-8 overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-primary-400/3 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-accent-500/3 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center shadow-glow">
                <Sparkles className="w-5 h-5 text-secondary-950" />
              </div>
              <div>
                <h3 className="font-display font-bold text-ivory text-lg">Memoir</h3>
                <p className="text-[10px] text-primary-400/80 tracking-widest uppercase">Wedding Memories</p>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {language === 'bm'
                ? 'Platform kenangan perkahwinan digital #1 di Malaysia. Cipta, kongsi, dan abadikan kenangan indah anda.'
                : 'Malaysia\'s #1 digital wedding memory platform. Create, share, and preserve your beautiful memories.'}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted hover:bg-primary-400/20 hover:text-primary-400 transition-all duration-300 border border-white/5 hover:border-primary-400/20"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-semibold text-ivory mb-6 text-sm uppercase tracking-wider">
              {language === 'bm' ? 'Produk' : 'Product'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-display font-semibold text-ivory mb-6 text-sm uppercase tracking-wider">
              {language === 'bm' ? 'Ciri-ciri' : 'Features'}
            </h4>
            <ul className="space-y-3">
              {footerLinks.features.map((feature) => (
                <li key={feature.name}>
                  <span className="text-muted text-sm">{feature.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Contact */}
          <div>
            <h4 className="font-display font-semibold text-ivory mb-6 text-sm uppercase tracking-wider">
              {language === 'bm' ? 'Syarikat' : 'Company'}
            </h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted hover:text-primary-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact email */}
            <div className="flex items-center gap-2 text-muted text-sm">
              <Mail className="w-4 h-4 text-primary-400" />
              <span>hello@memoir.my</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-muted text-sm">
            <span>© {new Date().getFullYear()} Memoir.</span>
            <span>{language === 'bm' ? 'Hak Cipta Terpelihara' : 'All Rights Reserved'}.</span>
          </div>

          {/* Made in Malaysia */}
          <div className="flex items-center gap-2 text-muted text-sm">
            <span>{language === 'bm' ? 'Dibuat dengan' : 'Made with'}</span>
            <Heart className="w-3 h-3 text-primary-400 fill-current" />
            <span>{language === 'bm' ? 'di Malaysia' : 'in Malaysia'}</span>
            <span>🇲🇾</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
