'use client';

import { createContext, useContext, ReactNode } from 'react';
import toast, { Toaster, ToastOptions } from 'react-hot-toast';

interface ToastContextType {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  loading: (message: string, options?: ToastOptions) => string;
  dismiss: (toastId?: string) => void;
  promise: <T>(
    promise: Promise<T>,
    msgs: {
      loading: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ) => Promise<T>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const toastFunctions: ToastContextType = {
    success: (message, options) => {
      toast.success(message, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#10B981',
          color: '#fff',
          fontWeight: 500,
        },
        ...options,
      });
    },
    error: (message, options) => {
      toast.error(message, {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#EF4444',
          color: '#fff',
          fontWeight: 500,
        },
        ...options,
      });
    },
    loading: (message, options) => {
      return toast.loading(message, {
        position: 'top-center',
        ...options,
      });
    },
    dismiss: (toastId) => {
      toast.dismiss(toastId);
    },
    promise: async (promise, msgs, options) => {
      return toast.promise(
        promise,
        {
          loading: msgs.loading,
          success: msgs.success,
          error: msgs.error,
        },
        {
          position: 'top-center',
          ...options,
        }
      );
    },
  };

  return (
    <ToastContext.Provider value={toastFunctions}>
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
