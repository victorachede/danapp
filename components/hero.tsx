'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Your Trusted Cyber Cafe Experience
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Professional online services including NYSC registration, document handling, printing, and more. 
          Everything you need in one convenient location.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#services"
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
          >
            Explore Services <ArrowRight size={20} />
          </Link>
          <Link
            href="/register"
            className="border-2 border-primary text-primary px-8 py-3 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            Get Started
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
            <p className="text-muted-foreground text-sm md:text-base mt-2">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">24/7</p>
            <p className="text-muted-foreground text-sm md:text-base mt-2">Available</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">8+</p>
            <p className="text-muted-foreground text-sm md:text-base mt-2">Services</p>
          </div>
        </div>
      </div>
    </section>
  );
}
