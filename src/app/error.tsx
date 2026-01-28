'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Heart, RefreshCw, Home } from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-romantic">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blush/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-4">
        <Link href="/" className="flex items-center gap-2 justify-center">
          <Heart className="w-6 h-6 text-primary-600 fill-primary-600" />
          <span className="text-xl font-display font-semibold text-secondary-800">Memoir</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md text-center" padding="lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">💔</span>
          </div>
          
          <h1 className="text-2xl font-display font-semibold text-secondary-800 mb-2">
            Oops! Something went wrong
          </h1>
          
          <p className="text-secondary-500 mb-6">
            We're sorry, but something unexpected happened. Please try again or return to the homepage.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-xs font-mono text-red-700 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-red-500 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={reset}
              className="flex-1"
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Try Again
            </Button>
            <Link href="/" className="flex-1">
              <Button fullWidth icon={<Home className="w-4 h-4" />}>
                Go Home
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}
