import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Truck,
  Shield,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

import Hero from '../components/Hero';
import Reviews from '../components/Reviews';

const categories = [
  {
    name: 'Cotton Mulmul Sarees',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipMWdrcRxl_1Q3LZVgPuAF_hfKqXHag68TpCWWX1=s1360-w1360-h1020-rw',
    count: 150,
  },
  {
    name: 'Handblock Printed Cotton Sarees',
    image:
      'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 32,
  },
  {
    name: 'Linen Cotton Sarees',
    image:
      'https://lh3.googleusercontent.com/p/AF1QipNF9nYIKTUNryxQdahOKe3Jhd6WHLSK7zbRz4S-=s1360-w1360-h1020-rw',
    count: 28,
  },
  {
    name: 'Kota Doria Sarees',
    image:
      'https://images.pexels.com/photos/7679459/pexels-photo-7679459.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 19,
  },
  {
    name: 'Chanderi Bagru Sarees',
    image:
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 36,
  },
  {
    name: 'Maheshwari Silk Sarees',
    image:
      'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 24,
  },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Cotton Mulmul Saree',
    price: 2499,
    originalPrice: 2999,
    image:
      'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Cotton',
  },
  {
    id: 2,
    name: 'Handblock Printed Saree',
    price: 3299,
    originalPrice: 3999,
    image:
      'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Handblock',
  },
  {
    id: 3,
    name: 'Kota Doria Saree',
    price: 2799,
    originalPrice: 3499,
    image:
      'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Kota Doria',
  },
  {
    id: 4,
    name: 'Maheshwari Silk Saree',
    price: 1999,
    originalPrice: 2499,
    image:
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Silk',
  },
];

export default function Home() {
  return (
    <div className="bg-[#FAFAFA] overflow-hidden">
      {/* Hero */}
      <Hero />

      {/* Offer Banner */}
      <section className="bg-[#080616] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-sm md:text-base font-medium text-center">
          <Sparkles className="w-5 h-5" />
          Free Shipping on Orders Above ₹2000 ✨
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[4px] text-gray-500 mb-3">
              Collections
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold text-[#080616] mb-4">
              Shop by Category
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover timeless handcrafted sarees made
              with tradition, elegance, and love.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/sarees/${category.name}`}
                className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-md"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg leading-tight">
                    {category.name}
                  </h3>

                  <p className="text-white/80 text-sm mt-1">
                    {category.count} Products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-14 gap-6">
            <div>
              <p className="text-sm uppercase tracking-[4px] text-gray-500 mb-3">
                Trending
              </p>

              <h2 className="text-4xl lg:text-5xl font-bold text-[#080616] mb-3">
                Featured Products
              </h2>

              <p className="text-gray-600 text-lg">
                Handpicked premium sarees loved by our customers
              </p>
            </div>

            <Link
              to="/sarees"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#080616] text-white hover:bg-black transition-all duration-300"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1 bg-[#080616] text-white text-xs rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-1 bg-red-500 text-white text-xs rounded-full">
                      SALE
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg text-[#080616] mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-2xl font-bold text-[#080616]">
                      ₹{product.price}
                    </span>

                    <span className="text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-[#080616] text-white font-medium hover:bg-black transition-all duration-300 hover:scale-[1.02]">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[4px] text-gray-500 mb-3">
              Our Promise
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold text-[#080616] mb-4">
              Why Choose Us
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We deliver premium handcrafted sarees with trust,
              elegance, and unmatched quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card */}
            <div className="bg-[#F8F8FA] rounded-3xl p-10 text-center hover:shadow-xl transition duration-300">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#080616] flex items-center justify-center">
                <Truck className="w-9 h-9 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#080616] mb-3">
                Free Shipping
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Free delivery on all orders above ₹2000 across India.
              </p>
            </div>

            <div className="bg-[#F8F8FA] rounded-3xl p-10 text-center hover:shadow-xl transition duration-300">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#080616] flex items-center justify-center">
                <Shield className="w-9 h-9 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#080616] mb-3">
                Premium Quality
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Every saree is carefully handcrafted and quality checked.
              </p>
            </div>

            <div className="bg-[#F8F8FA] rounded-3xl p-10 text-center hover:shadow-xl transition duration-300">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#080616] flex items-center justify-center">
                <RefreshCw className="w-9 h-9 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-[#080616] mb-3">
                Easy Returns
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Hassle-free 7 day return policy for customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />
    </div>
  );
}