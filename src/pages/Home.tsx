import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { Play } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      
      {/* YouTube Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Experience Our Chocolate Making Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch how we handcraft each piece of chocolate with passion and precision
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/StTqXEQ2l-Y"
                  title="Chocolate Making Process - FOREVER Mitho"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Video Overlay for styling */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Discover the artistry behind every chocolate creation
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Play className="mr-2" size={16} />
                  <span>Behind the Scenes</span>
                </div>
                <div>•</div>
                <div>Handcrafted Excellence</div>
                <div>•</div>
                <div>Premium Quality</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Features />
    </>
  );
};

export default Home;