import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowRight,
  Truck,
  Shield,
  RefreshCw,
  MapPin,
  Clock,
  Phone,
  Calendar,
  X,
  Check
} from 'lucide-react';

import Hero from '../components/Hero';
import Reviews from '../components/Reviews';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { findProducts } from '../State/Product/Action';
import springBanner from '../assets/images/arrivals.png';

const sareeCategoriesList = [
  { slug: 'cotton-mulmul', name: 'Mulmul Cotton' },
  { slug: 'handblock', name: 'Cotton HandBlock' },
  { slug: 'linen-cotton', name: 'Cotton Linen' },
  { slug: 'kota-doria', name: 'Kota Doria Silk' },
  { slug: 'chanderi-bagru', name: 'Chanderi Silk' },
  { slug: 'maheshwari-silk', name: 'Maheshwari Silk' },
];

const categoryStaticMeta: Record<string, { defaultImage: string; origin: string; databaseName: string }> = {
  'cotton-mulmul': {
    defaultImage: 'https://res.cloudinary.com/zjr85bqp/image/upload/v1785147979/IMG-20260720-WA0137_rso60e.jpg',
    origin: 'MULMUL SAREES',
    databaseName: 'Mulmul Cotton Sarees'
  },
  'handblock': {
    defaultImage: 'https://res.cloudinary.com/zjr85bqp/image/upload/v1785148231/IMG-20260521-WA0111_zn0g3r.jpg',
    origin: 'Bagru & Dabu',
    databaseName: 'Cotton HandBlock Sarees'
  },
  'linen-cotton': {
    defaultImage: 'https://res.cloudinary.com/zjr85bqp/image/upload/v1785148465/IMG-20260709-WA0084_mxbpnz.jpg',
    origin: 'LINEN COLLECTION',
    databaseName: 'Cotton Linen Saree'
  },
  'kota-doria': {
    defaultImage: 'https://res.cloudinary.com/zjr85bqp/image/upload/v1785148777/IMG-20260618-WA0005_-_Copy_ix2xvd.jpg',
    origin: 'KOTA DORIA',
    databaseName: 'Kota Doria Silk'
  },
  'chanderi-bagru': {
    defaultImage: 'https://res.cloudinary.com/zjr85bqp/image/upload/v1785149175/IMG-20250514-WA0117_efhqvm.jpg',
    origin: 'Chanderi Silk',
    databaseName: 'Chanderi Silk Saree'
  },
  'maheshwari-silk': {
    defaultImage: 'https://res.cloudinary.com/zjr85bqp/image/upload/v1785147553/IMG-20260727-WA0042_ifckuv.jpg',
    origin: 'Maheshwar SilK',
    databaseName: 'Maheshwari Silk Saree'
  },

  'temple-border': {
    defaultImage: '',
    origin: 'Temple Weave',
    databaseName: 'Temple Border Saree'
  },
  'khadi-cotton': {
    defaultImage: '',
    origin: 'Khadi Handloom',
    databaseName: 'Khadi Cotton Saree'
  },
};

const categoryShowcases: {
  key: string;
  eyebrow: string;
  heading: string;
  ctaText: string;
  href: string;
  bgClass: string;
}[] = [
  {
    key: 'maheshwari-silk',
    eyebrow: 'Traditional Gold Zari Edges',
    heading: 'Maheshwari Silk Saree',
    ctaText: 'Explore Imperial Silks',
    href: '/sarees/maheshwari-silk',
    bgClass: 'bg-[#F2EDE7]',
  },
  {
    key: 'kota-doria',
    eyebrow: "Kaithoon's Translucent Checks",
    heading: 'Kota Doria Silk',
    ctaText: 'Browse Kota Weaves',
    href: '/sarees/kota-doria',
    bgClass: 'bg-[#F7F4F0]',
  },
  {
    key: 'chanderi-bagru',
    eyebrow: 'Chanderi Luxe Weave',
    heading: 'Chanderi Silk Saree',
    ctaText: 'Explore Chanderi Collections',
    href: '/sarees/chanderi-bagru',
    bgClass: 'bg-white border-b border-neutral-100',
  },
  {
    key: 'cotton-mulmul',
    eyebrow: 'The Pure Cotton Whisper',
    heading: 'Mulmul Cotton Sarees',
    ctaText: 'View Mulmul Cloud',
    href: '/sarees/cotton-mulmul',
    bgClass: 'bg-[#F7F4F0]',
  },
  {
    key: 'handblock',
    eyebrow: 'Authentic Wooden Handblock Art',
    heading: 'Cotton HandBlock Sarees',
    ctaText: 'Browse Handblock Prints',
    href: '/sarees/handblock',
    bgClass: 'bg-white',
  },
  {
    key: 'linen-cotton',
    eyebrow: 'Linen Classic Weave',
    heading: 'Cotton Linen Saree',
    ctaText: 'Discover Flax Knots',
    href: '/sarees/linen-cotton',
    bgClass: 'bg-[#F2EDE7] border-b border-neutral-100',
  },
  {
    key: 'temple-border',
    eyebrow: 'The Temple Weave',
    heading: 'Temple Border Saree',
    ctaText: 'Discover Temple Motifs',
    href: '/sarees/temple-border',
    bgClass: 'bg-white',
  },
  {
    key: 'khadi-cotton',
    eyebrow: 'Khadi Handloom Grace',
    heading: 'Khadi Cotton Saree',
    ctaText: 'Explore Khadi Weaves',
    href: '/sarees/khadi-cotton',
    bgClass: 'bg-[#F2EDE7] border-b border-neutral-100',
  },
];

export default function Home() {
  const dispatch = useDispatch<any>();
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  // ✅ FIX: Directly select the products array instead of destructuring an object.
  const products = useSelector((state: any) => state.product?.products);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    date: '',
    time: '11:00 AM'
  });

  useEffect(() => {
    const reqData = {
      category: '',
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      stock: '',
      pageNumber: 1,
      pageSize: 200
    };
    dispatch(findProducts(reqData));
  }, [dispatch]);

  const liveProductsList = useMemo(() => {
    if (!products) return [];
    return Array.isArray(products) ? products : products.content || products.products || [];
  }, [products]);

  const newArrivals = useMemo(() => {
    return [...liveProductsList].reverse().slice(0, 4);
  }, [liveProductsList]);

  const getCategoryProducts = (categoryKey: string) => {
    const config = categoryStaticMeta[categoryKey];
    if (!config) return [];

    return liveProductsList.filter((item: any) => {
      const categoryData = item?.category;
      const itemCatName = (typeof categoryData === 'object' ? categoryData?.name : categoryData) || '';
      const itemCatSlug = (typeof categoryData === 'object' ? categoryData?.slug : '') || '';

      return itemCatName.toLowerCase().trim() === config.databaseName.toLowerCase().trim() ||
             itemCatSlug.toLowerCase().trim() === categoryKey.toLowerCase().trim();
    });
  };

  const getCategoryBlockMeta = (categoryKey: string) => {
    const staticMeta = categoryStaticMeta[categoryKey];
    const categoryProducts = getCategoryProducts(categoryKey);

    let dynamicImage = staticMeta?.defaultImage;
    if (categoryProducts.length > 0) {
      const latestProduct = categoryProducts[categoryProducts.length - 1];
      dynamicImage = latestProduct?.imageUrls?.[0] || latestProduct?.images?.[0] || latestProduct?.imageUrl || latestProduct?.image || staticMeta?.defaultImage;
    }

    return {
      image: dynamicImage,
      count: categoryProducts.length,
      origin: staticMeta?.origin || 'Handloom'
    };
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  useEffect(() => {
    if (!isBookingOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsBookingOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isBookingOpen]);

  // Reusable responsive product wrapper style:
  const responsiveProductWrapperClass = "flex sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto sm:overflow-x-visible gap-4 md:gap-6 lg:gap-8 pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-none";
  const responsiveCardItemClass = "flex-none w-[240px] xs:w-[260px] sm:w-auto snap-align-start";

  return (
    <div className="bg-gradient-to-b from-[#FAF9F6] to-[#F5F3EF] text-[#1A1A1A] antialiased selection:bg-[#9A7B56] selection:text-white min-h-screen text-left">
      <Hero />

      {/* 1. HERITAGE CATEGORIES SECTION */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
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

        <div className="flex lg:grid lg:grid-cols-6 overflow-x-auto lg:overflow-x-visible gap-4 md:gap-5 pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory">
          {sareeCategoriesList.map((category) => {
            const dynamicMeta = getCategoryBlockMeta(category.slug);
            return (
              <Link
                key={category.slug}
                to={`/sarees/${category.slug}`}
                className="group relative flex flex-col justify-end overflow-hidden aspect-[3/4] bg-stone-100 border border-gray-100 shadow-sm no-underline flex-none w-[180px] sm:w-[220px] lg:w-auto snap-align-start rounded-md"
              >
                <img
                  src={dynamicMeta.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[9px] uppercase tracking-wider font-light text-gray-600 border border-gray-100 z-20">
                  {dynamicMeta.origin}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:via-black/45 z-10" />

                <div className="absolute bottom-4 left-4 right-4 z-20 transition-transform duration-500 group-hover:-translate-y-1">
                  <h3 className="text-white font-serif text-xs md:text-sm lg:text-base tracking-wide leading-tight uppercase m-0">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A7B56]"></span>
                    <p className="text-[#C5A880] text-[10px] font-sans tracking-widest uppercase m-0">
                      {dynamicMeta.count} {dynamicMeta.count === 1 ? 'Drape' : 'Drapes'}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 2. SEASONAL BANNER */}
      <section className="w-full bg-white pt-8 pb-4">
        <div className="max-w-[96rem] mx-auto px-4 md:px-8">
          <div className="w-full h-[25vh] sm:h-[40vh] lg:h-[55vh] overflow-hidden rounded-sm relative group cursor-pointer border border-stone-100 shadow-sm">
           <img 
              src={springBanner} 
              alt="Spring Collection Banner" 
              className="w-full h-full object-cover object-center transition-transform duration-[1500ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 pointer-events-none transition-opacity duration-700 group-hover:bg-black/0" />
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS SECTION */}
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
              className="group inline-flex items-center gap-2.5 border-b border-black pb-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-black transition-all hover:text-[#9A7B56] hover:border-[#9A7B56] no-underline"
            >
              Explore Full Collection
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className={responsiveProductWrapperClass}>
            {newArrivals.map((product: any) => (
              <div key={product._id || product.id} className={responsiveCardItemClass}>
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CATEGORY SHOWCASES */}
      {categoryShowcases.map((section) => {
        const sectionProducts = getCategoryProducts(section.key).slice(0, 4);
        return (
          <section key={section.key} className={`py-24 ${section.bgClass}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-16">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9A7B56] block mb-2.5">
                    {section.eyebrow}
                  </span>
                  <h2 className="text-3xl md:text-[2.5rem] font-serif font-light text-[#1A1A1A] tracking-wide leading-tight">
                    {section.heading}
                  </h2>
                </div>

                <Link
                  to={section.href}
                  className="group inline-flex items-center gap-2.5 border-b border-black pb-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-black transition-all hover:text-[#9A7B56] hover:border-[#9A7B56] no-underline"
                >
                  {section.ctaText}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {sectionProducts.length > 0 ? (
                <div className={responsiveProductWrapperClass}>
                  {sectionProducts.map((product: any) => (
                    <div key={`${section.key}-${product._id || product.id}`} className={responsiveCardItemClass}>
                      <ProductCard
                        product={product}
                        onQuickView={setQuickViewProduct}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 font-light tracking-wide">
                  New pieces from this collection are being added — check back soon.
                </p>
              )}
            </div>
          </section>
        );
      })}

      {/* 5. PROMISE / EXPERIENCE CARDS */}
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
                className="group bg-white border border-[#E8E3DD] p-8 hover:border-[#9A7B56]/40 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center rounded-xl"
              >
                <div className="w-12 h-12 mb-6 rounded-full bg-[#FAF9F6] border border-[#9A7B56]/20 flex items-center justify-center transition-colors duration-300 group-hover:border-[#9A7B56]/50">
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

      {/* 6. FLAGSHIP BOUTIQUE VIEWING */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
                      +91 89630 85628  / info@bagrucottonfeb.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setBookingSubmitted(false);
                    setIsBookingOpen(true);
                  }}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-[#1A1A1A] px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1A1A1A] transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white border-none bg-transparent cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book a Private Viewing
                </button>
              </div>
            </div>

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

      {/* APPOINTMENT MODAL */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsBookingOpen(false)}
          />

          <div className="relative bg-white max-w-md w-full border border-neutral-100 shadow-2xl p-6 sm:p-8 z-10 transform transition-all animate-in fade-in duration-300 text-left rounded-2xl">
            <button
              type="button"
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1.5 hover:bg-gray-50 rounded-full transition-colors border-none bg-transparent cursor-pointer"
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
                      onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                      placeholder="Enter full name"
                      className="w-full border border-gray-200 px-3 py-2.5 outline-none focus:border-[#9A7B56] transition-colors rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Contact Number</label>
                    <input
                      type="tel"
                      required
                      value={bookingDetails.phone}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
                      placeholder="Enter mobile number"
                      className="w-full border border-gray-200 px-3 py-2.5 outline-none focus:border-[#9A7B56] transition-colors rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDetails.date}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                        className="w-full border border-gray-200 px-3 py-2.5 outline-none focus:border-[#9A7B56] transition-colors rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">Preferred Time</label>
                      <select
                        value={bookingDetails.time}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                        className="w-full border border-gray-200 px-3 py-2.5 bg-white outline-none focus:border-[#9A7B56] transition-colors cursor-pointer rounded-lg"
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
                    className="w-full bg-[#1A1A1A] hover:bg-[#9A7B56] text-white text-[10px] tracking-widest uppercase font-semibold py-3.5 transition-colors duration-300 mt-2 border-none cursor-pointer rounded-lg"
                  >
                    Confirm Concierge Booking
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}