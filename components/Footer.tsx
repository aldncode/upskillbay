'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F1F5F9] py-20 md:py-24">
      <div className="container">
        <div className="mb-16 grid gap-12 md:grid-cols-4 md:gap-16">
          <div>
            <h3 className="mb-6 text-2xl font-black tracking-tight text-[#0F172A]">
              UpskillBay
            </h3>
            <p className="text-sm leading-6 text-[#475569]">Build skills. Earn income. Get hired.</p>
          </div>

          <div>
            <h4 className="mb-6 font-semibold text-[#0F172A]">Product</h4>
            <ul className="space-y-4 text-sm font-medium text-[#475569]">
              <li><Link href="/career-tracks" className="transition-colors hover:text-[#4F46E5]">Career Tracks</Link></li>
              <li><Link href="/gigs" className="transition-colors hover:text-[#4F46E5]">Projects</Link></li>
              <li><Link href="#" className="transition-colors hover:text-[#4F46E5]">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-semibold text-[#0F172A]">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-[#475569]">
              <li><Link href="#" className="transition-colors hover:text-[#4F46E5]">About</Link></li>
              <li><Link href="#" className="transition-colors hover:text-[#4F46E5]">Blog</Link></li>
              <li><Link href="#" className="transition-colors hover:text-[#4F46E5]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-semibold text-[#0F172A]">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-[#475569]">
              <li><Link href="#" className="transition-colors hover:text-[#4F46E5]">Terms</Link></li>
              <li><Link href="#" className="transition-colors hover:text-[#4F46E5]">Privacy</Link></li>
              <li><Link href="#" className="transition-colors hover:text-[#4F46E5]">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#CBD5E1] pt-10">
          <div className="flex flex-col items-center justify-between gap-6 text-sm font-medium text-[#64748B] md:flex-row">
            <p>&copy; 2024 UpskillBay. All rights reserved.</p>

            <div className="flex gap-8">
              <a href="#" className="transition-colors hover:text-[#4F46E5]">Twitter</a>
              <a href="#" className="transition-colors hover:text-[#4F46E5]">LinkedIn</a>
              <a href="#" className="transition-colors hover:text-[#4F46E5]">Discord</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
