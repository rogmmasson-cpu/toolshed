import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Routes anyone can visit without logging in
const isPublicRoute = createRouteMatcher([
  '/',                          // landing page
  '/login(.*)',                 // sign-in
  '/signup(.*)',                // sign-up
  '/browse(.*)',                // browse listings
  '/listings/:id',             // listing detail
  '/about(.*)',
  '/trust(.*)',
  '/pricing-guide(.*)',
  '/insurance(.*)',
  '/blog(.*)',
  '/careers(.*)',
  '/privacy(.*)',
  '/terms(.*)',
  '/liability(.*)',
  '/cookies(.*)',
  '/groups(.*)',                // group pages (public to view)
  '/profile/(.*)',              // public profiles
  '/api/upload',               // blob upload (auth removed)
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
