import { useEffect, useState } from 'react';
import {
  Sparkles,
  Truck,
  Gift,
  ShieldCheck,
} from 'lucide-react';

const announcements = [
  {
    icon: <Sparkles className="w-4 h-4" />,
    text: 'Welcome to BAGRU COTTON FEB — Premium Handcrafted Sarees',
  },
  {
    icon: <Gift className="w-4 h-4" />,
    text: 'Flat 20% OFF on Cotton Sarees — Limited Time Offer',
  },
  {
    icon: <Truck className="w-4 h-4" />,
    text: 'Free Shipping on Orders Above ₹2000 Across India',
  },
  {
    icon: <ShieldCheck className="w-4 h-4" />,
    text: 'Trusted Quality • Elegant Designs • Secure Checkout',
  },
];

export default function TopBar() {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) =>
          (prev + 1) % announcements.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#080616] via-[#1A1333] to-[#080616] border-b border-white/10">
      {/* Premium Glow */}
      <div className="absolute top-0 left-0 w-52 h-52 bg-[#D4AF37]/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-11">
          <div
            key={currentIndex}
            className="flex items-center gap-2 text-white text-sm font-medium tracking-wide animate-fadeIn"
          >
            <span className="text-[#D4AF37]">
              {announcements[currentIndex].icon}
            </span>

            <span>
              {announcements[currentIndex].text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}