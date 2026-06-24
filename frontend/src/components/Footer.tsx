import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  // Mobile accordion state managers
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setActiveAccordion(prev => (prev === section ? null : section));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-black text-stone-200 relative overflow-hidden border-t border-[#F7DA96]/20 select-none font-sans">
      
      {/* Radiant Classic Gold Top Border Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#F7DA96]/50 to-transparent z-10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10 z-10">

        {/* Core Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-10">

          {/* Column 1: Brand Logo & Heritage Philosophy */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-serif font-light tracking-[0.1em] text-white uppercase">
                BAGRU COTTON FEB
              </h3>
              <p className="text-[9px] uppercase tracking-[0.35em] text-[#F7DA96] font-bold">
                Atelier Jaipur • Estd. 2024
              </p>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              We preserve the ancestral craft of wooden handblock printing and natural mud-resist dabu prints. Every weave is an authentic story of Jaipur's heritage, tailored to wrap you in pure luxury.
            </p>

            {/* Social media icons with glowing border transitions */}
            <div className="flex gap-3.5 pt-1">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-stone-800 hover:border-[#F7DA96]/50 flex items-center justify-center hover:bg-[#F7DA96] hover:text-black transition-all duration-500 text-stone-300 shadow-sm"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/bagru_cotton_feb?igsh=d2F2ZW4xeGlsbzl5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-stone-800 hover:border-[#F7DA96]/50 flex items-center justify-center hover:bg-[#F7DA96] hover:text-black transition-all duration-500 text-stone-300 shadow-sm"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-stone-800 hover:border-[#F7DA96]/50 flex items-center justify-center hover:bg-[#F7DA96] hover:text-black transition-all duration-500 text-stone-300 shadow-sm"
                aria-label="Twitter Account"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Legal links (Collapsible on mobile) */}
          <div className="space-y-4 text-left">
            <button 
              onClick={() => toggleAccordion("legal")}
              className="w-full flex items-center justify-between md:pointer-events-none md:block text-[11px] uppercase tracking-epic text-[#F7DA96] font-bold border-b border-[#F7DA96]/10 pb-2"
            >
              <span>Legal Policy</span>
              <ChevronDown className={`w-3.5 h-3.5 md:hidden transition-transform duration-300 ${activeAccordion === "legal" ? "rotate-180" : ""}`} />
            </button>

            <ul className={`space-y-2.5 transition-all duration-300 overflow-hidden md:max-h-full md:opacity-100 ${
              activeAccordion === "legal" ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 md:mt-0"
            }`}>
              <li>
                <Link
                  to="/exchange-policy"
                  className="text-stone-300 hover:text-[#F7DA96] text-xs font-light tracking-wide transition-colors relative block group w-fit"
                >
                  Exchange & Returns
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F7DA96] transition-all group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link
                  to="/sarees"
                  className="text-stone-300 hover:text-[#F7DA96] text-xs font-light tracking-wide transition-colors relative block group w-fit"
                >
                  Shipping Terms
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F7DA96] transition-all group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-stone-300 hover:text-[#F7DA96] text-xs font-light tracking-wide transition-colors relative block group w-fit"
                >
                  Terms of Service
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F7DA96] transition-all group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-stone-300 hover:text-[#F7DA96] text-xs font-light tracking-wide transition-colors relative block group w-fit"
                >
                  Privacy Blueprint
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F7DA96] transition-all group-hover:w-full" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore links (Collapsible on mobile) */}
          <div className="space-y-4 text-left">
            <button 
              onClick={() => toggleAccordion("explore")}
              className="w-full flex items-center justify-between md:pointer-events-none md:block text-[11px] uppercase tracking-epic text-[#F7DA96] font-bold border-b border-[#F7DA96]/10 pb-2"
            >
              <span>Atelier Vault</span>
              <ChevronDown className={`w-3.5 h-3.5 md:hidden transition-transform duration-300 ${activeAccordion === "explore" ? "rotate-180" : ""}`} />
            </button>

            <ul className={`space-y-2.5 transition-all duration-300 overflow-hidden md:max-h-full md:opacity-100 ${
              activeAccordion === "explore" ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 md:mt-0"
            }`}>
              <li>
                <Link
                  to="/"
                  className="text-stone-300 hover:text-[#F7DA96] text-xs font-light tracking-wide transition-colors relative block group w-fit"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F7DA96] transition-all group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-stone-300 hover:text-[#F7DA96] text-xs font-light tracking-wide transition-colors relative block group w-fit"
                >
                  Our Heritage Story
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F7DA96] transition-all group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link
                  to="/sarees"
                  className="text-stone-300 hover:text-[#F7DA96] text-xs font-light tracking-wide transition-colors relative block group w-fit"
                >
                  Premium Sarees
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F7DA96] transition-all group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="text-stone-300 hover:text-[#F7DA96] text-xs font-light tracking-wide transition-colors relative block group w-fit"
                >
                  New Arrivals ✦
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#F7DA96] transition-all group-hover:w-full" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location details */}
          <div className="space-y-4 text-left">
            <button 
              onClick={() => toggleAccordion("contact")}
              className="w-full flex items-center justify-between md:pointer-events-none md:block text-[11px] uppercase tracking-epic text-[#F7DA96] font-bold border-b border-[#F7DA96]/10 pb-2"
            >
              <span>The Atelier</span>
              <ChevronDown className={`w-3.5 h-3.5 md:hidden transition-transform duration-300 ${activeAccordion === "contact" ? "rotate-180" : ""}`} />
            </button>

            <ul className={`space-y-3.5 transition-all duration-300 overflow-hidden md:max-h-full md:opacity-100 ${
              activeAccordion === "contact" ? "max-h-56 opacity-100 mt-2" : "max-h-0 opacity-0 md:mt-0"
            }`}>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F7DA96]" />
                <span className="text-stone-300 text-xs font-light leading-relaxed">
                  Bus Stop, Ramdev Mandir, Main Gaushala Rd, Bagru, Jaipur, Rajasthan 303007
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#F7DA96]" />
                <span className="text-stone-300 text-xs font-light hover:text-white transition-colors">
                  +91 98765 43210
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-[#F7DA96]" />
                <span className="text-stone-300 text-xs font-light hover:text-white transition-colors animate-pulse">
                  info@bagrucottonfeb.com
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Middle Row: Luxury Newsletter & The Artisan Promise */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-16 pt-10 border-t border-stone-900">
          
          {/* Subtle Trust Signature */}
          <div className="md:col-span-7 text-left space-y-2">
            <div className="flex items-center gap-2 text-stone-100 font-serif font-light text-base tracking-wide">
              <Sparkles className="w-4 h-4 text-[#F7DA96] animate-spin-slow" />
              <span className="text-white">The Artisan Promise</span>
            </div>
            <p className="text-stone-400 text-xs font-light max-w-xl leading-relaxed">
              Every creation you purchase helps support local craftspeople and women block printers in Bagru villages. We stand for transparency, organic vegetable colors, and fair wages.
            </p>
          </div>

          {/* Elegant Gold-Accent Newsletter Input */}
          <div className="md:col-span-5 text-left space-y-3.5">
            <h4 className="text-[11px] uppercase tracking-epic text-[#F7DA96] font-bold">
              Sign Up For Atelier Launches
            </h4>
            <div className="border-b border-[#F7DA96]/30 focus-within:border-[#F7DA96] transition-colors flex items-center gap-3 pb-2.5">
              <input
                type="email"
                placeholder="Enter your premium email"
                className="bg-transparent outline-none text-xs placeholder:text-stone-600 text-stone-100 w-full font-light tracking-wide"
              />
              <button aria-label="Subscribe" className="hover:translate-x-1.5 transition-transform text-[#F7DA96] hover:text-white">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Payment Modes & Location Pin */}
        <div className="mt-12 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:items-start items-center gap-2">
            <p className="text-[11px] text-stone-400 text-center font-sans tracking-wide">
              © 2026 BAGRU COTTON FEB. All rights reserved. Preserving Indian Crafts.
            </p>
            
            {/* Elegant Payment Badge List */}
            <div className="flex items-center gap-3 text-[9px] text-[#F7DA96]/70 font-sans tracking-wider font-semibold uppercase mt-1">
              <span>UPI</span>
              <span className="w-1 h-1 rounded-full bg-stone-800" />
              <span>RuPay</span>
              <span className="w-1 h-1 rounded-full bg-stone-800" />
              <span>Visa</span>
              <span className="w-1 h-1 rounded-full bg-stone-800" />
              <span>Mastercard</span>
              <span className="w-1 h-1 rounded-full bg-stone-800" />
              <span>NetBanking</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#F7DA96] font-semibold">
              <span>Jaipur, Rajasthan, India</span>
            </div>
            
            {/* Elegant Scroll To Top Anchor Button */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border border-stone-800 hover:border-[#F7DA96] flex items-center justify-center text-stone-300 hover:text-[#F7DA96] transition-all duration-500 shadow-md"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}