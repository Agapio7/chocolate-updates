import React from 'react';
import { Truck, Shield, Award, Clock } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Express delivery through our trusted partner network nationwide'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Only the finest ingredients sourced from sustainable farms worldwide'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Award Winning',
      description: 'Recognized by international chocolate connoisseurs and critics'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Fresh Made',
      description: 'Handcrafted daily in small batches to ensure maximum freshness'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose FOREVER Mitho?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering the finest chocolate experience with unmatched quality and service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
                <div className="text-yellow-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;