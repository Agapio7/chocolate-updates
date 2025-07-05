import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { Product } from '../types';

interface ProductGridProps {
  featured?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ featured = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    featured ? products.slice(0, 6) : products
  );

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'dark', name: 'Dark Chocolate' },
    { id: 'milk', name: 'Milk Chocolate' },
    { id: 'white', name: 'White Chocolate' },
    { id: 'gift-boxes', name: 'Gift Boxes' }
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredProducts(featured ? products.slice(0, 6) : products);
    } else {
      const filtered = products.filter(product => product.category === categoryId);
      setFilteredProducts(featured ? filtered.slice(0, 6) : filtered);
    }
  };

  if (featured) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Our Premium Collection
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of premium chocolates crafted with the finest ingredients
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-yellow-100 hover:text-yellow-800'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </>
  );
};

export default ProductGrid;