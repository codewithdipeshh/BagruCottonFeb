import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { findProducts } from '../State/Product/Action';

export default function NewArrivals() {
  const dispatch = useDispatch<any>();
  const { products: storeProducts, loading } = useSelector((state: any) => state.product);

  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [sortBy, setSortBy] = useState('latest');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

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
    if (!storeProducts) return [];
    return Array.isArray(storeProducts) ? storeProducts : storeProducts.content || storeProducts.products || [];
  }, [storeProducts]);

  const sortedProducts = useMemo(() => {
    let result = [...liveProductsList];

    if (sortBy === 'latest') {
      result.reverse();
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => {
        const pA = a.discountedPrice || a.price || 0;
        const pB = b.discountedPrice || b.price || 0;
        return pA - pB;
      });
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => {
        const pA = a.discountedPrice || a.price || 0;
        const pB = b.discountedPrice || b.price || 0;
        return pB - pA;
      });
    } else if (sortBy === 'discount') {
      result.sort((a, b) => {
        const dA = a.discountPercent || a.discountPercentage || 0;
        const dB = b.discountPercent || b.discountPercentage || 0;
        return dB - dA;
      });
    }

    return result;
  }, [liveProductsList, sortBy]);

  const sortLabel = useMemo(() => {
    if (sortBy === 'latest') return 'Latest Uploads';
    if (sortBy === 'price-low') return 'Price: Low to High';
    if (sortBy === 'price-high') return 'Price: High to Low';
    return 'Biggest Discount';
  }, [sortBy]);

  if (loading && liveProductsList.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center font-serif text-stone-600">
        <div className="text-center space-y-3">
          <Sparkles className="w-6 h-6 animate-spin text-[#F7DA96] mx-auto" />
          <p className="text-xs uppercase tracking-[0.2em]">Sourcing Fresh Looms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-8 text-left">
      <section className="relative overflow-hidden bg-neutral-900 py-16 text-center">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-white/5 border border-white/10 text-[#F7DA96] text-[11px] uppercase tracking-widest font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Fresh From The Loom
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-white mb-3 tracking-wide uppercase">
            New Arrivals
          </h1>
          <p className="text-stone-400 max-w-lg mx-auto text-xs sm:text-sm font-light leading-relaxed">
            Discover our absolute latest uploaded Kota Doriya, Chanderi, and handblock masterpieces curated freshly for your wardrobe.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-10">
          <p className="text-sm font-light text-stone-600 m-0">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
          </p>

          <div className="relative">
            <button
              type="button"
              onClick={() => setSortDropdownOpen((open) => !open)}
              className="flex items-center gap-2 text-sm font-light text-stone-700 hover:text-black transition-colors px-2 py-1 border-none bg-transparent cursor-pointer outline-none"
            >
              <span>{sortLabel}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  sortDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {sortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 shadow-lg py-1 z-30 text-xs rounded-lg overflow-hidden">
                {[
                  { id: 'latest', label: 'Latest Uploads' },
                  { id: 'price-low', label: 'Price: Low to High' },
                  { id: 'price-high', label: 'Price: High to Low' },
                  { id: 'discount', label: 'Biggest Discount' },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setSortBy(option.id);
                      setSortDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-stone-50 text-stone-600 hover:text-black transition-colors border-none bg-transparent cursor-pointer outline-none"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedProducts.map((product: any) => (
            <ProductCard
              key={product._id || product.id}
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