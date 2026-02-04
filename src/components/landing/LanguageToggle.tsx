'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-champagne/50 hover:bg-white hover:border-champagne transition-all shadow-soft"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageSquare className="w-4 h-4 text-secondary-600" />
      <span className="text-sm font-medium text-secondary-700 uppercase tracking-wide">
        {language === 'bm' ? 'EN' : 'BM'}
      </span>
    </motion.button>
  );
}
