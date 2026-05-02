import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth"; 
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dashboard - UpskillBay',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0B0F19]">
        {children}
      </div>
    </>
  );
}
