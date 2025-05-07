import { Suspense } from 'react';
import './globals.css';
import ClientLoadingWrapper from '@/components/ClientLoadingWrapper';

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
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Suspense fallback={null}>
          <ClientLoadingWrapper>
            {children}
          </ClientLoadingWrapper>
        </Suspense>
      </body>
    </html>
  );
}
