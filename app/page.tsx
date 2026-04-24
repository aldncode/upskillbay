import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Home - UpskillBay',
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-light">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Work. Learn. Earn. Get Hired.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            UpskillBay is a work-integrated career platform where you complete real tasks,
            build a portfolio, earn money, and get discovered by top companies.
          </p>

          <div className="flex gap-4 justify-center">
            <a href="/auth/signup" className="btn btn-primary text-lg px-8">
              Get Started Free
            </a>
            <a href="/capsules" className="btn btn-outline text-lg px-8">
              Browse Capsules
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-bold text-lg mb-2">Learn Skills</h3>
              <p className="text-gray-600 text-sm">
                Enroll in skill capsules and follow structured learning paths
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-bold text-lg mb-2">Complete Tasks</h3>
              <p className="text-gray-600 text-sm">
                Submit real-world tasks and get expert feedback
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-lg mb-2">Build Portfolio</h3>
              <p className="text-gray-600 text-sm">
                Automatically showcase your completed work
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="font-bold text-lg mb-2">Earn & Get Hired</h3>
              <p className="text-gray-600 text-sm">
                Apply for gigs and connect with employers
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-white py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of learners building real skills and earning real income.
            </p>
            <a href="/auth/signup" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8">
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
