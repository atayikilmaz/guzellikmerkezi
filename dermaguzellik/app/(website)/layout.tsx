import Navbar from '@/components/Navbar';
import CookieBanner from '@/components/CookieBanner'
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Suspense } from 'react';

export default function WebsiteLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <div>

      <GoogleAnalytics GA_MEASUREMENT_ID='G-J2PD8C0RC8'/>

      <Navbar />

      
              {children}
              <CookieBanner />

      </div>
  }
