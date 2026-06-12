import { useEffect, useState } from 'react';

const announcements = [
  'Welcome to BAGRU COTTON FEB — Premium Handcrafted Sarees',
  'Flat 20% OFF on all Cotton Sarees — Limited Time Offer!',
  'Free Shipping on Orders Above ₹2000',
  'New Arrivals: Explore our latest Linen Collection',
];

export default function TopBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
        setVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-10 flex items-center justify-center bg-[#080616] text-white px-4 z-[1000]">
      <p
        className={`text-center text-xs sm:text-sm font-medium tracking-wide transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {announcements[currentIndex]}
      </p>
    </div>
  );
}
