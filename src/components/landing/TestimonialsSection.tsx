'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Camera } from 'lucide-react';

// Custom Star icon for ratings
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
import { useLanguage } from '@/contexts/LanguageContext';

// Mock testimonials - will be replaced with real data
const mockTestimonials = [
  {
    id: 1,
    name: 'Aisyah & Ahmad',
    date: 'Disember 2025',
    message:
      'Terima kasih KR Wedding! Majlis kami berjalan dengan sangat lancar. Semua tetamu memuji dekorasi dan pelayan yang mesra. Memoir pun sangat memudahkan tetamu untuk berkongsi foto.',
    rating: 5,
    imageKey: 'weddingpic_1',
    feedbackKey: 'custfeedback_1',
  },
  {
    id: 2,
    name: 'Nurul & Hafiz',
    date: 'November 2025',
    message:
      'Best sangat! Dari awal sampai habis, semuanya perfect. Kami tak perlu risau apa-apa. Team KR Wedding sangat professional dan friendly.',
    rating: 5,
    imageKey: 'weddingpic_2',
    feedbackKey: 'custfeedback_2',
  },
  {
    id: 3,
    name: 'Sarah & Danish',
    date: 'Oktober 2025',
    message:
      'Wedding planner yang sangat dedikasi! Dekorasi pelamin cantik sangat, lebih dari yang kami bayangkan. Highly recommended!',
    rating: 5,
    imageKey: 'weddingpic_3',
    feedbackKey: 'custfeedback_3',
  },
];

export default function TestimonialsSection() {
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-primary-50/30 to-cream" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-blush/30 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-20 w-64 h-64 bg-champagne/40 rounded-full blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-primary-700 text-sm font-medium mb-4 shadow-soft border border-champagne/50">
            {language === 'bm' ? 'Testimoni Pelanggan' : 'Customer Testimonials'}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-800 mb-4">
            {language === 'bm' ? 'Apa Kata Mereka' : 'What They Say'}
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            {language === 'bm'
              ? 'Dengar pengalaman sebenar daripada pasangan yang telah kami bantu'
              : 'Hear real experiences from couples we have helped'}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 border border-champagne/30 hover:border-primary-200">
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-champagne/50 to-blush/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-primary-400/60 mx-auto mb-2" />
                      <span className="text-xs text-primary-500/60">{testimonial.imageKey}</span>
                    </div>
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 -mt-8 relative">
                  {/* Quote Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-dustyrose rounded-full flex items-center justify-center mb-4 shadow-soft -mt-6">
                    <Quote className="w-5 h-5 text-white" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-secondary-600 text-sm leading-relaxed mb-4 line-clamp-4">
                    "{testimonial.message}"
                  </p>

                  {/* Author */}
                  <div className="pt-4 border-t border-champagne/50">
                    <p className="font-display font-semibold text-secondary-800">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-secondary-400">{testimonial.date}</p>
                  </div>

                  {/* Feedback key indicator */}
                  <div className="absolute bottom-4 right-4">
                    <span className="text-[10px] text-primary-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {testimonial.feedbackKey}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -z-10 -bottom-4 -right-4 w-24 h-24 border-2 border-dashed border-champagne/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>

        {/* Magazine-style decorative element */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-12 bg-champagne" />
            <span className="font-script text-2xl text-primary-500">
              {language === 'bm' ? 'Cerita Cinta Mereka' : 'Their Love Stories'}
            </span>
            <div className="h-px w-12 bg-champagne" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
