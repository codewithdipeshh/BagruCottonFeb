import { useEffect, useState } from 'react';

const announcements = [
  "Welcome to BAGRU COTTON FEB - Premium Handcrafted Sarees",
  "Flat 20% OFF on all Cotton Sarees - Limited Time Offer!",
  "Free Shipping on Orders Above Rs. 2000",
  "New Arrivals: Explore our latest Linen Collection",
];

export default function TopBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#080616] text-white py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-8 text-sm font-medium tracking-wide">
          {announcements[currentIndex]}
        </span>
      </div>
    </div>
  );
}
