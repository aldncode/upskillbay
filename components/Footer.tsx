'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white py-14">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-[#111827]">
              UpskillBay
            </h3>
            <p className="text-sm leading-6 text-[#6B7280]">Build skills. Earn income. Get hired.</p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-[#111827]">Product</h4>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li><Link href="/career-tracks" className="hover:text-[#4F46E5] transition-colors">Career Tracks</Link></li>
              <li><Link href="/gigs" className="hover:text-[#4F46E5] transition-colors">Projects</Link></li>
              <li><Link href="#" className="hover:text-[#4F46E5] transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-[#111827]">Company</h4>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li><Link href="#" className="hover:text-[#4F46E5] transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-[#4F46E5] transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-[#4F46E5] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-[#111827]">Legal</h4>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li><Link href="#" className="hover:text-[#4F46E5] transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-[#4F46E5] transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-[#4F46E5] transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-[#6B7280] md:flex-row">
            <p>&copy; 2024 UpskillBay. All rights reserved.</p>

            <div className="flex gap-6">
              <a href="#" className="hover:text-[#4F46E5] transition-colors">Twitter</a>
              <a href="#" className="hover:text-[#4F46E5] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[#4F46E5] transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
