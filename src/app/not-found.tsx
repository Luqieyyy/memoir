import Link from 'next/link';
import { Heart, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cream to-white">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blush/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-4">
        <Link href="/" className="flex items-center gap-2 justify-center">
          <Heart className="w-6 h-6 text-primary-600 fill-current" />
          <span className="text-xl font-bold text-secondary-800">Memoir</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md text-center bg-white rounded-2xl shadow-soft p-8">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-primary-600" />
          </div>
          
          <h1 className="text-6xl font-bold text-secondary-800 mb-2">404</h1>
          
          <h2 className="text-xl font-semibold text-secondary-700 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-secondary-500 mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Perhaps the memory you seek is still being created.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-secondary-200 text-secondary-700 rounded-lg font-medium hover:bg-secondary-50 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-secondary-400 text-sm">
        <p>© {new Date().getFullYear()} Memoir. All rights reserved.</p>
      </footer>
    </div>
  );
}
