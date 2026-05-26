import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    title: 'Premium Cotton Sarees',
    subtitle: 'Elegant Handcrafted Collection',
    bgColor: '#F7F3EE',
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
    bgColor: '#F5EEE6',
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
    bgColor: '#F3F0EA',
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
      {/* Premium Background Blur */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#D4B996]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#080616]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-[#080616] text-white text-sm rounded-full tracking-wide shadow-lg">
              ✨ Handcrafted Luxury Collection
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold leading-[0.95] text-[#080616] mb-6 uppercase">
              {activeSlide.title}
            </h1>

            <p className="text-lg lg:text-xl text-[#080616]/70 mb-10 leading-relaxed max-w-xl">
              {activeSlide.subtitle}
              <br />
              Discover timeless elegance crafted by skilled artisans.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link
                to={activeSlide.link}
                className="
                  inline-flex 
                  items-center 
                  gap-2 
                  px-8 
                  py-4 
                  bg-[#080616] 
                  text-white 
                  rounded-full 
                  hover:scale-105 
                  hover:bg-black
                  transition-all 
                  duration-300
                  shadow-xl
                "
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/about"
                className="
                  inline-flex 
                  items-center 
                  gap-2 
                  px-8 
                  py-4 
                  border-2 
                  border-[#080616] 
                  text-[#080616] 
                  rounded-full 
                  hover:bg-[#080616] 
                  hover:text-white 
                  transition-all 
                  duration-300
                "
              >
                Our Story
              </Link>
            </div>

            {/* Premium Stats */}
            <div className="flex gap-10 mt-12 flex-wrap">
              <div>
                <h3 className="text-3xl font-bold text-[#080616]">5000+</h3>
                <p className="text-sm text-[#080616]/60 mt-1">
                  Happy Customers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#080616]">100+</h3>
                <p className="text-sm text-[#080616]/60 mt-1">
                  Premium Designs
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#080616]">4.9★</h3>
                <p className="text-sm text-[#080616]/60 mt-1">
                  Customer Rating
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className="relative h-[560px] flex items-center justify-center">

            {/* Glow */}
            <div className="absolute w-[420px] h-[420px] bg-white/50 rounded-full blur-3xl" />

            {/* Left Small Image */}
            <div className="
              absolute 
              left-0 
              top-24 
              w-44 
              h-60 
              rounded-[30px] 
              overflow-hidden 
              shadow-2xl 
              border-[6px] 
              border-white 
              rotate-[-8deg]
              hover:scale-105 
              transition-all 
              duration-500
            ">
              <img
                src={activeSlide.images[0]}
                alt="Saree"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Center Big Image */}
            <div className="
              relative 
              z-10 
              w-[360px] 
              h-[470px] 
              rounded-[45px] 
              overflow-hidden 
              shadow-[0_25px_80px_rgba(0,0,0,0.25)] 
              border-[8px] 
              border-white
              hover:scale-105 
              transition-all 
              duration-500
            ">
              <img
                src={activeSlide.images[1]}
                alt="Main Saree"
                className="w-full h-full object-cover"
              />

              {/* Premium Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm uppercase tracking-[3px] mb-1">
                  Luxury Collection
                </p>

                <h3 className="text-2xl font-bold">
                  BAGRU COTTON FEB
                </h3>
              </div>
            </div>

            {/* Right Small Image */}
            <div className="
              absolute 
              right-0 
              bottom-20 
              w-44 
              h-60 
              rounded-[30px] 
              overflow-hidden 
              shadow-2xl 
              border-[6px] 
              border-white 
              rotate-[8deg]
              hover:scale-105 
              transition-all 
              duration-500
            ">
              <img
                src={activeSlide.images[2]}
                alt="Collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* SLIDER DOTS */}
        <div className="flex justify-center gap-3 mt-16">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
                h-3 rounded-full transition-all duration-300
                ${currentSlide === index
                  ? 'w-12 bg-[#080616]'
                  : 'w-3 bg-[#080616]/30 hover:bg-[#080616]/50'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md border-t border-black/5 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">

            <div className="group">
              <img
                src="/handcrafted/block-1.svg"
                alt="Natural Prints"
                className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform"
              />
              <p className="font-medium text-[#080616]">
                Natural Prints
              </p>
            </div>

            <div className="group">
              <img
                src="/handcrafted/block-2.svg"
                alt="Women Crafted"
                className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform"
              />
              <p className="font-medium text-[#080616]">
                For Women By Women
              </p>
            </div>

            <div className="group">
              <img
                src="/handcrafted/block-3.svg"
                alt="Hand Crafted"
                className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform"
              />
              <p className="font-medium text-[#080616]">
                Hand Crafted
              </p>
            </div>

            <div className="group">
              <img
                src="/handcrafted/block-4.svg"
                alt="Fast Delivery"
                className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform"
              />
              <p className="font-medium text-[#080616]">
                Fast Delivery
              </p>
            </div>

            <div className="group">
              <img
                src="/handcrafted/block-5.svg"
                alt="Loved"
                className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform"
              />
              <p className="font-medium text-[#080616]">
                Loved By Customers
              </p>
            </div>

            <div className="group">
              <img
                src="/handcrafted/block-6.svg"
                alt="Luxury"
                className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform"
              />
              <p className="font-medium text-[#080616]">
                Affordable Luxury
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}