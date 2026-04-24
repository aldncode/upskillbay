import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import './globals.css';

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
      <body className="bg-light text-dark">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
