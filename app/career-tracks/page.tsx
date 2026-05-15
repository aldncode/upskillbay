'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { 
  Database, 
  Cloud, 
  Shield, 
  Palette, 
  Megaphone, 
  Server, 
  Bot,
  ArrowRight,
  DollarSign,
  Clock,
  Building2,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Target
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const careerTracksData = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    shortDesc: 'Build AI apps like ChatGPT',
    description: 'Create intelligent applications using machine learning and AI tools that companies actually need.',
    outcome: 'Job Ready',
    duration: '16 weeks',
    earningPotential: '$80k - $180k',
    level: 'intermediate',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Hugging Face'],
    companies: ['Google', 'Microsoft', 'OpenAI', 'Meta', 'Startups'],
    projects: ['Chatbot', 'Image Generator', 'AI Analyzer'],
    color: 'from-violet-500 to-purple-600',
    icon: Bot,
    gradient: 'violet'
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    shortDesc: 'Learn dashboards companies actually use',
    description: 'Master data visualization and analysis tools to help businesses make smarter decisions.',
    outcome: 'Job Ready',
    duration: '12 weeks',
    earningPotential: '$60k - $120k',
    level: 'beginner',
    skills: ['Excel', 'SQL', 'Python', 'Tableau', 'Power BI', 'Looker'],
    companies: ['Amazon', 'Netflix', 'Banks', 'Consulting Firms'],
    projects: ['Sales Dashboard', 'Customer Analysis', 'Financial Report'],
    color: 'from-cyan-500 to-blue-600',
    icon: Database,
    gradient: 'cyan'
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    shortDesc: 'Keep systems running 24/7',
    description: 'Learn to build and manage cloud infrastructure that powers modern apps and websites.',
    outcome: 'Job Ready',
    duration: '14 weeks',
    earningPotential: '$90k - $160k',
    level: 'intermediate',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Linux'],
    companies: ['Netflix', 'Spotify', 'Airbnb', 'Tech Giants'],
    projects: ['CI/CD Pipeline', 'Cloud Infrastructure', 'Monitoring System'],
    color: 'from-orange-500 to-red-600',
    icon: Server,
    gradient: 'orange'
  },
  {
    id: 'salesforce-admin',
    title: 'Salesforce Admin',
    shortDesc: 'Manage tools that sales teams use',
    description: 'Become the go-to person for CRM systems that help businesses track customers and deals.',
    outcome: 'Job Ready',
    duration: '10 weeks',
    earningPotential: '$60k - $130k',
    level: 'beginner',
    skills: ['Salesforce', 'Flow Builder', 'Reports', 'Dashboards', 'Apex', 'Lightning'],
    companies: ['Salesforce', 'Accenture', 'Deloitte', 'Any Enterprise'],
    projects: ['Sales Pipeline', 'Automation Setup', 'Custom App'],
    color: 'from-sky-500 to-blue-600',
    icon: Target,
    gradient: 'sky'
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    shortDesc: 'Manage cloud systems used by startups',
    description: 'Learn to design and maintain cloud solutions that scale from small startups to big companies.',
    outcome: 'Job Ready',
    duration: '14 weeks',
    earningPotential: '$85k - $170k',
    level: 'intermediate',
    skills: ['AWS', 'Azure', 'GCP', 'Python', 'CloudFormation', 'Lambda'],
    companies: ['AWS Partners', 'Startups', 'Enterprise Tech'],
    projects: ['Cloud Architecture', 'Serverless App', 'Cloud Migration'],
    color: 'from-emerald-500 to-teal-600',
    icon: Cloud,
    gradient: 'emerald'
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    shortDesc: 'Protect company data from hackers',
    description: 'Learn to find vulnerabilities and keep systems safe from cyber threats.',
    outcome: 'Job Ready',
    duration: '16 weeks',
    earningPotential: '$70k - $150k',
    level: 'intermediate',
    skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Python', 'Firewalls', 'Compliance'],
    companies: ['Banks', 'Tech Companies', 'Government', 'Consulting'],
    projects: ['Security Audit', 'Threat Detection', 'Risk Assessment'],
    color: 'from-red-500 to-pink-600',
    icon: Shield,
    gradient: 'red'
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    shortDesc: 'Design apps people love to use',
    description: 'Create beautiful, easy-to-use interfaces that make apps and websites a joy to use.',
    outcome: 'Job Ready',
    duration: '12 weeks',
    earningPotential: '$60k - $140k',
    level: 'beginner',
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'Adobe XD', 'UI Animation'],
    companies: ['Design Agencies', 'Tech Startups', 'Product Companies'],
    projects: ['Mobile App Design', 'Website Redesign', 'Design System'],
    color: 'from-pink-500 to-rose-600',
    icon: Palette,
    gradient: 'pink'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    shortDesc: 'Help businesses grow online',
    description: 'Master online marketing strategies that drive real results for businesses.',
    outcome: 'Job Ready',
    duration: '10 weeks',
    earningPotential: '$50k - $100k',
    level: 'beginner',
    skills: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Analytics', 'Email Marketing'],
    companies: ['Marketing Agencies', 'E-commerce', 'Startups', 'Brands'],
    projects: ['Marketing Campaign', 'SEO Strategy', 'Social Media Growth'],
    color: 'from-lime-500 to-green-600',
    icon: Megaphone,
    gradient: 'lime'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const glowColors: Record<string, string> = {
  violet: 'rgba(139, 92, 246, 0.4)',
  cyan: 'rgba(6, 182, 212, 0.4)',
  orange: 'rgba(249, 115, 22, 0.4)',
  sky: 'rgba(14, 165, 233, 0.4)',
  emerald: 'rgba(16, 185, 129, 0.4)',
  red: 'rgba(239, 68, 68, 0.4)',
  pink: 'rgba(236, 72, 153, 0.4)',
  lime: 'rgba(132, 204, 22, 0.4)',
};

export default function CareerTracksPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <>
      <Navbar variant="dark" />
      <main className="min-h-screen bg-[#030712]">
        {/* Animated Grid Background */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
          </div>
          
          {/* Glowing Orbs */}
          <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
          <div className="absolute top-40 right-1/4 h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[100px]" />
          <div className="absolute bottom-20 left-1/3 h-[300px] w-[300px] rounded-full bg-cyan-600/15 blur-[80px]" />

          {/* Hero Section */}
          <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 md:px-8 md:pt-32 md:pb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
                </span>
                <span className="text-xs font-medium text-indigo-300">8 Career Paths · Job Guaranteed</span>
              </motion.div>

              <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                Choose Your{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Career Path
                </span>
              </h1>
              
              <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
                Learn real tools. Build real projects. Get job-ready.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="#tracks"
                  className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                >
                  Explore Tracks
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/auth/signup"
                  className="group inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-slate-600 hover:bg-slate-800"
                >
                  Talk to a Mentor
                  <Sparkles className="h-4 w-4 text-amber-400" />
                </Link>
              </div>
            </motion.div>

            {/* Floating Career Cards Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative mt-20 flex flex-wrap justify-center gap-4"
            >
              {[
                { title: 'AI Engineer', color: 'violet' },
                { title: 'Data Analyst', color: 'cyan' },
                { title: 'DevOps', color: 'orange' },
                { title: 'Salesforce', color: 'sky' },
                { title: 'Cloud Engineer', color: 'emerald' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="group relative cursor-pointer"
                  style={{
                    transform: `translateY(${Math.sin(index * 30) * 10}px)`,
                  }}
                >
                  <div 
                    className="rounded-xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-md px-5 py-3 transition-all duration-300 group-hover:scale-105"
                    style={{
                      boxShadow: `0 0 30px ${glowColors[item.color]}20, inset 0 1px 0 rgba(255,255,255,0.1)`,
                    }}
                  >
                    <span className="text-sm font-medium text-slate-300">{item.title}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>

        {/* Career Tracks Grid */}
        <section id="tracks" className="relative px-6 pb-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Find Your Perfect Career Track
              </h2>
              <p className="mx-auto max-w-xl text-slate-400">
                Each track is designed to get you hired. Pick one that matches your goals.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {careerTracksData.map((track) => (
                <motion.div
                  key={track.id}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredCard(track.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Link href={`/career-tracks/${track.id}`}>
                    <div 
                      className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-6 transition-all duration-500 hover:border-slate-700"
                      style={{
                        boxShadow: hoveredCard === track.id 
                          ? `0 0 40px ${glowColors[track.gradient]}30, 0 20px 40px rgba(0,0,0,0.4)`
                          : '0 4px 24px rgba(0,0,0,0.3)',
                      }}
                    >
                      {/* Gradient Background */}
                      <div 
                        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(135deg, ${glowColors[track.gradient]}10 0%, transparent 50%, ${glowColors[track.gradient]}05 100%)`,
                        }}
                      />

                      {/* Glowing Border */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(135deg, ${glowColors[track.gradient]}40, transparent 50%, ${glowColors[track.gradient]}20)`,
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'exclude',
                          padding: '1px',
                        }}
                      />

                      <div className="relative">
                        {/* Header */}
                        <div className="mb-5 flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div 
                              className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${track.color}`}
                            >
                              <track.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{track.title}</h3>
                              <p className="text-sm text-slate-400">{track.shortDesc}</p>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mb-5 text-sm leading-relaxed text-slate-400">
                          {track.description}
                        </p>

                        {/* Tags */}
                        <div className="mb-5 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" />
                            {track.outcome}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-400">
                            <Clock className="h-3 w-3" />
                            {track.duration}
                          </span>
                          <span className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium ${
                            track.level === 'beginner' 
                              ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                              : track.level === 'intermediate'
                              ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                              : 'bg-red-500/10 border border-red-500/20 text-red-400'
                          }`}>
                            {track.level === 'beginner' ? 'Beginner Friendly' : track.level === 'intermediate' ? 'Intermediate' : 'Advanced'}
                          </span>
                        </div>

                        {/* Stats */}
                        <div className="mb-5 grid grid-cols-2 gap-3">
                          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                            <div className="mb-1 flex items-center gap-1">
                              <DollarSign className="h-3 w-3 text-slate-500" />
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Salary</p>
                            </div>
                            <p className="text-sm font-bold text-white">{track.earningPotential}</p>
                          </div>
                          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                            <div className="mb-1 flex items-center gap-1">
                              <Building2 className="h-3 w-3 text-slate-500" />
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Companies</p>
                            </div>
                            <p className="text-sm font-bold text-white">{track.companies.length}+ Hiring</p>
                          </div>
                        </div>

                        {/* Tools */}
                        <div className="mb-5">
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Tools You Will Learn</p>
                          <div className="flex flex-wrap gap-1.5">
                            {track.skills.slice(0, 4).map((skill) => (
                              <span
                                key={skill}
                                className="rounded-md border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                              >
                                {skill}
                              </span>
                            ))}
                            {track.skills.length > 4 && (
                              <span className="rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                                +{track.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Projects Preview */}
                        <div className="mb-5">
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Projects You Will Build</p>
                          <div className="flex gap-2">
                            {track.projects.map((project) => (
                              <div 
                                key={project}
                                className="flex-1 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-center"
                              >
                                <p className="text-xs font-medium text-slate-400">{project}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                          <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">
                            View Career Track
                          </span>
                          <ChevronRight className="h-5 w-5 text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-indigo-400" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden px-6 py-24 md:px-8">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Ready to Transform Your Career?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-lg text-slate-400">
                Join thousands of learners who have built real skills and landed real jobs.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/auth/signup"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#tracks"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-slate-600 hover:bg-slate-800"
                >
                  Browse All Tracks
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer variant="dark" />
    </>
  );
}