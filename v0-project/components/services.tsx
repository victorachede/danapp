'use client';

import {
  FileText,
  Printer,
  Scan,
  HardDrive,
  Shield,
  Camera,
  Clock,
  Award,
} from 'lucide-react';

const services = [
  {
    icon: FileText,
    title: 'NYSC Registration',
    description: 'Complete assistance with NYSC registration and documentation processes.',
  },
  {
    icon: FileText,
    title: 'Form Filling',
    description: 'Expert help with government forms, applications, and official documents.',
  },
  {
    icon: Shield,
    title: 'Document Verification',
    description: 'Secure verification and authentication of your important documents.',
  },
  {
    icon: Camera,
    title: 'Passport Photos',
    description: 'Professional passport and ID photo services with instant printing.',
  },
  {
    icon: Printer,
    title: 'Printing Services',
    description: 'High-quality printing for documents, posters, and more. Colored and B&W available.',
  },
  {
    icon: Scan,
    title: 'Scanning & Digitization',
    description: 'Convert physical documents to digital format with high-quality scanning.',
  },
  {
    icon: HardDrive,
    title: 'Data Backup',
    description: 'Secure backup and storage solutions for your important files and data.',
  },
  {
    icon: Award,
    title: 'Certificate Services',
    description: 'Printing and lamination of certificates and official documents.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Comprehensive solutions for all your online and document service needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition hover:border-primary"
              >
                <div className="mb-4 inline-block p-3 bg-blue-100 rounded-lg">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
