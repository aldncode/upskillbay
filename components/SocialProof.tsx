'use client';

import { motion } from 'framer-motion';

const floatingCardVariants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const floatingCard2Variants = {
  initial: { y: 0 },
  animate: {
    y: [4, -4, 4],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const pillVariants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

export default function SocialProof() {
  const metrics = [
    { value: '2,400+', label: 'Projects Done', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { value: '₹12.5L', label: 'Earned', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', highlight: true },
    { value: '850+', label: 'Skills Mastered', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { value: '320+', label: 'Portfolios Built', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  const tools = [
    'React', 'Python', 'SQL', 'Figma', 'Node.js', 'Meta Ads', 'Tableau', 'Next.js'
  ];

  const avatars = [
    { initials: 'AK', color: 'bg-[#4F46E5]' },
    { initials: 'RJ', color: 'bg-[#7C3AED]' },
    { initials: 'MP', color: 'bg-[#059669]' },
    { initials: 'SK', color: 'bg-[#EA580C]' },
    { initials: 'DV', color: 'bg-[#0891B2]' },
  ];

  return (
    <section className="bg-[#F8FAFC] py-10 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#4F46E5]/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#7C3AED]/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* LEFT: Trust + Avatars */}
          <div className="lg:col-span-3 flex items-center gap-4">
            <div className="flex -space-x-2">
              {avatars.map((avatar, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${avatar.color} flex items-center justify-center text-[10px] font-bold text-white border-2 border-white`}
                >
                  {avatar.initials}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-[#0F172A]">1,000+ learners</p>
              <p className="text-[11px] text-[#64748B]">trust UpskillBay</p>
            </div>
          </div>

          {/* CENTER: Animated Metrics */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  variants={i % 2 === 0 ? floatingCardVariants : floatingCard2Variants}
                  initial="initial"
                  animate="animate"
                  className="relative"
                >
                  <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border backdrop-blur-sm ${
                    metric.highlight
                      ? 'bg-gradient-to-r from-[#EEF2FF] to-white border-[#C7D2FE] shadow-md shadow-indigo-500/10'
                      : 'bg-white/90 border-[#E2E8F0]'
                  }`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      metric.highlight
                        ? 'bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]'
                        : 'bg-[#F8FAFC]'
                    }`}>
                      <svg
                        className={`w-3.5 h-3.5 ${metric.highlight ? 'text-white' : 'text-[#4F46E5]'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={metric.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className={`text-sm font-black ${metric.highlight ? 'text-[#4F46E5]' : 'text-[#0F172A]'}`}>
                        {metric.value}
                      </p>
                      <p className="text-[10px] text-[#64748B] font-medium">{metric.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Tech Stack Pills */}
          <div className="lg:col-span-3 flex flex-wrap justify-center lg:justify-end gap-2">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                variants={pillVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#475569] bg-white border border-[#E2E8F0] hover:border-[#C7D2FE] hover:text-[#4F46E5] transition-colors cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
