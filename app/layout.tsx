import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'ToolShed — Rent & Lend Tools in Your Neighborhood', template: '%s | ToolShed' },
  description: 'Peer-to-peer tool and household item sharing. Find the tools you need nearby, or earn money lending what you own.',
  keywords: ['tool rental', 'tool sharing', 'rent tools', 'borrow tools', 'peer to peer'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white`}>{children}</body>
    </html>
  )
}
