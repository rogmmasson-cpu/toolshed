import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/listings/new(.*)',
  '/listings/(.*)/edit(.*)',
  '/book(.*)',
  '/bookings(.*)',
  '/messages(.*)',
  '/settings(.*)',
  '/notifications(.*)',
  '/wishlist(.*)',
  '/disputes(.*)',
  '/admin(.*)',
  '/groups/(.*)/join',
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jte?|ttf|woff2?|png|jpg|jpeg|gif|webp|svg|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
