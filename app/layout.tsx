import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'نظام إدارة المخزون والآليات',
  description: 'نظام متكامل لإدارة المخزون، الوقود، والآليات والشاحنات وكادر السائقين',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'إدارة المخزون والآليات',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'نظام إدارة المخزون والآليات',
    description: 'نظام متكامل لإدارة المخزون، الوقود، والآليات والشاحنات وكادر السائقين',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نظام إدارة المخزون والآليات',
    description: 'نظام متكامل لإدارة المخزون، الوقود، والآليات والشاحنات وكادر السائقين',
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
