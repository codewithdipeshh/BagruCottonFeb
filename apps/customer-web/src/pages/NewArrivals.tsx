import { useMemo, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { getNewArrivals } from '../data/products';
import type { SareeProduct } from '../types/product';

const newArrivalProducts = getNewArrivals();

export default function NewArrivals() {
  const [products, setProducts] = useState(newArrivalProducts);
  const [quickViewProduct, setQuickViewProduct] = useState<SareeProduct | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const handleSortChange = (type: string) => {
    setSortBy(type);
    setSortDropdownOpen(false);
    const sorted = [...newArrivalProducts];

    if (type === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (type === 'discount') {
      sorted.sort(
        (a, b) =>
          (b.originalPrice ?? b.price) -
          b.price -
          ((a.originalPrice ?? a.price) - a.price)
      );
    } else {
      setProducts(newArrivalProducts);
      return;
    }

    setProducts(sorted);
  };

  const sortLabel = useMemo(() => {
    if (sortBy === 'featured') return 'Featured';
    if (sortBy === 'price-low') return 'Price: Low to High';
    if (sortBy === 'price-high') return 'Price: High to Low';
    return 'Biggest Discount';
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-luxury-ivory pt-8">
      <section className="relative overflow-hidden bg-neutral-900 py-16 text-center">
        <div className="absolute top-0 right-0 w-72 h-72 bg-luxury-gold/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-white/5 border border-white/10 text-luxury-gold text-[11px] uppercase tracking-luxury font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Fresh From The Loom
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-white mb-3 tracking-wide">
            New Arrivals
          </h1>
          <p className="text-stone-400 max-w-lg mx-auto text-xs sm:text-sm font-light leading-relaxed">
            Discover the latest Kota Doriya, Chanderi, and handblock masterpieces — each with four curated views.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between border-b border-luxury-gold/15 pb-4 mb-10">
          <p className="text-sm font-light text-luxury-charcoal">
            {products.length} products
          </p>

          <div className="relative">
            <button
              type="button"
              onClick={() => setSortDropdownOpen((open) => !open)}
              className="flex items-center gap-2 text-sm font-light text-luxury-charcoal hover:text-luxury-black transition-colors px-2 py-1"
            >
              <span>{sortLabel}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  sortDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {sortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-luxury-gold/20 shadow-lg py-1 z-30 text-xs rounded-lg overflow-hidden">
                {[
                  { id: 'featured', label: 'Featured' },
                  { id: 'price-low', label: 'Price: Low to High' },
                  { id: 'price-high', label: 'Price: High to Low' },
                  { id: 'discount', label: 'Biggest Discount' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSortChange(option.id)}
                    className="w-full text-left px-4 py-2.5 hover:bg-luxury-cream text-luxury-charcoal hover:text-luxury-black transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
