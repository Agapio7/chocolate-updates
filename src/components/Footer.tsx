import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="text-2xl font-bold mb-4">
              FOREVER<span className="text-yellow-400">Mitho</span>
            </div>
            <p className="text-gray-400 mb-4">
              Premium handcrafted chocolates made with love and the finest ingredients from around the world.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                <Facebook size={20} />
              </button>
              <button className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                <Instagram size={20} />
              </button>
              <button className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                <Twitter size={20} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  Corporate Gifts
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="mr-3 text-yellow-400" size={16} />
                <span className="text-gray-400 text-sm">शिव टोल, ललितपुर 44700</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-yellow-400" size={16} />
                <span className="text-gray-400 text-sm">982-8567365</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 text-yellow-400" size={16} />
                <span className="text-gray-400 text-sm">hello@forevermitho.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 FOREVER Mitho. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;