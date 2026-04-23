import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: 'Premium Cotton Sarees',
    subtitle: 'Handcrafted with Love',
    description: 'Discover the elegance of traditional Indian craftsmanship with our exclusive collection of handwoven cotton sarees.',
    image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cta: 'Shop Cotton',
    link: '/sarees/cotton',
  },
  // {
  //   id: 2,
  //   title: 'Linen Collection',
  //   subtitle: 'Comfort Meets Style',
  //   description: 'Experience the perfect blend of comfort and sophistication with our premium linen sarees.',
  //   image: 'https://images.pexels.com/photos/3222073/pexels-photo-3222073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   cta: 'Explore Linen',
  //   link: '/sarees/linen',
  // },
  // {
  //   id: 3,
  //   title: 'New Arrivals',
  //   subtitle: 'Fresh Designs Just In',
  //   description: 'Be the first to explore our latest collection featuring contemporary designs with traditional roots.',
  //   image: 'https://images.pexels.com/photos/1096146/pexels-photo-1096146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   cta: 'View Collection',
  //   link: '/new-arrivals',
  // },
];

export default function Hero() {
  return (
    <section className="relative bg-[#E8EDF2]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="flex items-center px-8 py-12 lg:py-20">
            <div className="max-w-xl">
              <span className="inline-block px-4 py-1 bg-[#080616] text-white text-sm font-medium rounded-full mb-6">
                Handcrafted Excellence
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-[#080616] leading-tight mb-6">
                Premium Handwoven Sarees
              </h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Discover the timeless beauty of traditional Indian sarees. Each piece tells a story of skilled artisans and rich heritage, bringing elegance to your wardrobe.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/sarees"
                  className="inline-flex items-center px-8 py-3 bg-[#080616] text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-8 py-3 border-2 border-[#080616] text-[#080616] font-medium rounded-lg hover:bg-[#080616] hover:text-white transition-all duration-300"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="relative h-[500px] lg:h-auto">
            <div className="grid grid-cols-2 gap-4 p-4 h-full">
              {heroSlides.map((slide, index) => (
                <Link
                  key={slide.id}
                  to={slide.link}
                  className={`relative overflow-hidden rounded-2xl group ${
                    index === 0 ? 'col-span-2 row-span-1' : ''
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080616]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg">{slide.title}</h3>
                      <p className="text-white/80 text-sm">{slide.subtitle}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-[#080616] py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-white font-bold text-lg">100% Handwoven</p>
              <p className="text-gray-400 text-sm">Authentic Craftsmanship</p>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Free Shipping</p>
              <p className="text-gray-400 text-sm">Orders Above Rs. 2000</p>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Easy Returns</p>
              <p className="text-gray-400 text-sm">7-Day Return Policy</p>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Secure Payment</p>
              <p className="text-gray-400 text-sm">100% Secure Checkout</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
