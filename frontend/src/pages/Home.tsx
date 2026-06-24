import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Truck,
  Shield,
  RefreshCw,
  Sparkles,
  Heart,
  MapPin,
  Clock,
  Phone,
  Calendar,
  X,
  Check
} from 'lucide-react';

import Hero from '../components/Hero';
import Reviews from '../components/Reviews';
import FeaturedProductCard from '../components/FeaturedProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { sareeCategories } from '../data/sareeCategories';
import type { SareeProduct } from '../types/product';

const categoryImages: Record<string, { image: string; count: number; origin: string }> = {
  'cotton-mulmul': {
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    count: 150,
    origin: 'Rajasthan',
  },
  handblock: {
    image: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&w=800&q=80',
    count: 32,
    origin: 'Bagru & Dabu',
  },
  'linen-cotton': {
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    count: 28,
    origin: 'Bhagalpur',
  },
  'kota-doria': {
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    count: 19,
    origin: 'Kaithoon',
  },
  'chanderi-bagru': {
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    count: 36,
    origin: 'Madhya Pradesh',
  },
  'maheshwari-silk': {
    image: 'https://images.unsplash.com/photo-1610030470215-6677f5f4ef48?auto=format&fit=crop&w=800&q=80',
    count: 24,
    origin: 'Maheshwar',
  },
};

// Curated collections representing real Indian premium craft values
const featuredProducts: SareeProduct[] = [
  {
    id: 'featured-mulmul',
    name: 'Royal Indigo Mulmul Saree',
    fabric: 'Cotton Mulmul',
    description: 'A flagship mulmul masterpiece — whisper-soft drape, naturally dyed with organic indigo, and printed by heritage block-printing families.',
    price: 2499,
    originalPrice: 3499,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'featured-handblock',
    name: 'Bagru Mud-Resist Dabu Saree',
    fabric: 'Handblock Print',
    description: 'Traditional mud-resist Dabu printing on premium light-woven cotton. Each intricate floral and leaf motif is carefully stamped by hand.',
    price: 3299,
    originalPrice: 4299,
    images: [
      'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'featured-kota',
    name: 'Earthy Terracotta Kota Doria',
    fabric: 'Kota Doria',
    description: 'Fine translucent Kota weave showcasing the authentic signature square checks pattern. Breathable elegance crafted for festive summer grace.',
    price: 2899,
    originalPrice: 3899,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'featured-silk',
    name: 'Imperial Maheshwari Silk Saree',
    fabric: 'Maheshwari Silk',
    description: 'A magnificent blend of royal Chanderi silk with traditional checks weave, finished with classic borders in exquisite gold-toned zari threads.',
    price: 4599,
    originalPrice: 5599,
    images: [
      'https://images.unsplash.com/photo-1610030470215-6677f5f4ef48?auto=format&fit=crop&w=800&q=80',
    ],
  },
];

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState<SareeProduct | null>(null);

  // Added missing state variables and triggers for the Booking Modal
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    date: '',
    time: '11:00 AM'
  });

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] antialiased selection:bg-[#9A7B56] selection:text-white min-h-screen">
      {/* Dynamic Announcement Ticker */}
      <div className="bg-[#1A1A1A] text-[#FAF9F6] text-[10px] md:text-[11px] tracking-[0.25em] text-center py-2.5 px-4 uppercase font-light border-b border-white/5">
        Complimentary Insured Shipping Across India • Crafted Sustainably in Small Batches
      </div>

      <Hero />

      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#9A7B56] font-medium block mb-3">
            Atelier Curations
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-[#1A1A1A] tracking-wide mb-4">
            Shop by Heritage Category
          </h2>
          <div className="w-12 h-[1px] bg-[#9A7B56] mx-auto mb-6" />
          <p className="text-gray-500 max-w-2xl mx-auto text-sm font-sans font-light leading-relaxed">
            Discover historic regional weaving styles, slow-indigo resist ferments, and organic vegetable pigment blocks curated meticulously by native craft preservationists.
          </p>
        </div>

        {/* 6-Column Category Grid matching layout spacing */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {sareeCategories.map((category) => {
            const meta = categoryImages[category.slug] || { 
              image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80', 
              count: 0,
              origin: 'Handloom' 
            };
            return (
              <Link
                key={category.slug}
                to={`/sarees/${category.slug}`}
                className="group relative flex flex-col justify-end overflow-hidden aspect-[3/4] bg-[#FAF9F6] border border-gray-100 shadow-sm"
              >
                <img
                  src={meta.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                
                {/* Micro Category Tag Accent */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[9px] uppercase tracking-wider font-light text-gray-600 border border-gray-100">
                  {meta.origin}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:via-black/35" />

                <div className="absolute bottom-4 left-4 right-4 z-10 transition-transform duration-500 group-hover:-translate-y-1">
                  <h3 className="text-white font-serif text-sm md:text-base tracking-wide leading-tight uppercase">
                    {category.name.replace(' Sarees', '')}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A7B56] animate-pulse"></span>
                    <p className="text-[#C5A880] text-[10px] font-sans tracking-widest uppercase">
                      {meta.count} Drapes
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 1: New Arrivals (Clean, Airy Canvas Background) */}
      <section className="py-24 bg-white border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9A7B56] block mb-2.5">
                The Spring Showcase
              </span>
              <h2 className="text-3xl md:text-[2.5rem] font-serif font-light text-[#1A1A1A] tracking-wide leading-tight">
                New Arrivals
              </h2>
            </div>

            <Link
              to="/sarees"
              className="group inline-flex items-center gap-2.5 border-b border-black pb-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-black transition-all hover:text-[#9A7B56] hover:border-[#9A7B56]"
            >
              Explore Full Collection
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <FeaturedProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: HandBlock Sarees (Styled with soft terracotta/linen backdrop representing earthy mud prints) */}
      <section className="py-24 bg-[#F7F4F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9A7B56] block mb-2.5">
                Authentic Indigo & Dabu Resist
              </span>
              <h2 className="text-3xl md:text-[2.5rem] font-serif font-light text-[#1A1A1A] tracking-wide leading-tight">
                Handblock Masterpieces
              </h2>
            </div>

            <Link
              to="/sarees?category=handblock"
              className="group inline-flex items-center gap-2.5 border-b border-black pb-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-black transition-all hover:text-[#9A7B56] hover:border-[#9A7B56]"
            >
              Browse Handblocks
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {featuredProducts.slice().reverse().map((product) => (
              <FeaturedProductCard
                key={`handblock-${product.id}`}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Linen Sarees (Styled with minimalist crisp layout representing slow woven threads) */}
      <section className="py-24 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9A7B56] block mb-2.5">
                Bhagalpur Flax Heritage
              </span>
              <h2 className="text-3xl md:text-[2.5rem] font-serif font-light text-[#1A1A1A] tracking-wide leading-tight">
                Linen Sarees
              </h2>
            </div>

            <Link
              to="/sarees?category=linen-cotton"
              className="group inline-flex items-center gap-2.5 border-b border-black pb-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-black transition-all hover:text-[#9A7B56] hover:border-[#9A7B56]"
            >
              Discover Flax Knots
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <FeaturedProductCard
                key={`linen-${product.id}`}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Maheshwari & Chanderi Silk */}
      <section className="py-24 bg-[#F2EDE7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9A7B56] block mb-2.5">
                Traditional Gold Zari Edges
              </span>
              <h2 className="text-3xl md:text-[2.5rem] font-serif font-light text-[#1A1A1A] tracking-wide leading-tight">
                Maheshwari Silk
              </h2>
            </div>

            <Link
              to="/sarees?category=maheshwari-silk"
              className="group inline-flex items-center gap-2.5 border-b border-black pb-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-black transition-all hover:text-[#9A7B56] hover:border-[#9A7B56]"
            >
              Explore Imperial Silks
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {featuredProducts.slice().reverse().map((product) => (
              <FeaturedProductCard
                key={`maheshwari-${product.id}`}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Cotton Mulmul (Airy cloud collection layout for daily-wear drapes) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9A7B56] block mb-2.5">
                The Pure Cotton Whisper
              </span>
              <h2 className="text-3xl md:text-[2.5rem] font-serif font-light text-[#1A1A1A] tracking-wide leading-tight">
                Cotton Mulmul Sarees
              </h2>
            </div>

            <Link
              to="/sarees?category=cotton-mulmul"
              className="group inline-flex items-center gap-2.5 border-b border-black pb-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-black transition-all hover:text-[#9A7B56] hover:border-[#9A7B56]"
            >
              View Mulmul Cloud
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <FeaturedProductCard
                key={`mulmul-${product.id}`}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Honest Handloom Seal Promise */}
      <section className="py-24 bg-[#FAF9F6] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#9A7B56] font-medium block mb-2.5">
              Honest Handloom Seal
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-light text-[#1A1A1A]">
              The Premium Experience Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="w-5 h-5 text-[#9A7B56]" />,
                title: 'Complimentary Insured Shipping',
                desc: 'Every saree is wrapped carefully in moisture-proof tissue lining, placed inside hand-pressed rigid keepsake gift boxes, and dispatched with fully insured courier tracking.',
              },
              {
                icon: <Shield className="w-5 h-5 text-[#9A7B56]" />,
                title: 'Certified Artisanal Trails',
                desc: 'We strictly back authentic weaving families in Jaipur, Madhya Pradesh, and West Bengal. Every dye lot is completely trace-inspected for organic skin safety.',
              },
              {
                icon: <RefreshCw className="w-5 h-5 text-[#9A7B56]" />,
                title: 'Bespoke Concierge Returns',
                desc: 'If the weave texture, light-drape fall, or color tone feels slightly out of alignment with your high styling standards, schedule a pickup within 7 days for a flawless experience.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 p-8 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 mb-6 rounded-full bg-[#FAF9F6] border border-[#FAF9F6] flex items-center justify-center">
                  {item.icon}
                </div>

                <h3 className="text-lg font-serif font-normal text-[#1A1A1A] mb-3 tracking-wide uppercase text-[13px]">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-xs md:text-sm font-sans font-light leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Atelier & Location Map */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Atelier details and concierge CTAs */}
            <div className="lg:col-span-5 space-y-8 font-sans">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9A7B56] block mb-3">
                  Experience the Drape in Person
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1A1A1A] tracking-wide leading-tight mb-4">
                  Visit Our Flagship Atelier
                </h2>
                <p className="text-gray-500 text-sm font-light leading-relaxed">
                  Feel the signature lightweight weave of authentic Kota Doria, trace the detail of organic mud-resist Dabu prints, and consult privately with our design curators to select your absolute heritage drape.
                </p>
              </div>

              <div className="space-y-6 border-y border-neutral-100 py-8">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center flex-shrink-0 text-[#9A7B56]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-800 mb-1">Our Location</h4>
                    <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                      Bus Stop, Ramdev Mandir, Main Gaushala Rd, Bagru, Jaipur, Rajasthan 303007
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center flex-shrink-0 text-[#9A7B56]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-800 mb-1">Boutique Hours</h4>
                    <p className="text-gray-600 text-xs sm:text-sm font-light">
                      Monday to Sunday: 11:00 AM – 8:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center flex-shrink-0 text-[#9A7B56]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-800 mb-1">Concierge Line</h4>
                    <p className="text-gray-600 text-xs sm:text-sm font-light">
                      +91 98765 43210 / info@kotadrapes.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => {
                    setBookingSubmitted(false);
                    setIsBookingOpen(true);
                  }}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-[#1A1A1A] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1A1A1A] transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book a Private Viewing
                </button>
              </div>
            </div>

            {/* Right Column: Google Maps Stylized Frame */}
            <div className="lg:col-span-7 h-[400px] sm:h-[480px] w-full rounded-sm overflow-hidden border border-neutral-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.08)] relative group">
             <iframe
  src="https://maps.google.com/maps?q=Bagru%20Cotton%20Feb%20Bagru%20Jaipur%20Rajasthan&t=&z=15&ie=UTF8&iwloc=&output=embed"
  className="w-full h-full grayscale-[25%] contrast-[105%] group-hover:grayscale-0 transition-all duration-700"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
/>
            </div>
          </div>
        </div>
      </section>

      <Reviews />

      {/* Luxury Visit / Appointment Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsBookingOpen(false)}
          />
          
          <div className="relative bg-white max-w-md w-full border border-neutral-100 shadow-2xl p-6 sm:p-8 z-10 transform transition-all animate-in fade-in duration-300">
            <button 
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1.5 hover:bg-gray-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-[#F4EFEA] rounded-full flex items-center justify-center mx-auto text-[#9A7B56]">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl tracking-wide text-gray-900">Appointment Scheduled</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Thank you, {bookingDetails.name}. Our private styling concierge will connect with you shortly on {bookingDetails.phone} to confirm your session.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[9px] tracking-widest uppercase text-[#9A7B56] font-medium block mb-1">
                  Atelier Concierge
                </span>
                <h3 className="font-serif text-xl tracking-wide text-gray-900 mb-6">
                  Schedule Your Private Drape Experience
                </h3>

                <form onSubmit={handleBookingSubmit} className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={bookingDetails.name}
                      onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                      placeholder="Enter full name" 
                      className="w-full border border-gray-200 px-3 py-2.5 outline-none focus:border-[#9A7B56] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Contact Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={bookingDetails.phone}
                      onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                      placeholder="Enter mobile number" 
                      className="w-full border border-gray-200 px-3 py-2.5 outline-none focus:border-[#9A7B56] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">Preferred Date</label>
                      <input 
                        type="date" 
                        required 
                        value={bookingDetails.date}
                        onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                        className="w-full border border-gray-200 px-3 py-2.5 outline-none focus:border-[#9A7B56] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">Preferred Time</label>
                      <select 
                        value={bookingDetails.time}
                        onChange={(e) => setBookingDetails({...bookingDetails, time: e.target.value})}
                        className="w-full border border-gray-200 px-3 py-2.5 bg-white outline-none focus:border-[#9A7B56] transition-colors"
                      >
                        <option>11:00 AM</option>
                        <option>1:00 PM</option>
                        <option>3:00 PM</option>
                        <option>5:00 PM</option>
                        <option>7:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#1A1A1A] hover:bg-[#9A7B56] text-white text-[10px] tracking-widest uppercase font-semibold py-3.5 transition-colors duration-300 mt-2"
                  >
                    Confirm Concierge Booking
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}