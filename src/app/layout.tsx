import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Memoir — Where Wedding Memories Come Alive',
  description:
    'Malaysia\'s #1 digital wedding memory platform. Guests scan a QR code to share wishes, photos, and heartfelt messages — all collected in one beautiful place.',
  keywords: ['wedding', 'memories', 'QR code', 'Malaysia', 'digital wishes', 'photo gallery', 'wedding tech'],
  authors: [{ name: 'Memoir' }],
  openGraph: {
    title: 'Memoir — Where Wedding Memories Come Alive',
    description:
      'The modern way Malaysian couples capture wedding memories. One QR code, endless beautiful moments.',
    type: 'website',
    locale: 'en_MY',
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
        <meta name="theme-color" content="#1A1625" />
      </head>
      <body className="min-h-screen bg-secondary-950">
        <AuthProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#241F31',
                color: '#F5F0EB',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#E8B4B8',
                  secondary: '#1A1625',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#1A1625',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
