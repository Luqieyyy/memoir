'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const navLinks = [
  { href: '#features', key: 'features' },
  { href: '#how-it-works', key: 'howItWorks' },
  { href: '#pricing', key: 'pricing' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-secondary-950/90 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-secondary-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold text-ivory tracking-tight">
                Memoir
              </span>
              <span className="text-[10px] text-primary-400/80 font-medium tracking-widest uppercase">
                Wedding Memories
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-muted hover:text-ivory font-medium transition-colors relative group text-sm"
              >
                {t('nav', link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link
              href="/login"
              className="hidden sm:inline-flex text-muted hover:text-primary-400 font-medium transition-colors text-sm"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-400 to-accent-500 text-secondary-950 rounded-xl font-semibold hover:shadow-glow transition-all hover:scale-[1.02] text-sm"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted hover:text-ivory transition-colors"
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
            className="md:hidden bg-secondary-950/95 backdrop-blur-xl border-b border-white/10"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted hover:text-ivory font-medium py-3 px-4 rounded-xl hover:bg-white/5 transition-all"
                >
                  {t('nav', link.key)}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-4 mt-2 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-muted hover:text-ivory font-medium py-3 px-4 rounded-xl hover:bg-white/5 transition-all text-sm"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-5 py-3 bg-gradient-to-r from-primary-400 to-accent-500 text-secondary-950 rounded-xl font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
