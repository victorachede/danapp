'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-foreground text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold">C</span>
              </div>
              <span className="font-bold text-lg">CyberHub</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for professional online services and document solutions.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#services" className="hover:text-white transition">NYSC Registration</Link></li>
              <li><Link href="#services" className="hover:text-white transition">Document Services</Link></li>
              <li><Link href="#services" className="hover:text-white transition">Printing</Link></li>
              <li><Link href="#services" className="hover:text-white transition">Data Backup</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition">FAQs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-white transition">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2024 CyberHub. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition">Facebook</Link>
              <Link href="#" className="hover:text-white transition">Twitter</Link>
              <Link href="#" className="hover:text-white transition">Instagram</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
