import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /login, /protected)
  const { pathname } = request.nextUrl

  // Check if the user is authenticated by looking for auth token in cookies or headers
  // Since we're using localStorage in the client, we'll let the client-side handle redirects
  // This middleware is mainly for API route protection if needed
  
  // Allow all requests to pass through - client-side will handle authentication
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (custom auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)',
  ],
}