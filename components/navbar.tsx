'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">CyberHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-foreground hover:text-primary transition">
              Services
            </Link>
            <Link href="#pricing" className="text-foreground hover:text-primary transition">
              Pricing
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* Auth Links */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/login"
              className="text-foreground hover:text-primary transition font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              href="#services"
              className="block text-foreground hover:text-primary transition py-2"
            >
              Services
            </Link>
            <Link
              href="#pricing"
              className="block text-foreground hover:text-primary transition py-2"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="block text-foreground hover:text-primary transition py-2"
            >
              Contact
            </Link>
            <div className="pt-3 border-t border-border space-y-2">
              <Link
                href="/login"
                className="block text-center text-foreground hover:text-primary transition font-medium py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block text-center bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
