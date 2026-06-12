import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Truck,
  Shield,
  RefreshCw,
  Sparkles,
  Heart,
} from 'lucide-react';

import Hero from '../components/Hero';
import Reviews from '../components/Reviews';
import { sareeCategories } from '../data/sareeCategories';

const categoryImages: Record<string, { image: string; count: number }> = {
  'cotton-mulmul': {
    image:
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 150,
  },
  handblock: {
    image:
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 32,
  },
  'linen-cotton': {
    image:
      'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 28,
  },
  'kota-doria': {
    image:
      'https://images.pexels.com/photos/7679459/pexels-photo-7679459.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 19,
  },
  'chanderi-bagru': {
    image:
      'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 36,
  },
  'maheshwari-silk': {
    image:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    count: 24,
  },
};

const featuredProducts = [
  {
    id: 1,
    name: 'Royal Mulmul Saree',
    price: 2499,
    originalPrice: 3499,
    image:
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Cotton',
  },
  {
    id: 2,
    name: 'Bagru Handblock Saree',
    price: 3299,
    originalPrice: 4299,
    image:
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Handblock',
  },
  {
    id: 3,
    name: 'Elegant Kota Doria',
    price: 2899,
    originalPrice: 3899,
    image:
      'https://images.pexels.com/photos/7679459/pexels-photo-7679459.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Kota Doria',
  },
  {
    id: 4,
    name: 'Premium Silk Saree',
    price: 4599,
    originalPrice: 5599,
    image:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Silk',
  },
];

export default function Home() {
  return (
    <div className="bg-[#F9F6F1] overflow-hidden">
      {/* Hero */}
      <Hero />

      {/* Premium Banner */}
      <section className="bg-gradient-to-r from-[#080616] via-[#1B142D] to-[#080616] text-white py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-sm md:text-base font-medium tracking-wide">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Luxury Handcrafted Sarees • Free Shipping Above ₹2000
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[5px] uppercase text-[#9A8478] mb-4">
              Collections
            </p>

            <h2 className="text-4xl lg:text-6xl font-bold text-[#080616] mb-5">
              Shop by Category
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Discover timeless elegance woven by skilled artisans with love,
              heritage, and craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {sareeCategories.map((category) => {
              const meta = categoryImages[category.slug];
              return (
                <Link
                  key={category.slug}
                  to={`/sarees/${category.slug}`}
                  className="group relative rounded-[30px] overflow-hidden aspect-[3/4] shadow-lg"
                >
                  <img
                    src={meta.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute bottom-5 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg leading-tight">
                      {category.name.replace(' Sarees', '')}
                    </h3>

                    <p className="text-white/70 text-sm mt-1">
                      {meta.count} Products
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-[#F3EEE7]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
            <div>
              <p className="text-sm tracking-[5px] uppercase text-[#9A8478] mb-4">
                Best Sellers
              </p>

              <h2 className="text-4xl lg:text-6xl font-bold text-[#080616] mb-4">
                Featured Products
              </h2>

              <p className="text-gray-600 text-lg">
                Handpicked luxury sarees crafted for elegance ✨
              </p>
            </div>

            <Link
              to="/sarees"
              className="flex items-center gap-2 px-7 py-3 rounded-full bg-[#080616] text-white hover:bg-black transition-all duration-300 shadow-lg"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-[30px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm hover:bg-white">
                    <Heart className="w-5 h-5 text-[#080616]" />
                  </button>

                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1 rounded-full bg-[#080616] text-white text-xs tracking-wide">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#080616] mb-3">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl font-bold text-[#080616]">
                      ₹{product.price}
                    </span>

                    <span className="text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>

                  <button className="w-full py-3 rounded-2xl bg-[#080616] text-white font-medium hover:bg-black transition-all duration-300 hover:scale-[1.02]">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#F9F6F1]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[5px] uppercase text-[#9A8478] mb-4">
              Why Us
            </p>

            <h2 className="text-4xl lg:text-6xl font-bold text-[#080616] mb-5">
              Luxury Experience
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Every saree reflects elegance, premium craftsmanship, and timeless beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="w-9 h-9 text-white" />,
                title: 'Free Shipping',
                desc: 'Enjoy free shipping across India on premium orders.',
              },
              {
                icon: <Shield className="w-9 h-9 text-white" />,
                title: 'Premium Quality',
                desc: 'Every saree is handcrafted and carefully quality checked.',
              },
              {
                icon: <RefreshCw className="w-9 h-9 text-white" />,
                title: 'Easy Returns',
                desc: 'Simple and hassle-free return process within 7 days.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] p-10 text-center shadow-md hover:shadow-2xl transition duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#080616] flex items-center justify-center shadow-lg">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-[#080616] mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />
    </div>
  );
}