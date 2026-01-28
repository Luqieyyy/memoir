import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Memoir - Capture Your Wedding Memories',
  description:
    'A beautiful wedding memory app where guests can share wishes, photos, and memories with the happy couple via QR code.',
  keywords: ['wedding', 'memories', 'photos', 'wishes', 'QR code', 'celebration'],
  authors: [{ name: 'Memoir' }],
  openGraph: {
    title: 'Memoir - Capture Your Wedding Memories',
    description:
      'A beautiful wedding memory app where guests can share wishes, photos, and memories with the happy couple.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#d4856a" />
      </head>
      <body className="min-h-screen bg-cream">
        <AuthProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#343b47',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#d4856a',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
