import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// These routes are public and can be accessed without authentication
const publicRoutes = ['/', '/about', '/login', '/signup']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('dreamteam-auth')?.value

  // Check if the route requires authentication (not in public routes)
  const isProtectedRoute = !publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  // If trying to access protected route without auth, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/* (image files in public)
     * - public/* (other static files)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|public).*)',
  ],
} 