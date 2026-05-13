import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UpskillBay - Work-Integrated Career Platform',
  description: 'Complete tasks, build proof, earn from gigs, and get hired',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F8FAFC] text-[#0F172A]`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
