import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react';
import Hero from '../components/Hero';
import Reviews from '../components/Reviews';

const categories = [
  {
    name: 'Cotton',
    image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 45,
  },
  {
    name: 'Linen',
    image: 'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 32,
  },
  {
    name: 'Kotadorya',
    image: 'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 28,
  },
  {
    name: 'Mahsrfe',
    image: 'https://images.pexels.com/photos/7679459/pexels-photo-7679459.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 19,
  },
  {
    name: 'Handblo',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 36,
  },
  {
    name: 'Khafi',
    image: 'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 24,
  },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Royal Blue Cotton Saree',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Cotton',
  },
  {
    id: 2,
    name: 'Elegant Linen Saree',
    price: 3299,
    originalPrice: 3999,
    image: 'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Linen',
  },
  {
    id: 3,
    name: 'Traditional Kotadorya',
    price: 2799,
    originalPrice: 3499,
    image: 'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Kotadorya',
  },
  {
    id: 4,
    name: 'Handblock Print Saree',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Handblo',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#080616] mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse collection of handwoven sarees, each category offering unique craftsmanship and designs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/sarees/${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080616]/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[#E8EDF2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#080616] mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">Handpicked bestsellers loved by our customers</p>
            </div>
            <Link
              to="/sarees"
              className="hidden md:flex items-center gap-2 text-[#080616] font-medium hover:underline"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#080616] text-white text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      SALE
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#080616] mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#080616]">Rs. {product.price}</span>
                    <span className="text-sm text-gray-400 line-through">Rs. {product.originalPrice}</span>
                  </div>
                  <button className="w-full mt-4 py-2 bg-[#080616] text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/sarees"
              className="inline-flex items-center gap-2 text-[#080616] font-medium"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#080616] mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are committed to providing you with the finest handwoven sarees and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-[#E8EDF2]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#080616] flex items-center justify-center">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#080616] mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Enjoy free shipping on all orders above Rs. 2000. We deliver across India.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-[#E8EDF2]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#080616] flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#080616] mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Every saree undergoes strict quality checks to ensure you receive only the best.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-[#E8EDF2]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#080616] flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#080616] mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                Not satisfied? Return within 7 days for a full refund. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Newsletter */}
      <section className="py-16 bg-[#080616]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Get updates on new arrivals, exclusive offers, and styling tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-[#080616] font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
