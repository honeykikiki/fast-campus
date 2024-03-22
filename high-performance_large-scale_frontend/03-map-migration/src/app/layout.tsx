import '@/styles/globals.css';
import { Metadata } from 'next';
import { NextLayout, NextProvider } from './provider';

export const metadata: Metadata = {
  title: 'Next-map',
  description: '맛집 앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextProvider>
        <NextLayout>{children}</NextLayout>
      </NextProvider>
    </html>
  );
}
