import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Leaf, 
  Users, 
  Hand, 
  Scissors, 
  Heart, 
  Coins 
} from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    collection: "Atelier Sanchayan",
    title: "Crafted by Skilled Artisans",
    subtitle: "Jaipur ke dil se buna hua, paramparik summer drapes ka sacha aur suhavna anubhav.",
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1600&auto=format&fit=crop',
    link: '/sarees',
  },
  {
    id: 2,
    collection: "Sanskriti Block Prints",
    title: "Authentic Bagru Karigari",
    subtitle: "Lakdi ke blocks aur prakritik rango se bani dabu chitrakari ka behad sundar drapes.",
    image: 'https://images.unsplash.com/photo-1618244972963-dbad68f7d884?q=80&w=1600&auto=format&fit=crop',
    link: '/sarees',
  },
  {
    id: 3,
    collection: "Rajshahi Silk Mishran",
    title: "Chanderi Ke Shahkar",
    subtitle: "Sone ki zari border aur shandar designs se saji drapes, har bade utsav ke liye.",
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1600&auto=format&fit=crop',
    link: '/sarees',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
        setAnimate(true);
      }, 500); // Slide change duration
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-neutral-950 text-white overflow-hidden flex flex-col select-none">
      
      {/* 1. PANORAMIC ARTISAN WORKSHOP BANNER (Fits under Navbar) */}
      <div className="relative w-full h-[45vh] sm:h-[50vh] lg:h-[58vh] overflow-hidden bg-neutral-900 flex items-center justify-center">
        
        {/* Soft elegant shadow overlays for text safety */}
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
        
        {/* Artisan Background Image with slow dynamic scale */}
        <img
          src={heroSlides[currentSlide].image}
          alt={heroSlides[currentSlide].title}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[1200ms] ease-out ${
            animate ? 'scale-100 opacity-90' : 'scale-105 opacity-50'
          }`}
        />

        {/* TRANSLUCENT CRIMSON ACCENT BAR (Exactly like Crafted by Skilled Artisans) */}
        <div className="absolute left-0 right-0 z-20 flex flex-col items-center justify-center pointer-events-auto">
          <div className="bg-[#8B2635]/85 w-full py-5 sm:py-7 px-4 border-y border-[#F7DA96]/30 text-center shadow-lg backdrop-blur-[1px]">
            
            {/* Dynamic Collection Badge above the Main title */}
            <p className={`text-[10px] uppercase tracking-[0.25em] text-[#F7DA96] font-bold font-sans mb-1.5 transition-all duration-700 ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
            }`}>
              {heroSlides[currentSlide].collection}
            </p>

            {/* Main Crafted Serif Heading */}
            <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-wide text-white leading-tight uppercase transition-all duration-700 delay-75 ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              {heroSlides[currentSlide].title}
            </h1>

            {/* Subtitle link to shop */}
            <Link 
              to={heroSlides[currentSlide].link}
              className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-[#F7DA96] hover:text-white uppercase tracking-wider font-bold mt-2 transition-colors ${
                animate ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Explore the Craft <ArrowRight className="w-3.5 h-3.5" />
            </Link>

          </div>
        </div>

        {/* Minimal Bottom Indicator dots inside banner */}
        <div className="absolute bottom-4 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (currentSlide === index) return;
                setAnimate(false);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setAnimate(true);
                }, 150);
              }}
              className="h-6 w-3 flex items-center justify-center focus:outline-none"
              aria-label={`Slide ${index + 1}`}
            >
              <span className={`h-[2px] rounded-full transition-all duration-500 ${
                currentSlide === index ? 'w-4 bg-[#F7DA96]' : 'w-1 bg-white/40'
              }`} />
            </button>
          ))}
        </div>

      </div>

      {/* 2. PREMIUM WHITE BRAND VALUE BADGES ROW (Clean look below banner) */}
      <div className="relative z-20 bg-white border-b border-stone-100 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-start justify-center">
            
            {/* Badge 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F7DA96]/20 transition-all duration-300 mb-2.5">
                <Leaf className="w-4.5 h-4.5 text-stone-700" />
              </div>
              <h4 className="text-[11px] sm:text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Natural Prints
              </h4>
              <p className="text-[9px] text-stone-500 mt-0.5 tracking-wide">
                Organic & Herb Dyes
              </p>
            </div>

            {/* Badge 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F7DA96]/20 transition-all duration-300 mb-2.5">
                <Users className="w-4.5 h-4.5 text-stone-700" />
              </div>
              <h4 className="text-[11px] sm:text-xs font-bold text-neutral-900 uppercase tracking-wider">
                For Women By Women
              </h4>
              <p className="text-[9px] text-stone-500 mt-0.5 tracking-wide">
                Supporting Local Weavers
              </p>
            </div>

            {/* Badge 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F7DA96]/20 transition-all duration-300 mb-2.5">
                <Hand className="w-4.5 h-4.5 text-stone-700" />
              </div>
              <h4 className="text-[11px] sm:text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Hand Crafted
              </h4>
              <p className="text-[9px] text-stone-500 mt-0.5 tracking-wide">
                Traditional Block Art
              </p>
            </div>

            {/* Badge 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F7DA96]/20 transition-all duration-300 mb-2.5">
                <Scissors className="w-4.5 h-4.5 text-stone-700" />
              </div>
              <h4 className="text-[11px] sm:text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Made to order
              </h4>
              <p className="text-[9px] text-stone-500 mt-0.5 tracking-wide">
                Tailored Fresh For You
              </p>
            </div>

            {/* Badge 5 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F7DA96]/20 transition-all duration-300 mb-2.5">
                <Heart className="w-4.5 h-4.5 text-stone-700" />
              </div>
              <h4 className="text-[11px] sm:text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Indian Values
              </h4>
              <p className="text-[9px] text-stone-500 mt-0.5 tracking-wide">
                Preserving Heritage
              </p>
            </div>

            {/* Badge 6 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-neutral-900 group-hover:bg-[#F7DA96]/20 transition-all duration-300 mb-2.5">
                <Coins className="w-4.5 h-4.5 text-stone-700" />
              </div>
              <h4 className="text-[11px] sm:text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Pocket-Friendly
              </h4>
              <p className="text-[9px] text-stone-500 mt-0.5 tracking-wide">
                Atelier To Hand Delivery
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}