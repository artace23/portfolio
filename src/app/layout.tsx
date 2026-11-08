import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Splash, SplashHandoff } from '@/components/Splash';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

const siteTitle = 'Art Dela Cruz | Full-Stack & Mobile Developer';
const siteDescription =
  'Full-stack and mobile developer in the Philippines. I build web apps, mobile apps and device-connected systems with Next.js, React Native and Laravel. Available for full-time roles and freelance projects.';

export const metadata: Metadata = {
  metadataBase: new URL('https://artdelacruz.vercel.app'),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: 'https://artdelacruz.vercel.app',
    siteName: 'Art Dela Cruz',
    images: [{ url: '/images/profile.jpg', alt: 'Art Dela Cruz' }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
    images: ['/images/profile.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before first paint: restores a saved theme and enables scroll reveals. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t)}catch(e){}",
          }}
        />
      </head>
      <body className="font-sans bg-bg text-ink antialiased">
        <Splash />
        <a href="#work" className="skip-link">
          Skip to content
        </a>
        {children}
        <SplashHandoff />
      </body>
    </html>
  );
}
