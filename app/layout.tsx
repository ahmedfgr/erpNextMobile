import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'فهد - نظام إدارة المخازن والأسطول المتكامل',
  description: 'منظومة فهد لإدارة المخازن والوقود والأسطول والشاحنات والسائقين',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'فهد',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'فهد - نظام إدارة المخازن والأسطول المتكامل',
    description: 'منظومة فهد لإدارة المخازن والوقود والأسطول والشاحنات والسائقين',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'فهد - نظام إدارة المخازن والأسطول المتكامل',
    description: 'منظومة فهد لإدارة المخازن والوقود والأسطول والشاحنات والسائقين',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-white text-[#1e293b] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
