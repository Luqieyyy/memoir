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
} from '@/components/landing';

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-cream">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* About KR Wedding */}
        <AboutSection />

        {/* Why Choose KR Wedding */}
        <WhyChooseSection />

        {/* Memoir Digital Experience */}
        <MemoirSection />

        {/* Wishes & Photo Gallery */}
        <WishesGallerySection />

        {/* Wedding Packages */}
        <PackagesSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Final CTA */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
