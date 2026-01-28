import Link from 'next/link';
import { Heart, QrCode, Camera, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary-600 fill-primary-600" />
              <span className="text-xl font-display font-semibold text-secondary-800">
                Memoir
              </span>
            </div>
            <nav className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-secondary-600 hover:text-secondary-800 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-sm"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-romantic">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blush/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-champagne/30 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full text-primary-700 text-sm font-medium mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Capture Every Precious Moment</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-secondary-800 mb-6 leading-tight">
              Create Beautiful
              <span className="block text-gradient">Wedding Memories</span>
            </h1>

            <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
              Let your guests share their wishes, photos, and heartfelt messages through a simple QR code.
              One scan, unlimited memories.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-elegant hover:shadow-xl"
              >
                Create Your Event
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-secondary-700 rounded-xl font-semibold hover:bg-secondary-50 transition-all shadow-soft border border-secondary-200"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Feature Preview Cards */}
          <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all text-center">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-display font-semibold text-secondary-800 mb-2">
                One QR Code
              </h3>
              <p className="text-secondary-500 text-sm">
                Generate a unique, static QR code for your wedding that guests can easily scan
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all text-center">
              <div className="w-14 h-14 bg-blush/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-display font-semibold text-secondary-800 mb-2">
                Heartfelt Wishes
              </h3>
              <p className="text-secondary-500 text-sm">
                Guests can leave personalized messages and wishes for the happy couple
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-all text-center">
              <div className="w-14 h-14 bg-champagne/50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-display font-semibold text-secondary-800 mb-2">
                Photo Gallery
              </h3>
              <p className="text-secondary-500 text-sm">
                Collect beautiful photos from every guest, all in one place
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-800 mb-4">
              How It Works
            </h2>
            <p className="text-secondary-500 max-w-2xl mx-auto">
              Create your wedding memory book in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-display font-bold text-primary-600">
                1
              </div>
              <h3 className="text-xl font-display font-semibold text-secondary-800 mb-3">
                Create Your Event
              </h3>
              <p className="text-secondary-500">
                Sign up and create your wedding event with details like venue, date, and a welcome message.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-display font-bold text-primary-600">
                2
              </div>
              <h3 className="text-xl font-display font-semibold text-secondary-800 mb-3">
                Share Your QR Code
              </h3>
              <p className="text-secondary-500">
                Download your unique QR code and place it on tables, invitations, or anywhere guests can see.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-display font-bold text-primary-600">
                3
              </div>
              <h3 className="text-xl font-display font-semibold text-secondary-800 mb-3">
                Collect Memories
              </h3>
              <p className="text-secondary-500">
                Guests scan, share wishes and photos. Everything appears instantly in your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-romantic">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-800 mb-6">
            Start Capturing Memories Today
          </h2>
          <p className="text-xl text-secondary-600 mb-8">
            Create your free wedding event and let your guests be part of your special day.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-elegant hover:shadow-xl"
          >
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary-600 fill-primary-600" />
              <span className="font-display font-semibold text-secondary-800">Memoir</span>
            </div>
            <p className="text-secondary-500 text-sm">
              © {new Date().getFullYear()} Memoir. Made with ❤️ for wedding celebrations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
