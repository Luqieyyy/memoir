'use client';

import React, { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { usePublicEvent, useWishes, usePhotos, useRSVP, useTheme } from '@/lib/hooks';
import { WeddingHero, GuestSubmissionForm, RSVPForm, ThemeProvider, MemoryWall, WeddingTimeline, DEFAULT_WEDDING_TIMELINE, ShareCard } from '@/components/wedding';
import { Spinner, Card } from '@/components/ui';
import { Heart, Image, ChevronDown, Calendar, Clock } from 'lucide-react';
import { FloatingPetals, CountdownTimer, MusicPlayer, Confetti, YouTubeMusicPlayer } from '@/components/effects';

type SectionType = 'rsvp' | 'memories' | 'share' | 'timeline';

export default function WeddingPage() {
  const params = useParams();
  const weddingId = params.weddingId as string;

  const { event, loading, error } = usePublicEvent(weddingId);
  const { wishes, loading: wishesLoading } = useWishes(event?.id || null);
  const { photos, loading: photosLoading } = usePhotos(event?.id || null);
  const { settings, submitRSVP, settingsLoading } = useRSVP(event?.id || null);
  const { theme, loading: themeLoading } = useTheme(event?.id || null);

  const [activeSection, setActiveSection] = useState<SectionType>('rsvp');
  const [showConfetti, setShowConfetti] = useState(false);
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
    { key: 'rsvp', label: 'RSVP', icon: <Calendar className="w-4 h-4" /> },
    { key: 'timeline', label: 'Aturcara', icon: <Clock className="w-4 h-4" /> },
    { key: 'memories', label: 'Kenangan', icon: <Heart className="w-4 h-4" /> },
    { key: 'share', label: 'Kongsi', icon: <Image className="w-4 h-4" /> },
  ];

  // Check if initial theme loading
  if (themeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Spinner size="lg" />
      </div>
    );
  }

  // Use theme if available, otherwise use default styles implicitly via CSS classes
  const styles = theme ? {} : {
    backgroundColor: '#FFFBF7', // Cream fallback
  };

  const sectionsList = sections.filter(section =>
    !theme || theme.sections[section.key as keyof typeof theme.sections]
  );

  // If theme has order, we could reorder sectionsList here, 
  // currently just using fixed order but filtered visibility

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    theme ? <ThemeProvider theme={theme}>{children}</ThemeProvider> : <>{children}</>;

  return (
    <Wrapper>
      <div className="min-h-screen transition-colors duration-500 relative" style={styles}>
        {/* Floating Petals Background */}
        <FloatingPetals count={12} types={['petal', 'heart']} />

        {/* Confetti Celebration */}
        <Confetti active={showConfetti} duration={4000} particleCount={60} />

        {/* Music Player - Use YouTube if configured, else fallback */}
        {event.backgroundMusic?.enabled ? (
          <YouTubeMusicPlayer music={event.backgroundMusic} variant="floating" />
        ) : (
          <MusicPlayer variant="floating" autoPlay={false} />
        )}

        {/* Hero Section */}
        <WeddingHero event={event} />

        {/* Countdown Timer */}
        <div className="relative z-10 -mt-16 mb-8 px-4">
          <CountdownTimer
            targetDate={event.weddingDate}
            variant="elegant"
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mb-4 relative z-10">
          <button
            onClick={scrollToContent}
            className="w-12 h-12 bg-white rounded-full shadow-elegant flex items-center justify-center animate-bounce hover:scale-110 transition-transform text-primary-600"
            style={theme ? { color: theme.colors.primary } : {}}
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section Tabs */}
            <div className="flex gap-2 justify-center mb-8 flex-wrap">
              {sectionsList.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${activeSection === section.key
                    ? 'theme-bg-primary text-white shadow-soft'
                    : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'
                    }`}

                  style={activeSection === section.key && theme ? {
                    backgroundColor: theme.colors.primary,
                  } : {}}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </button>
              ))}
            </div>

            {/* Section Content */}
            <div className="animate-fade-in">
              {activeSection === 'rsvp' && (
                <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-soft p-6 sm:p-8">
                  {settingsLoading ? (
                    <div className="flex justify-center py-12">
                      <Spinner size="lg" />
                    </div>
                  ) : settings ? (
                    <RSVPForm
                      eventId={event.id}
                      settings={settings}
                      brideName={event.brideName}
                      groomName={event.groomName}
                      onSubmit={async (data) => {
                        await submitRSVP(data);
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 5000);
                      }}
                    />
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-secondary-500">RSVP settings not available.</p>
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'share' && (
                <div className="space-y-8">
                  {/* Share Invitation Card */}
                  <ShareCard
                    brideName={event.brideName}
                    groomName={event.groomName}
                    weddingDate={event.weddingDate}
                    weddingId={event.weddingId}
                    location={event.venue}
                    className="max-w-md mx-auto"
                  />

                  {/* Guest Submission Form */}
                  <div className="max-w-xl mx-auto">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-display font-semibold text-secondary-800 mb-2">
                        Kongsi Ucapan & Foto
                      </h3>
                      <p className="text-secondary-500 text-sm">
                        Tinggalkan ucapan atau muat naik foto untuk pengantin
                      </p>
                    </div>
                    <GuestSubmissionForm
                      eventId={event.id}
                      brideName={event.brideName}
                      groomName={event.groomName}
                      onSuccess={() => {
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 5000);
                        setActiveSection('memories');
                      }}
                    />
                  </div>
                </div>
              )}

              {activeSection === 'timeline' && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-semibold text-secondary-800 mb-2">
                      Aturcara Majlis
                    </h2>
                    <p className="text-secondary-500">
                      Tentative program hari bahagia kami
                    </p>
                  </div>
                  <WeddingTimeline events={event.timeline || DEFAULT_WEDDING_TIMELINE} variant="vertical" />
                </div>
              )}

              {activeSection === 'memories' && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-semibold text-secondary-800 mb-2">
                      Memory Wall
                    </h2>
                    <p className="text-secondary-500">
                      Wishes and photos from friends and family
                    </p>
                  </div>
                  <MemoryWall
                    wishes={wishes}
                    photos={photos}
                    wishesLoading={wishesLoading}
                    photosLoading={photosLoading}
                  />
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
    </Wrapper >
  );
}
