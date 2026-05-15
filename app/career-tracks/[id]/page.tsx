'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Building2, 
  Zap,
  Target,
  Code,
  Briefcase,
  TrendingUp,
  Sparkles,
  Play,
  Shield
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const careerTracksData: Record<string, {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  fullDescription: string;
  outcome: string;
  duration: string;
  earningPotential: string;
  level: string;
  skills: string[];
  companies: string[];
  projects: string[];
  color: string;
  gradient: string;
  icon: any;
  roadmap: { week: string; title: string; description: string }[];
  stats: { label: string; value: string; icon: any }[];
  faqs: { question: string; answer: string }[];
}> = {
  'ai-engineer': {
    id: 'ai-engineer',
    title: 'AI Engineer',
    shortDesc: 'Build AI apps like ChatGPT',
    description: 'Create intelligent applications using machine learning and AI tools that companies actually need.',
    fullDescription: 'AI Engineers are in massive demand as companies race to adopt artificial intelligence. This track teaches you how to build real AI applications from scratch using the same tools used at Google, OpenAI, and tech startups. You will learn to create chatbots, image generators, and AI-powered analysis tools that businesses actually need.',
    outcome: 'Job Ready',
    duration: '16 weeks',
    earningPotential: '$80k - $180k',
    level: 'intermediate',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Hugging Face', 'FastAPI', 'Vector Databases'],
    companies: ['Google', 'Microsoft', 'OpenAI', 'Meta', 'Anthropic', 'Startups', 'Tech Giants'],
    projects: ['ChatGPT Clone', 'Image Generator', 'AI Data Analyzer', 'RAG Application'],
    color: 'from-violet-500 to-purple-600',
    gradient: 'violet',
    icon: (props: any) => <Zap {...props} />,
    roadmap: [
      { week: 'Weeks 1-2', title: 'Python & Math Foundations', description: 'Master Python for AI, linear algebra, and probability basics' },
      { week: 'Weeks 3-4', title: 'Machine Learning Basics', description: 'Learn supervised and unsupervised learning algorithms' },
      { week: 'Weeks 5-8', title: 'Deep Learning & Neural Networks', description: 'Build neural networks from scratch with TensorFlow/PyTorch' },
      { week: 'Weeks 9-12', title: 'LLMs & Prompt Engineering', description: 'Master OpenAI API, LangChain, and build AI apps' },
      { week: 'Weeks 13-16', title: 'Capstone Project', description: 'Build a complete AI application for your portfolio' },
    ],
    stats: [
      { label: 'Average Starting Salary', value: '$95,000', icon: DollarSign },
      { label: 'Job Placement Rate', value: '94%', icon: Target },
      { label: 'Hiring Companies', value: '500+', icon: Building2 },
      { label: 'Projects Completed', value: '4', icon: Code },
    ],
    faqs: [
      { question: 'Do I need prior coding experience?', answer: 'Basic Python knowledge helps, but we provide pre-course materials to get you ready.' },
      { question: 'What kind of jobs can I get?', answer: 'AI Engineer, Machine Learning Engineer, Prompt Engineer, AI Developer roles at tech companies.' },
      { question: 'How long does it take to get hired?', answer: 'Most students land jobs within 3 months of completing the track.' },
    ]
  },
  'data-analyst': {
    id: 'data-analyst',
    title: 'Data Analyst',
    shortDesc: 'Learn dashboards companies actually use',
    description: 'Master data visualization and analysis tools to help businesses make smarter decisions.',
    fullDescription: 'Data Analysts are the backbone of data-driven decision making. Every company needs someone who can look at data and find stories that help the business grow. This track teaches you exactly what hiring managers look for - real skills with Excel, SQL, Python, and visualization tools like Tableau and Power BI.',
    outcome: 'Job Ready',
    duration: '12 weeks',
    earningPotential: '$60k - $120k',
    level: 'beginner',
    skills: ['Excel', 'SQL', 'Python', 'Tableau', 'Power BI', 'Looker', 'Pandas', 'Statistics'],
    companies: ['Amazon', 'Netflix', 'Banks', 'Consulting Firms', 'Healthcare', 'Retail'],
    projects: ['Sales Dashboard', 'Customer Analysis', 'Financial Report', 'Marketing Analytics'],
    color: 'from-cyan-500 to-blue-600',
    gradient: 'cyan',
    icon: (props: any) => <Target {...props} />,
    roadmap: [
      { week: 'Weeks 1-2', title: 'Excel Mastery', description: 'Advanced formulas, pivot tables, and data cleaning' },
      { week: 'Weeks 3-4', title: 'SQL for Data Analysis', description: 'Write queries that extract real insights from databases' },
      { week: 'Weeks 5-6', title: 'Python for Data', description: 'Pandas, NumPy, and data manipulation basics' },
      { week: 'Weeks 7-10', title: 'Visualization Tools', description: 'Master Tableau and Power BI for dashboards' },
      { week: 'Weeks 11-12', title: 'Capstone Project', description: 'End-to-end analysis project for your portfolio' },
    ],
    stats: [
      { label: 'Average Starting Salary', value: '$70,000', icon: DollarSign },
      { label: 'Job Placement Rate', value: '92%', icon: Target },
      { label: 'Hiring Companies', value: '1000+', icon: Building2 },
      { label: 'Projects Completed', value: '4', icon: Code },
    ],
    faqs: [
      { question: 'Is this good for beginners?', answer: 'Absolutely! This track starts from the basics and builds up step by step.' },
      { question: 'What jobs can I apply for?', answer: 'Data Analyst, Business Analyst, BI Developer, or Analytics roles in any industry.' },
      { question: 'Do I need a degree?', answer: 'No degree required. Portfolio projects matter more than formal education.' },
    ]
  },
  'devops-engineer': {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    shortDesc: 'Keep systems running 24/7',
    description: 'Learn to build and manage cloud infrastructure that powers modern apps and websites.',
    fullDescription: 'DevOps Engineers keep the digital world running. When you stream a movie on Netflix or book a ride on Uber, DevOps engineers made it possible. This track teaches you the exact tools and practices used at the world\'s most advanced tech companies to deploy and manage systems at scale.',
    outcome: 'Job Ready',
    duration: '14 weeks',
    earningPotential: '$90k - $160k',
    level: 'intermediate',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Linux', 'CI/CD', 'Ansible'],
    companies: ['Netflix', 'Spotify', 'Airbnb', 'Tech Giants', 'Banks', 'Startups'],
    projects: ['CI/CD Pipeline', 'Cloud Infrastructure', 'Monitoring System', 'Container Orchestration'],
    color: 'from-orange-500 to-red-600',
    gradient: 'orange',
    icon: (props: any) => <Code {...props} />,
    roadmap: [
      { week: 'Weeks 1-2', title: 'Linux & Bash', description: 'Command line mastery and shell scripting' },
      { week: 'Weeks 3-4', title: 'Docker Fundamentals', description: 'Containerization and Docker Compose' },
      { week: 'Weeks 5-6', title: 'Cloud Computing (AWS)', description: 'EC2, S3, Lambda, and cloud services' },
      { week: 'Weeks 7-10', title: 'Kubernetes & Orchestration', description: 'Deploy and scale containerized applications' },
      { week: 'Weeks 11-14', title: 'CI/CD & Infrastructure as Code', description: 'Jenkins, Terraform, and automation' },
    ],
    stats: [
      { label: 'Average Starting Salary', value: '$105,000', icon: DollarSign },
      { label: 'Job Placement Rate', value: '91%', icon: Target },
      { label: 'Hiring Companies', value: '800+', icon: Building2 },
      { label: 'Projects Completed', value: '4', icon: Code },
    ],
    faqs: [
      { question: 'What background do I need?', answer: 'Basic IT or developer experience helps. We cover Linux and cloud from the ground up.' },
      { question: 'Is certification included?', answer: 'Yes, you will prepare for AWS Solutions Architect and CKA certifications.' },
      { question: 'What companies hire DevOps engineers?', answer: 'Every tech company - from startups to Netflix, Spotify, and banks.' },
    ]
  },
  'salesforce-admin': {
    id: 'salesforce-admin',
    title: 'Salesforce Admin',
    shortDesc: 'Manage tools that sales teams use',
    description: 'Become the go-to person for CRM systems that help businesses track customers and deals.',
    fullDescription: 'Salesforce powers how modern businesses manage customer relationships. Every company from startups to Fortune 500 uses Salesforce, and they need skilled administrators to keep it running. This track prepares you for the Salesforce Administrator certification while teaching real-world skills companies actually need.',
    outcome: 'Job Ready',
    duration: '10 weeks',
    earningPotential: '$60k - $130k',
    level: 'beginner',
    skills: ['Salesforce', 'Flow Builder', 'Reports', 'Dashboards', 'Apex', 'Lightning', 'Data Loader', 'Security'],
    companies: ['Salesforce', 'Accenture', 'Deloitte', 'Any Enterprise', 'Nonprofits', 'Government'],
    projects: ['Sales Pipeline', 'Automation Setup', 'Custom App', 'Integration Project'],
    color: 'from-sky-500 to-blue-600',
    gradient: 'sky',
    icon: (props: any) => <Briefcase {...props} />,
    roadmap: [
      { week: 'Weeks 1-2', title: 'Salesforce Basics', description: 'Navigation, objects, and data model' },
      { week: 'Weeks 3-4', title: 'Reports & Dashboards', description: 'Build real-time analytics for leadership' },
      { week: 'Weeks 5-6', title: 'Automation with Flow', description: 'No-code automation for business processes' },
      { week: 'Weeks 7-8', title: 'Security & Sharing', description: 'Configure user access and data security' },
      { week: 'Weeks 9-10', title: 'Capstone Project', description: 'Complete Salesforce implementation' },
    ],
    stats: [
      { label: 'Average Starting Salary', value: '$75,000', icon: DollarSign },
      { label: 'Job Placement Rate', value: '95%', icon: Target },
      { label: 'Hiring Companies', value: '2000+', icon: Building2 },
      { label: 'Projects Completed', value: '4', icon: Code },
    ],
    faqs: [
      { question: 'Do I need coding experience?', answer: 'No! Salesforce administration is largely no-code. We teach everything from scratch.' },
      { question: 'Is certification included?', answer: 'Yes, you will be prepared for the Salesforce Administrator certification exam.' },
      { question: 'What industries use Salesforce?', answer: 'Every industry - healthcare, finance, retail, nonprofits, government, and more.' },
    ]
  },
  'cloud-engineer': {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    shortDesc: 'Manage cloud systems used by startups',
    description: 'Learn to design and maintain cloud solutions that scale from small startups to big companies.',
    fullDescription: 'Cloud computing is the backbone of modern technology. Every app you use runs on cloud infrastructure. This track teaches you to design, deploy, and manage cloud solutions across AWS, Azure, and GCP - the three biggest cloud platforms that power the internet.',
    outcome: 'Job Ready',
    duration: '14 weeks',
    earningPotential: '$85k - $170k',
    level: 'intermediate',
    skills: ['AWS', 'Azure', 'GCP', 'Python', 'CloudFormation', 'Lambda', 'Serverless', 'Networking'],
    companies: ['AWS Partners', 'Startups', 'Enterprise Tech', 'Banks', 'Government'],
    projects: ['Cloud Architecture', 'Serverless App', 'Cloud Migration', 'Multi-Cloud Setup'],
    color: 'from-emerald-500 to-teal-600',
    gradient: 'emerald',
    icon: (props: any) => <Zap {...props} />,
    roadmap: [
      { week: 'Weeks 1-2', title: 'Cloud Fundamentals', description: 'Understanding cloud computing models' },
      { week: 'Weeks 3-6', title: 'AWS Deep Dive', description: 'EC2, S3, RDS, Lambda, VPC in depth' },
      { week: 'Weeks 7-8', title: 'Azure & GCP', description: 'Multi-cloud concepts and comparisons' },
      { week: 'Weeks 9-12', title: 'Infrastructure as Code', description: 'Terraform, CloudFormation, and automation' },
      { week: 'Weeks 13-14', title: 'Capstone Project', description: 'Design a complete cloud architecture' },
    ],
    stats: [
      { label: 'Average Starting Salary', value: '$100,000', icon: DollarSign },
      { label: 'Job Placement Rate', value: '93%', icon: Target },
      { label: 'Hiring Companies', value: '600+', icon: Building2 },
      { label: 'Projects Completed', value: '4', icon: Code },
    ],
    faqs: [
      { question: 'What background is needed?', answer: 'Basic IT knowledge helps. We cover cloud concepts from fundamentals.' },
      { question: 'Which cloud platform will I learn?', answer: 'Focus on AWS with intro to Azure and GCP for flexibility.' },
      { question: 'Are certifications included?', answer: 'Yes, you will prepare for AWS Solutions Architect Associate.' },
    ]
  },
  'cybersecurity-analyst': {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    shortDesc: 'Protect company data from hackers',
    description: 'Learn to find vulnerabilities and keep systems safe from cyber threats.',
    fullDescription: 'Cybersecurity is one of the fastest-growing fields with a massive talent shortage. Every company needs to protect their data, making this one of the most secure career paths. Learn to think like hackers to defend against them - the exact skills companies desperately need.',
    outcome: 'Job Ready',
    duration: '16 weeks',
    earningPotential: '$70k - $150k',
    level: 'intermediate',
    skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Python', 'Firewalls', 'Compliance', 'SOC', 'Threat Hunting'],
    companies: ['Banks', 'Tech Companies', 'Government', 'Consulting', 'Healthcare', 'Retail'],
    projects: ['Security Audit', 'Threat Detection', 'Risk Assessment', 'Incident Response'],
    color: 'from-red-500 to-pink-600',
    gradient: 'red',
    icon: (props: any) => <Shield {...props} />,
    roadmap: [
      { week: 'Weeks 1-2', title: 'Networking Fundamentals', description: 'TCP/IP, ports, protocols, and network architecture' },
      { week: 'Weeks 3-4', title: 'Security Foundations', description: 'Security concepts, frameworks, and compliance' },
      { week: 'Weeks 5-8', title: 'Defensive Security', description: 'SIEM, log analysis, and threat detection' },
      { week: 'Weeks 9-12', title: 'Offensive Security', description: 'Penetration testing and vulnerability assessment' },
      { week: 'Weeks 13-16', title: 'Capstone Project', description: 'Complete security audit with remediation plan' },
    ],
    stats: [
      { label: 'Average Starting Salary', value: '$85,000', icon: DollarSign },
      { label: 'Job Placement Rate', value: '90%', icon: Target },
      { label: 'Hiring Companies', value: '700+', icon: Building2 },
      { label: 'Projects Completed', value: '4', icon: Code },
    ],
    faqs: [
      { question: 'Do I need to be a hacker?', answer: 'No! You learn the fundamentals step by step, including basic scripting.' },
      { question: 'What certifications will I earn?', answer: 'Prepare for CompTIA Security+ and CySA+ certifications.' },
      { question: 'Is programming required?', answer: 'Basic Python is taught as part of the track. No prior experience needed.' },
    ]
  },
  'ui-ux-designer': {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    shortDesc: 'Design apps people love to use',
    description: 'Create beautiful, easy-to-use interfaces that make apps and websites a joy to use.',
    fullDescription: 'Great design makes technology invisible. If you have an eye for beauty and want to shape how people interact with digital products, this is the career for you. Learn the complete design process from user research to high-fidelity prototypes - the exact workflow used at top design agencies and tech companies.',
    outcome: 'Job Ready',
    duration: '12 weeks',
    earningPotential: '$60k - $140k',
    level: 'beginner',
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems', 'Adobe XD', 'UI Animation', 'Wireframing', 'Usability Testing'],
    companies: ['Design Agencies', 'Tech Startups', 'Product Companies', 'E-commerce', 'Fintech'],
    projects: ['Mobile App Design', 'Website Redesign', 'Design System', 'UX Case Study'],
    color: 'from-pink-500 to-rose-600',
    gradient: 'pink',
    icon: (props: any) => <Sparkles {...props} />,
    roadmap: [
      { week: 'Weeks 1-2', title: 'Design Fundamentals', description: 'Typography, color, layout, and visual hierarchy' },
      { week: 'Weeks 3-4', title: 'Figma Mastery', description: 'Complete tool training for interface design' },
      { week: 'Weeks 5-6', title: 'UX Research', description: 'User interviews, personas, and journey mapping' },
      { week: 'Weeks 7-10', title: 'UI Design Projects', description: 'Build complete interfaces from wireframes to prototypes' },
      { week: 'Weeks 11-12', title: 'Portfolio Project', description: 'Complete UX case study for your portfolio' },
    ],
    stats: [
      { label: 'Average Starting Salary', value: '$75,000', icon: DollarSign },
      { label: 'Job Placement Rate', value: '89%', icon: Target },
      { label: 'Hiring Companies', value: '900+', icon: Building2 },
      { label: 'Projects Completed', value: '4', icon: Code },
    ],
    faqs: [
      { question: 'Do I need to be an artist?', answer: 'No! We teach the process and principles. Practice makes perfect.' },
      { question: 'What tools will I learn?', answer: 'Figma is the industry standard. We cover it completely.' },
      { question: 'Is a portfolio required?', answer: 'Yes! You will build 4 complete projects for your portfolio.' },
    ]
  },
  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    shortDesc: 'Help businesses grow online',
    description: 'Master online marketing strategies that drive real results for businesses.',
    fullDescription: 'Every business needs customers. Digital marketing is how they find them. Learn the complete toolkit of modern marketing - from SEO and content to paid ads and social media. This track teaches measurable, practical skills that deliver real business results.',
    outcome: 'Job Ready',
    duration: '10 weeks',
    earningPotential: '$50k - $100k',
    level: 'beginner',
    skills: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Analytics', 'Email Marketing', 'PPC', 'Conversion Optimization'],
    companies: ['Marketing Agencies', 'E-commerce', 'Startups', 'Brands', 'SaaS', 'Media'],
    projects: ['Marketing Campaign', 'SEO Strategy', 'Social Media Growth', 'Analytics Dashboard'],
    color: 'from-lime-500 to-green-600',
    gradient: 'lime',
    icon: (props: any) => <TrendingUp {...props} />,
    roadmap: [
      { week: 'Weeks 1-2', title: 'Digital Marketing Foundations', description: 'Understanding the marketing landscape and funnel' },
      { week: 'Weeks 3-4', title: 'SEO & Content', description: 'Search optimization and content strategy' },
      { week: 'Weeks 5-6', title: 'Paid Advertising', description: 'Google Ads, Meta Ads, and paid channels' },
      { week: 'Weeks 7-8', title: 'Social Media & Email', description: 'Organic growth and email marketing' },
      { week: 'Weeks 9-10', title: 'Analytics & Optimization', description: 'Measure, analyze, and optimize campaigns' },
    ],
    stats: [
      { label: 'Average Starting Salary', value: '$60,000', icon: DollarSign },
      { label: 'Job Placement Rate', value: '88%', icon: Target },
      { label: 'Hiring Companies', value: '1100+', icon: Building2 },
      { label: 'Projects Completed', value: '4', icon: Code },
    ],
    faqs: [
      { question: 'Is this good for beginners?', answer: 'Perfect! Start from basics and build up to advanced strategies.' },
      { question: 'Will I get certifications?', answer: 'Yes, Google Ads and Analytics certifications included.' },
      { question: 'Can I work remotely?', answer: 'Absolutely! Digital marketing is one of the most remote-friendly fields.' },
    ]
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

export default function CareerTrackDetailPage() {
  const params = useParams();
  const track = careerTracksData[params.id as string];

  if (!track) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-[#030712]">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-white">Track Not Found</h1>
            <Link href="/career-tracks" className="text-indigo-400 hover:text-indigo-300">
              ← Back to Career Tracks
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar variant="dark" />
      <main className="min-h-screen bg-[#030712]">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
            <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full blur-[100px]" style={{ backgroundColor: glowColors[track.gradient] }} />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 md:px-8 md:pt-32 md:pb-24">
            <Link 
              href="/career-tracks" 
              className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Career Tracks
            </Link>

            <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400`}>
                    <CheckCircle2 className="h-3 w-3" />
                    {track.outcome}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium ${
                    track.level === 'beginner' 
                      ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                      : track.level === 'intermediate'
                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}>
                    {track.level === 'beginner' ? 'Beginner Friendly' : track.level === 'intermediate' ? 'Intermediate' : 'Advanced'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-400">
                    <Clock className="h-3 w-3" />
                    {track.duration}
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {track.title}
                </h1>
                
                <p className="mb-8 text-xl leading-relaxed text-slate-300">
                  {track.fullDescription}
                </p>

                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="mb-1 text-sm text-slate-500">Salary Range</p>
                    <p className="text-2xl font-bold text-white">{track.earningPotential}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-500">Duration</p>
                    <p className="text-2xl font-bold text-white">{track.duration}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-500">Level</p>
                    <p className="text-2xl font-bold text-white capitalize">{track.level}</p>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md"
                style={{
                  boxShadow: `0 0 40px ${glowColors[track.gradient]}20`,
                }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${track.color}`}>
                    <track.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{track.title}</h3>
                    <p className="text-sm text-slate-400">{track.shortDesc}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {track.stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                        <stat.icon className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                        <p className="text-lg font-bold text-white">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/auth/signup"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-4 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                >
                  Enroll Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="px-6 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Tools You Will Master</h2>
              <p className="text-slate-400">These are the exact tools used by professionals in the field</p>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {track.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-3 backdrop-blur-md transition-all hover:border-slate-700 hover:bg-slate-800/80"
                >
                  <span className="text-base font-medium text-slate-200">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="px-6 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Your Learning Roadmap</h2>
              <p className="text-slate-400">A clear path from beginner to job-ready in {track.duration}</p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 md:left-1/2 md:-translate-x-px" />

              <div className="space-y-8">
                {track.roadmap.map((item, index) => (
                  <motion.div
                    key={item.week}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-start gap-6 md:gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 top-6 h-3 w-3 rounded-full bg-indigo-500 ring-4 ring-[#030712] md:left-1/2 md:-translate-x-1.5" />

                    {/* Content */}
                    <div className={`ml-12 flex-1 md:ml-0 md:w-[calc(50%-24px)] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md transition-all hover:border-slate-700">
                        <p className="mb-1 text-sm font-medium text-indigo-400">{item.week}</p>
                        <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                    </div>

                    {/* Spacer for other side */}
                    <div className="hidden md:block md:w-[calc(50%-24px)]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="px-6 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Projects You Will Build</h2>
              <p className="text-slate-400">Real portfolio pieces that prove your skills to employers</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {track.projects.map((project, index) => (
                <motion.div
                  key={project}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md transition-all hover:border-slate-700"
                  style={{
                    boxShadow: `0 0 30px ${glowColors[track.gradient]}10`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(135deg, ${glowColors[track.gradient]}10, transparent)` }} />
                  <div className="relative">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800">
                      <Play className="h-5 w-5 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{project}</h3>
                    <p className="mt-2 text-sm text-slate-400">A complete, portfolio-ready project</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring Companies */}
        <section className="px-6 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Companies That Hire {track.title}s</h2>
              <p className="text-slate-400">These companies actively recruit from our programs</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {track.companies.map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-4 backdrop-blur-md transition-all hover:border-slate-700 hover:bg-slate-800/80"
                >
                  <span className="text-base font-medium text-slate-300">{company}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="px-6 py-16 md:px-8">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Frequently Asked Questions</h2>
            </motion.div>

            <div className="space-y-4">
              {track.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md"
                >
                  <h3 className="mb-2 text-lg font-semibold text-white">{faq.question}</h3>
                  <p className="text-slate-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden px-6 py-24 md:px-8">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Start Your {track.title} Career Today
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-slate-400">
              Join the next cohort and transform your career in {track.duration}.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/auth/signup"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
              >
                Enroll Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/career-tracks"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-slate-600 hover:bg-slate-800"
              >
                View All Tracks
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="dark" />
    </>
  );
}