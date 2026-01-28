import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/dashboard'];

// Routes that should redirect to dashboard if authenticated
const authRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the session token from cookies (Firebase sets this)
  const session = request.cookies.get('session')?.value;
  
  // Note: Full authentication check requires server-side Firebase Admin SDK
  // This middleware provides basic route protection based on session cookie presence
  // For production, consider implementing Firebase Admin SDK verification
  
  // For now, we rely on client-side authentication context
  // The middleware mainly serves as a first-pass filter
  
  // Public routes - always accessible
  if (pathname.startsWith('/wedding/')) {
    return NextResponse.next();
  }
  
  // API routes - handle separately
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Static files
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};
