import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NAFA - نظام إدارة المخازن والوقود المتكامل',
  description: 'لوحة تحكم تفاعلية لإدارة المخازن ومراقبة مخزون الوقود وحركات التوريد والصرف الفورية',
  openGraph: {
    title: 'NAFA - نظام إدارة المخازن والوقود المتكامل',
    description: 'لوحة تحكم تفاعلية لإدارة المخازن ومراقبة مخزون الوقود وحركات التوريد والصرف الفورية',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NAFA - نظام إدارة المخازن والوقود المتكامل',
    description: 'لوحة تحكم تفاعلية لإدارة المخازن ومراقبة مخزون الوقود وحركات التوريد والصرف الفورية',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-white text-[#1e293b] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
