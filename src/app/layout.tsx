import { Suspense } from 'react';
import './globals.css';
import ClientLoadingWrapper from '@/components/ClientLoadingWrapper';
import { Providers } from './providers';

export const metadata = {
  title: 'Art III Dela Cruz - Portfolio',
  description: 'Professional portfolio showcasing my work and skills',
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
