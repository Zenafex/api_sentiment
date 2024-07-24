'use client'

import { NotificationProvider } from '@/context/NotificationContext'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../style/theme'; // Asegúrate de ajustar la ruta

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auth Nextjs 13',
  description: 'Sistema de autenticacion api Sentiment'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout ({ children }: RootLayoutProps) {
  return (
    <ThemeProvider theme={theme}>

    <html lang='en'>
      <body className={inter.className}>
          <NotificationProvider>
            <main className='min-h-screen flex flex-col items-center justify-center'>
              {children}
            </main>
          </NotificationProvider>
      </body>
    </html>
    </ThemeProvider>

  )
}
