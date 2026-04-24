'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[#1F2937] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo / Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] bg-clip-text text-transparent mb-4">
              UpskillBay
            </h3>
            <p className="text-[#9CA3AF] text-sm">Build skills. Earn income. Get hired.</p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li><Link href="/capsules" className="hover:text-white transition-colors">Career Tracks</Link></li>
              <li><Link href="/gigs" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1F2937] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#9CA3AF]">
            <p>&copy; 2024 UpskillBay. All rights reserved.</p>

            {/* Social Links */}
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
