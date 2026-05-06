'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut, User, BookOpen, FileText, Printer } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const email = localStorage.getItem('userEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || !email) {
      router.push('/login');
    } else {
      setUserEmail(email);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">CyberHub</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Welcome</p>
              <p className="font-medium text-foreground">{userEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your services and bookings</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Bookings</p>
            <p className="text-3xl font-bold text-foreground">5</p>
          </div>
          <div className="bg-white border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Completed Services</p>
            <p className="text-3xl font-bold text-primary">3</p>
          </div>
          <div className="bg-white border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-accent">₦8,500</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, title: 'NYSC Registration', desc: 'Start registration' },
              { icon: FileText, title: 'Form Filling', desc: 'Fill out forms' },
              { icon: Printer, title: 'Printing', desc: 'Print documents' },
              { icon: User, title: 'Profile Settings', desc: 'Update profile' },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <button
                  key={index}
                  className="bg-white border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary transition text-left"
                >
                  <div className="mb-4 inline-block p-3 bg-blue-100 rounded-lg">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { date: 'Today', action: 'Printing service completed', amount: '₦2,000' },
              { date: 'Yesterday', action: 'Document verification', amount: '₦500' },
              { date: '2 days ago', action: 'Passport photos printed', amount: '₦1,000' },
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center pb-4 border-b border-border last:border-b-0 last:pb-0">
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
                <p className="font-semibold text-primary">{activity.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
