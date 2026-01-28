'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@/contexts';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  Settings,
  LogOut,
  Heart,
  Menu,
  X,
} from 'lucide-react';
import { Button, Avatar } from '@/components/ui';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/events', label: 'My Events', icon: Calendar },
  { href: '/dashboard/events/new', label: 'Create Event', icon: PlusCircle },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { user, profile, signOut } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-secondary-200 shadow-soft">
          {/* Logo */}
          <div className="flex items-center gap-2 h-16 px-6 border-b border-secondary-100">
            <Heart className="w-6 h-6 text-primary-600 fill-primary-600" />
            <span className="text-xl font-display font-semibold text-secondary-800">
              Memoir
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-800'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Sign Out */}
          <div className="p-4 border-t border-secondary-100">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <Avatar name={profile?.displayName || user?.email || ''} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-800 truncate">
                  {profile?.displayName || 'User'}
                </p>
                <p className="text-xs text-secondary-500 truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={handleSignOut}
              icon={<LogOut className="w-4 h-4" />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-30 lg:hidden bg-white border-b border-secondary-200 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary-600 fill-primary-600" />
            <span className="text-lg font-display font-semibold text-secondary-800">
              Memoir
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-secondary-600 hover:text-secondary-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 lg:hidden',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-secondary-100">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary-600 fill-primary-600" />
              <span className="text-lg font-display font-semibold text-secondary-800">
                Memoir
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-secondary-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-800'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Sign Out */}
          <div className="p-4 border-t border-secondary-100">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <Avatar name={profile?.displayName || user?.email || ''} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-800 truncate">
                  {profile?.displayName || 'User'}
                </p>
                <p className="text-xs text-secondary-500 truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={handleSignOut}
              icon={<LogOut className="w-4 h-4" />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
};
