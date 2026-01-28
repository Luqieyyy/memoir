'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts';
import { Button, Input, Card } from '@/components/ui';
import { Heart, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const { user, loading: authLoading, resetPassword } = useAuthContext();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await resetPassword(email);
      setSent(true);
      toast.success('Password reset email sent!');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-romantic">
        <header className="relative z-10 py-6 px-4">
          <Link href="/" className="flex items-center gap-2 justify-center">
            <Heart className="w-6 h-6 text-primary-600 fill-primary-600" />
            <span className="text-xl font-display font-semibold text-secondary-800">Memoir</span>
          </Link>
        </header>

        <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
          <Card className="w-full max-w-md text-center" padding="lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-display font-semibold text-secondary-800 mb-2">
              Check Your Email
            </h1>
            <p className="text-secondary-500 mb-6">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
            <Link href="/login">
              <Button variant="outline" fullWidth>
                Back to Sign In
              </Button>
            </Link>
          </Card>
        </main>
      </div>
    );
  }

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
        <Card className="w-full max-w-md" padding="lg">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-secondary-500 hover:text-secondary-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-semibold text-secondary-800 mb-2">
              Reset Your Password
            </h1>
            <p className="text-secondary-500">
              Enter your email and we'll send you reset instructions
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              disabled={loading}
              autoComplete="email"
            />

            <Button type="submit" fullWidth loading={loading} size="lg">
              Send Reset Instructions
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
