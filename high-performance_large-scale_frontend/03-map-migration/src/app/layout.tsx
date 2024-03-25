import '@/styles/globals.css';
import { NextProvider, NextLayout } from './providers';
import { Metadata } from 'next';
import GoogleAnalytics from './googleAnalytics';
import { GA_TRACKING_ID } from '@/lib/gtag';

export const metadata: Metadata = {
  title: 'Fastcampus NextMap',
  description: 'Next.js 13을 이용한 맛집 앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics GA_TRACKING_ID={GA_TRACKING_ID} />
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
