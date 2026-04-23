import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080616] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">BAGRU COTTON FEB</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Premium handwoven sarees crafted with love by skilled artisans. Experience the beauty of traditional Indian textiles.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/sarees" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Sarees Collection
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-400 hover:text-white text-sm transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sarees/cotton" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cotton Sarees
                </Link>
              </li>
              <li>
                <Link to="/sarees/linen" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Linen Sarees
                </Link>
              </li>
              <li>
                <Link to="/sarees/kotadorya" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Kotadorya Sarees
                </Link>
              </li>
              <li>
                <Link to="/sarees/mahsrfe" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Mahsrfe Sarees
                </Link>
              </li>
              <li>
                <Link to="/sarees/handblo" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Handblo Sarees
                </Link>
              </li>
              <li>
                <Link to="/sarees/khafi" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Khafi Sarees
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Textile Market, Bagru, Jaipur, Rajasthan 303007
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@bagrucottonfeb.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 BAGRU COTTON FEB. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
