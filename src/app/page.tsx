'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import {
  Navbar,
  HeroSection,
  AboutSection,
  WhyChooseSection,
  MemoirSection,
  WishesGallerySection,
  PackagesSection,
  TestimonialsSection,
  CTASection,
  Footer,
  AnimatedStatsBanner,
} from '@/components/landing';

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-secondary-950">
        {/* Navigation */}
        <Navbar />

        {/* Hero — Emotional hook + value prop + app preview */}
        <HeroSection />

        {/* Social Proof Stats */}
        <AnimatedStatsBanner />

        {/* Features — What makes Memoir special */}
        <AboutSection />

        {/* How It Works — 4-step flow */}
        <WhyChooseSection />

        {/* Live Preview — See Memoir in action */}
        <MemoirSection />

        {/* Pricing — 3 tiers */}
        <PackagesSection />

        {/* Testimonials — Social proof */}
        <TestimonialsSection />

        {/* Wishes Gallery Preview */}
        <WishesGallerySection />

        {/* Final CTA — Urgency + emotional hook */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
