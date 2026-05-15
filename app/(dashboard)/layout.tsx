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
      <Navbar variant="dark" />
      <div className="min-h-screen bg-[#030712]">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        </div>
        <div className="relative">
          {children}
        </div>
      </div>
    </>
  );
}
