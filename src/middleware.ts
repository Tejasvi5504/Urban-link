import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the user is trying to access the dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // For now, we'll allow access since we're using mock authentication
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
} 