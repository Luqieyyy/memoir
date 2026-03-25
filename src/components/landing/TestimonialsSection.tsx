'use client';

import { motion } from 'framer-motion';
import { Quote, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Custom Star icon for ratings
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const testimonials = [
  {
    id: 1,
    name: 'Aisyah & Ahmad',
    date: 'Disember 2025',
    messageBm:
      'Memoir sangat memudahkan tetamu kami untuk berkongsi foto dan ucapan. Semuanya dikumpul di satu tempat yang cantik. Kami sangat suka!',
    messageEn:
      'Memoir made it so easy for our guests to share photos and wishes. Everything collected in one beautiful place. We absolutely loved it!',
    rating: 5,
    initials: 'AA',
  },
  {
    id: 2,
    name: 'Nurul & Hafiz',
    date: 'November 2025',
    messageBm:
      'Best sangat! Tetamu semua excited nak imbas QR code. Galeri foto jadi penuh dengan gambar candid yang kami tak pernah nampak. Berbaloi sangat RM50!',
    messageEn:
      'So amazing! All guests were excited to scan the QR code. The photo gallery was filled with candid shots we never saw. So worth RM50!',
    rating: 5,
    initials: 'NH',
  },
  {
    id: 3,
    name: 'Sarah & Danish',
    date: 'Oktober 2025',
    messageBm:
      'Ucapan digital dari Memoir sangat bermakna. Kami baca semula setiap malam. Lebih bermakna dari kad ucapan biasa. Highly recommended!',
    messageEn:
      'The digital wishes from Memoir are so meaningful. We re-read them every night. More meaningful than ordinary cards. Highly recommended!',
    rating: 5,
    initials: 'SD',
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
      <div className="absolute inset-0 section-darker" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-primary-400/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-[100px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-primary-400 text-sm font-medium mb-6 border border-white/10">
            <Heart className="w-4 h-4 fill-current" />
            {language === 'bm' ? 'Dipercayai Pasangan Malaysia' : 'Trusted by Malaysian Couples'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-ivory mb-6">
            {language === 'bm' ? (
              <>Apa Kata <span className="text-gradient">Mereka</span></>
            ) : (
              <>What <span className="text-gradient">Couples</span> Say</>
            )}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {language === 'bm'
              ? 'Dengar pengalaman sebenar daripada pasangan yang telah menggunakan Memoir'
              : 'Hear real experiences from couples who have used Memoir'}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group"
            >
              <div className="glass-card-hover p-8 h-full flex flex-col">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-500 rounded-xl flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-5 h-5 text-secondary-950" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-accent-500" />
                  ))}
                </div>

                {/* Message */}
                <p className="text-ivory/70 text-sm leading-relaxed mb-6 flex-1">
                  &ldquo;{language === 'bm' ? testimonial.messageBm : testimonial.messageEn}&rdquo;
                </p>

                {/* Author */}
                <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-secondary-950 font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-ivory text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary-400/30" />
            <span className="font-serif italic text-xl text-primary-400/60">
              {language === 'bm' ? 'Di Mana Kenangan Menjadi Hidup' : 'Where Memories Come Alive'}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary-400/30" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
