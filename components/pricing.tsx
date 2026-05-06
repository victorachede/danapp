'use client';

const pricingData = [
  {
    service: 'NYSC Registration Assistance',
    price: '₦2,500',
    description: 'Complete guidance through the NYSC portal',
  },
  {
    service: 'Form Filling Service',
    price: '₦1,500 - ₦3,000',
    description: 'Depending on form complexity',
  },
  {
    service: 'Document Verification',
    price: '₦500 per document',
    description: 'Quick authentication service',
  },
  {
    service: 'Passport Photos (4 pieces)',
    price: '₦1,000',
    description: 'Instant printing included',
  },
  {
    service: 'Printing (B&W)',
    price: '₦50 per page',
    description: 'Standard paper quality',
  },
  {
    service: 'Printing (Color)',
    price: '₦200 per page',
    description: 'High-quality color printing',
  },
  {
    service: 'Scanning & Digitization',
    price: '₦100 per page',
    description: 'PDF or image format',
  },
  {
    service: 'Data Backup Service',
    price: '₦5,000 - ₦15,000',
    description: 'Based on data size',
  },
];

const paymentMethods = ['Card Payment', 'Bank Transfer', 'Mobile Money (MTN/Airtel)', 'Cash'];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Simple & Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            No hidden fees. All prices listed in Nigerian Naira (₦)
          </p>
        </div>

        {/* Pricing Table */}
        <div className="bg-white rounded-lg border border-border overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-card border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-foreground font-semibold">Service</th>
                  <th className="px-6 py-4 text-left text-foreground font-semibold">Price</th>
                  <th className="px-6 py-4 text-left text-foreground font-semibold hidden md:table-cell">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-border ${index % 2 === 0 ? 'bg-white' : 'bg-card'}`}
                  >
                    <td className="px-6 py-4 text-foreground font-medium">{item.service}</td>
                    <td className="px-6 py-4 text-primary font-bold">{item.price}</td>
                    <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6">Payment Methods</h3>
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-foreground">{method}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">💡 Tip</h3>
            <p className="text-muted-foreground">
              Bulk printing and document services available at discounted rates. Contact us for bulk order quotes!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
