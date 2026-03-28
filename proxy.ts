import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Routes anyone can visit without logging in
const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/signup(.*)',
  '/browse(.*)',
  '/listings/:id',
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
  '/groups(.*)',
  '/profile/(.*)',
  '/api/upload',
])

export const proxy = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
