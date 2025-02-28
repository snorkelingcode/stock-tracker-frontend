import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import * as React from "react";

// Load Inter font locally through Next.js font optimization
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400'] 
})

export const metadata: Metadata = {
  title: 'Stock Finder',
  description: 'Find everything in stock in one place',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}