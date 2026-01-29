'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const navLinks = [
  { href: '#about', key: 'about' },
  { href: '#packages', key: 'packages' },
  { href: '#gallery', key: 'gallery' },
  { href: '#contact', key: 'contact' },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-champagne/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/krwedding.jpg"
              alt="KR Wedding"
              width={50}
              height={50}
              className="rounded-full shadow-soft"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-display font-semibold text-secondary-800">
                KR Wedding
              </span>
              <span className="text-xs text-secondary-500 tracking-wider">
                × Memoir
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-secondary-600 hover:text-secondary-800 font-medium transition-colors relative group"
              >
                {t('nav', link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-dustyrose transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Link
              href="/login"
              className="hidden sm:inline-flex text-secondary-600 hover:text-primary-600 font-medium transition-colors text-sm"
            >
              Memoir Login
            </Link>
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-dustyrose text-white rounded-full font-medium hover:shadow-elegant transition-all hover:scale-105"
            >
              {t('about', 'contactUs')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-secondary-600 hover:text-secondary-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-champagne/30"
          >
            <nav className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-secondary-700 hover:text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  {t('nav', link.key)}
                </Link>
              ))}
              <div className="border-t border-champagne/50 pt-4 mt-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-secondary-600 hover:text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-primary-50 transition-colors text-sm"
                >
                  🔐 Memoir Login
                </Link>
              </div>
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-500 to-dustyrose text-white rounded-full font-medium"
              >
                {t('about', 'contactUs')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
