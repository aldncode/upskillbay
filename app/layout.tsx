import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UpskillBay - AI-Powered Career Acceleration Platform',
  description: 'Transform your career with AI-personalized learning. Build real skills, earn from real projects, land your dream job.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#030712] text-white`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
