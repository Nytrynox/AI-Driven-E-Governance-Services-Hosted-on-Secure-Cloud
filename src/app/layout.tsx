import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI-Driven E-Governance Services',
  description: 'Secure and intelligent government services platform',
  keywords: 'e-governance, AI, government services, digital transformation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
