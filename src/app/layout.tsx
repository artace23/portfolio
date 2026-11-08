import { Suspense } from 'react';
import './globals.css';
import ClientLoadingWrapper from '@/components/ClientLoadingWrapper';
import { Providers } from './providers';
import type { Metadata, Viewport } from 'next';

const siteTitle = 'Art Dela Cruz | Full-Stack & Mobile Developer';
const siteDescription =
  'Full-stack and mobile developer working with Next.js, React Native, Laravel and Supabase. Selected projects, experience and contact details.';

export const metadata: Metadata = {
  metadataBase: new URL('https://artdelacruz.vercel.app'),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://artdelacruz.vercel.app',
    siteName: 'Art Dela Cruz',
    images: [{ url: '/images/profile_avatar.png', alt: 'Art Dela Cruz' }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
    images: ['/images/profile_avatar.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Providers>
          <Suspense fallback={null}>
            <ClientLoadingWrapper>
              {children}
            </ClientLoadingWrapper>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
