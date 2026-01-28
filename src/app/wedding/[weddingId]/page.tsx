'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePublicEvent, useWishes, usePhotos } from '@/lib/hooks';
import { WeddingHero, GuestSubmissionForm, WishDisplay, PhotoGallery } from '@/components/wedding';
import { Spinner, Card, EmptyState } from '@/components/ui';
import { Heart, MessageSquare, Image, ChevronDown } from 'lucide-react';

type SectionType = 'wishes' | 'photos' | 'share';

export default function WeddingPage() {
  const params = useParams();
  const weddingId = params.weddingId as string;
  
  const { event, loading, error } = usePublicEvent(weddingId);
  const { wishes, loading: wishesLoading } = useWishes(event?.id || null);
  const { photos, loading: photosLoading } = usePhotos(event?.id || null);

  const [activeSection, setActiveSection] = useState<SectionType>('share');
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll to content section
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-secondary-500">Loading wedding details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream p-4">
        <Card className="max-w-md w-full text-center" padding="lg">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-secondary-400" />
          </div>
          <h1 className="text-xl font-display font-semibold text-secondary-800 mb-2">
            Wedding Not Found
          </h1>
          <p className="text-secondary-500">
            {error || "We couldn't find this wedding. Please check the QR code and try again."}
          </p>
        </Card>
      </div>
    );
  }

  const sections: { key: SectionType; label: string; icon: React.ReactNode }[] = [
    { key: 'share', label: 'Share Memories', icon: <Heart className="w-4 h-4" /> },
    { key: 'wishes', label: 'Wishes', icon: <MessageSquare className="w-4 h-4" /> },
    { key: 'photos', label: 'Gallery', icon: <Image className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <WeddingHero event={event} />

      {/* Scroll Indicator */}
      <div className="flex justify-center -mt-8 relative z-10">
        <button
          onClick={scrollToContent}
          className="w-12 h-12 bg-white rounded-full shadow-elegant flex items-center justify-center animate-bounce hover:scale-110 transition-transform"
        >
          <ChevronDown className="w-6 h-6 text-primary-600" />
        </button>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Tabs */}
          <div className="flex gap-2 justify-center mb-8 flex-wrap">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                  activeSection === section.key
                    ? 'bg-primary-600 text-white shadow-soft'
                    : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'
                }`}
              >
                {section.icon}
                <span>{section.label}</span>
              </button>
            ))}
          </div>

          {/* Section Content */}
          <div className="animate-fade-in">
            {activeSection === 'share' && (
              <GuestSubmissionForm
                eventId={event.id}
                onSuccess={() => {
                  // Optionally switch to gallery after successful submission
                }}
              />
            )}

            {activeSection === 'wishes' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-semibold text-secondary-800 mb-2">
                    Heartfelt Wishes
                  </h2>
                  <p className="text-secondary-500">
                    Messages from friends and family
                  </p>
                </div>
                <WishDisplay wishes={wishes} loading={wishesLoading} />
              </div>
            )}

            {activeSection === 'photos' && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-semibold text-secondary-800 mb-2">
                    Memory Gallery
                  </h2>
                  <p className="text-secondary-500">
                    Captured moments from the celebration
                  </p>
                </div>
                <PhotoGallery photos={photos} loading={photosLoading} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-primary-100 bg-white/50">
        <div className="flex items-center justify-center gap-2 text-secondary-500">
          <span className="text-sm">Made with</span>
          <Heart className="w-4 h-4 text-primary-500 fill-primary-500" />
          <span className="text-sm">by</span>
          <span className="font-display font-semibold text-primary-600">Memoir</span>
        </div>
      </footer>
    </div>
  );
}
