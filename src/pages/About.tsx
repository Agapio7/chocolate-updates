import React from 'react';
import { Heart, Award, Users, Leaf } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Made with Love',
      description: 'Every chocolate is handcrafted with passion and attention to detail by our skilled artisans.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'We source only the finest cacao beans and ingredients from sustainable farms worldwide.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Family Tradition',
      description: 'Our recipes have been passed down through generations, perfected over decades of craftsmanship.'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Sustainable Sourcing',
      description: 'We are committed to ethical sourcing and supporting farming communities around the globe.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-50 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Our Sweet Story
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Founded in the heart of Lalitpur, FOREVER Mitho began as a small family business with a simple dream: 
                to create the world's most exquisite chocolates using traditional techniques and premium ingredients.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we continue that legacy, handcrafting each piece with the same passion and dedication that 
                started our journey. Every bite tells a story of tradition, quality, and the pursuit of chocolate perfection.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3992206/pexels-photo-3992206.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Chocolate making process"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-amber-900">25+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Special
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence goes beyond just making chocolates - it's about creating experiences and memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors duration-300">
                  <div className="text-amber-600">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Master Chocolatiers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The talented artisans behind every delicious creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Shrestha',
                role: 'Master Chocolatier',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'With over 20 years of experience, Rajesh leads our chocolate creation process with unmatched expertise.'
              },
              {
                name: 'Sita Maharjan',
                role: 'Head of Quality',
                image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Sita ensures every piece meets our highest standards of quality and taste perfection.'
              },
              {
                name: 'Arjun Tamang',
                role: 'Innovation Chef',
                image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
                description: 'Arjun creates new flavors and techniques, pushing the boundaries of chocolate artistry.'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-amber-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-amber-900 to-yellow-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Our Mission
          </h2>
          <p className="text-xl leading-relaxed mb-8">
            "To create extraordinary chocolate experiences that bring joy, celebrate special moments, 
            and connect people through the universal language of sweetness. We believe that every piece 
            of chocolate should be a moment of pure bliss."
          </p>
          <div className="flex justify-center">
            <div className="bg-white bg-opacity-20 rounded-full px-8 py-3">
              <span className="text-lg font-semibold">Est. 1999 • Lalitpur, Nepal</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;