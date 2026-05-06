'use client';

import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Chioma Okafor',
    rating: 5,
    comment: 'Excellent service! The NYSC registration assistance was smooth and hassle-free. Highly recommended!',
    service: 'NYSC Registration',
  },
  {
    name: 'Tunde Adeyemi',
    rating: 5,
    comment: 'Fast printing service and friendly staff. My documents were ready in minutes!',
    service: 'Printing Service',
  },
  {
    name: 'Aderonke Igwe',
    rating: 4,
    comment: 'Great customer service and affordable pricing. Will definitely return!',
    service: 'Document Verification',
  },
  {
    name: 'Emeka Nkosi',
    rating: 5,
    comment: 'Professional passport photo service. They got it right on the first try!',
    service: 'Passport Photos',
  },
  {
    name: 'Blessing Obi',
    rating: 5,
    comment: 'Saved me so much time with the data backup service. Very reliable!',
    service: 'Data Backup',
  },
  {
    name: 'Ifeanyi Ukaegbu',
    rating: 4,
    comment: 'Good location, clean environment, and professional service. 10/10',
    service: 'General Service',
  },
];

export function Reviews() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Real feedback from real customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground mb-4 italic">{`"${review.comment}"`}</p>

              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
