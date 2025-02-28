import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import * as React from "react";

// Load Inter font locally through Next.js font optimization
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',  // Ensures text remains visible during font loading
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Stock Finder',
  description: 'Find everything in stock in one place',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}