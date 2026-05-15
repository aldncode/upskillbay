import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import SolutionSection from '@/components/SolutionSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'UpskillBay - AI-Powered Career Acceleration Platform',
  description: 'Transform your career with AI-personalized learning. Build real skills, earn from real projects, land your dream job.',
};

export default function Home() {
  return (
    <>
      <Navbar variant="dark" />
      <main className="relative">
        <Hero />
        <SocialProof />
        <FeaturesSection />
        <SolutionSection />
        <StatsSection />
        <CtaSection />
      </main>
      <Footer variant="dark" />
    </>
  );
}
