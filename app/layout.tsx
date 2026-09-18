import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rama Tools | Platform Produktivitas All-in-One',
  description: 'Platform All-in-One untuk kebutuhan dokumen dan karir Anda.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        <Navbar />
        <main className="pt-14">
          {children}
        </main>
      </body>
    </html>
  );
}
