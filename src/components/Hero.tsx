import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: 'Premium Cotton Sarees',
    subtitle: 'Elegant Handcrafted Collection',
    bgColor: '#E8D9E8',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610189020382-668f692b5b2f?q=80&w=1200&auto=format&fit=crop',
    ],
    link: '/sarees',
  },

  {
    id: 2,
    title: 'Bagru Handblock Prints',
    subtitle: 'Traditional Art With Modern Style',
    bgColor: '#F5E6D3',
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618244972963-dbad68f7d884?q=80&w=1200&auto=format&fit=crop',
    ],
    link: '/new-arrivals',
  },

  {
    id: 3,
    title: 'Luxury Silk Sarees',
    subtitle: 'Royal & Timeless Beauty',
    bgColor: '#DAD5F5',
    images: [
      'https://images.unsplash.com/photo-1603251579431-8041402bdeda?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469668-8e4d58b93b84?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
    ],
    link: '/sarees',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = heroSlides[currentSlide];

  return (
    <section
      className="relative overflow-hidden transition-all duration-700"
      style={{ backgroundColor: activeSlide.bgColor }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="inline-block mb-5 px-5 py-2 bg-black text-white text-sm rounded-full tracking-wide">
              Handcrafted Collection
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold leading-[0.95] text-black mb-6 uppercase">
              {activeSlide.title}
            </h1>

            <p className="text-lg text-black/70 mb-8 tracking-wide">
              {activeSlide.subtitle}
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link
                to={activeSlide.link}
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:scale-105 transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className="relative h-[500px] flex items-center justify-center">

            {/* Left Small Image */}
            <div className="absolute left-0 top-24 w-44 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-[-6deg] hover:scale-105 transition-all duration-500">
              <img
                src={activeSlide.images[0]}
                alt="Saree"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Center Big Image */}
            <div className="relative z-10 w-[340px] h-[430px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white hover:scale-105 transition-all duration-500">
              <img
                src={activeSlide.images[1]}
                alt="Main Saree"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Small Image */}
            <div className="absolute right-0 bottom-20 w-44 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-[6deg] hover:scale-105 transition-all duration-500">
              <img
                src={activeSlide.images[2]}
                alt="Collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* SLIDER DOTS */}
        <div className="flex justify-center gap-3 mt-12">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${currentSlide === index
                  ? 'w-10 bg-black'
                  : 'w-3 bg-black/30'
                }`}
            />
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="bg-white py-10 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">

            <div>
              <img
                src="/handcrafted/block-1.svg"
                alt="Hand Crafted"
                className="w-12 h-12 mx-auto mb-2"
              />
              <p className="font-medium">Natural Prints</p>
            </div>

            <div>
              <img
                src="/handcrafted/block-2.svg"
                alt="Hand Crafted"
                className="w-12 h-12 mx-auto mb-2"
              />
              <p className="font-medium">For Women By Women</p>
            </div>

            <div>
              <img
                src="/handcrafted/block-3.svg"
                alt="Hand Crafted"
                className="w-12 h-12 mx-auto mb-2"
              />
              <p className="font-medium">Hand Crafted</p>
            </div>

            <div>
              <img
                src="/handcrafted/block-4.svg"
                alt="Hand Crafted"
                className="w-12 h-12 mx-auto mb-2"
              />
              <p className="font-medium">Fast Delivery</p>
            </div>

            <div>
              <img
                src="/handcrafted/block-5.svg"
                alt="Hand Crafted"
                className="w-12 h-12 mx-auto mb-2"
              />
              <p className="font-medium">Loved By Customers</p>
            </div>

            <div>
              <img
                src="/handcrafted/block-6.svg"
                alt="Hand Crafted"
                className="w-12 h-12 mx-auto mb-2"
              />
              <p className="font-medium">Affordable Luxury</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}