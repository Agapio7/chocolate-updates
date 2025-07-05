import React from 'react';
import ProductGrid from '../components/ProductGrid';

const Shop: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our Chocolate Collection
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover our complete range of handcrafted chocolates, from rich dark varieties to 
            creamy milk chocolates and elegant gift collections. Each piece is made with premium 
            ingredients and traditional techniques passed down through generations.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid />
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Quality Promise
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Every chocolate in our collection is handcrafted using only the finest ingredients. 
            We source our cacao from sustainable farms and use traditional techniques to ensure 
            each piece meets our exacting standards of quality and taste.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-900 mb-2">100%</div>
              <div className="text-gray-600">Premium Ingredients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-900 mb-2">25+</div>
              <div className="text-gray-600">Years of Expertise</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-900 mb-2">1000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;