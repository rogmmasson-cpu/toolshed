import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'ToolShed — Rent & Lend Tools in Your Neighborhood', template: '%s | ToolShed' },
  description: 'Peer-to-peer tool and household item sharing. Find the tools you need nearby, or earn money lending what you own.',
  keywords: ['tool rental', 'tool sharing', 'rent tools', 'borrow tools', 'peer to peer'],
  other: {
    'impact-site-verification': 'f03296cb-4402-458c-b9ae-c38a0317a65f',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen bg-white`} suppressHydrationWarning>{children}</body>
      </html>
    </ClerkProvider>
  )
}
