import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Panel - UpskillBay',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session || user.role !== 'ADMIN') {
    redirect('/auth/login');
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-light">
        {children}
      </div>
    </>
  );
}
