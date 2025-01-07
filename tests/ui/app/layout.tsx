import type {Metadata} from 'next';
import {DM_Sans, Geist_Mono} from 'next/font/google';

import './globals.css';

const geistSans = DM_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'pdf-to-images-browser',
  description:
    'A lightweight, no-configuration PDF-to-image library for browsers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
