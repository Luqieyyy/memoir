'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { User } from 'firebase/auth';
import {
  onAuthChange,
  getUserProfile,
  signIn as firebaseSignIn,
  signOut as firebaseSignOut,
  registerUser,
  resetPassword,
} from '@/lib/firebase';
import { UserProfile } from '@/types';

// ============================================
// Types
// ============================================

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

// ============================================
// Context
// ============================================

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ============================================
// Provider
// ============================================

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  });

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setState({
            user: firebaseUser,
            profile,
            loading: false,
            error: null,
          });
        } catch (error) {
          setState({
            user: firebaseUser,
            profile: null,
            loading: false,
            error: 'Failed to load user profile',
          });
        }
      } else {
        setState({
          user: null,
          profile: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await firebaseSignIn(email, password);
    } catch (error: any) {
      let errorMessage = 'Failed to sign in';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password';
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      throw new Error(errorMessage);
    }
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        await registerUser(email, password, displayName);
      } catch (error: any) {
        let errorMessage = 'Failed to create account';

        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'An account with this email already exists';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak';
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));

        throw new Error(errorMessage);
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw new Error('Failed to sign out');
    }
  }, []);

  const handleResetPassword = useCallback(async (email: string) => {
    try {
      await resetPassword(email);
    } catch (error: any) {
      let errorMessage = 'Failed to send password reset email';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }

      throw new Error(errorMessage);
    }
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      signIn,
      signUp,
      signOut,
      resetPassword: handleResetPassword,
      clearError,
    }),
    [state, signIn, signUp, signOut, handleResetPassword, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// Hook
// ============================================

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
}

// ============================================
// Higher Order Component
// ============================================

export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useAuthContext();

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="animate-pulse text-primary-600">Loading...</div>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
}
