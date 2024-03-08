

import { Inter } from 'next/font/google'
import React from 'react';
import "../app/globals.css";


const inter = Inter({ subsets: ['latin'] })

  
export const metadata = {
  title: 'Derma Güzellik Merkezi',
  description: 'Atakent Derma Güzellik Web Uygulaması',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',

  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
      
    
    
    {children}

    </body>
      
    </html>
  )
}
