import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'UpskillBay - Build Skills, Earn Income, Get Hired',
  description: 'Learn real skills through client projects, earn money from your first week, and become hireable. No experience needed.',
};

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SocialProof />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <StatsSection />
      <CtaSection />
      <Footer />
    </>
  );
}
