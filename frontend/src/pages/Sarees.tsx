import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Grid2x2 as Grid,
  List,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { getCategoryBySlug } from '../data/sareeCategories';
import { getCatalogProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import type { SareeProduct } from '../types/product';

const catalogProducts = getCatalogProducts();

export default function Sarees() {
  const { category: categorySlug } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q')?.trim().toLowerCase() ?? '';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [inStockOnly, setInStockOnly] = useState(true);
  const [isAvailabilityExpanded, setIsAvailabilityExpanded] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<SareeProduct | null>(null);

  useEffect(() => {
    const match = getCategoryBySlug(categorySlug);
    setSelectedCategory(match?.filterId ?? 'all');
  }, [categorySlug]);

  const filteredSarees = useMemo(() => {
    let list =
      selectedCategory === 'all'
        ? catalogProducts
        : catalogProducts.filter((saree) => saree.category === selectedCategory);

    if (searchQuery) {
      list = list.filter(
        (saree) =>
          saree.name.toLowerCase().includes(searchQuery) ||
          saree.fabric.toLowerCase().includes(searchQuery)
      );
    }

    if (inStockOnly) {
      list = list.filter((saree) => saree.inStock !== false);
    }

    return list;
  }, [selectedCategory, searchQuery, inStockOnly]);

  return (
    <div className="min-h-screen bg-luxury-ivory pt-8">
      <section className="relative overflow-hidden bg-neutral-900 py-20 text-center">
        <div className="absolute top-0 left-0 w-80 h-80 bg-luxury-gold/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-white/5 border border-white/10 text-luxury-gold text-[11px] uppercase tracking-luxury font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" /> The Luxury Catalog Vault
          </span>

          <h1 className="text-3xl sm:text-5xl font-serif font-light text-white mb-4 tracking-wide leading-tight">
            The Heritage Collection
          </h1>

          <p className="text-stone-400 max-w-xl mx-auto text-xs sm:text-sm font-light tracking-wide leading-relaxed">
            Explore authentic handloom masterpieces dyed organically and stamped individually via ancestral block carving metrics.
          </p>

          {searchQuery && (
            <p className="mt-4 text-luxury-gold text-xs font-medium tracking-wider uppercase">
              Filtered Archive For &ldquo;{searchParams.get('q')}&rdquo;
            </p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-luxury-gold/20 rounded-2xl p-6 sticky top-36 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.02)] text-left">
              <button
                type="button"
                onClick={() => setIsAvailabilityExpanded((prev) => !prev)}
                className="w-full flex items-center justify-between text-xs uppercase tracking-epic text-luxury-gold font-bold border-b border-stone-100 pb-3 mb-4 focus:outline-none"
              >
                <span>Availability</span>
                <ChevronDown
                  className={`w-4 h-4 text-luxury-gold/70 transition-transform duration-300 ${
                    isAvailabilityExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isAvailabilityExpanded ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4.5 h-4.5 accent-neutral-900 border-stone-300 rounded cursor-pointer transition-all focus:ring-0"
                  />
                  <label
                    htmlFor="inStock"
                    className="text-xs font-medium text-neutral-800 cursor-pointer select-none tracking-wide hover:text-black transition-colors"
                  >
                    In stock ({catalogProducts.filter((s) => s.inStock !== false).length})
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white border border-luxury-gold/20 rounded-2xl p-5 mb-8 flex items-center justify-between shadow-[0_4px_20px_-10px_rgba(0,0,0,0.02)]">
              <div>
                <h2 className="text-base font-serif font-medium text-neutral-900 tracking-wide">
                  Masterpiece Vault
                </h2>
                <p className="text-luxury-gold text-[11px] font-medium tracking-wider uppercase mt-0.5">
                  {filteredSarees.length} Editions Available
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-neutral-900 text-white' : 'bg-stone-50 text-neutral-500 hover:bg-stone-100'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-neutral-900 text-white' : 'bg-stone-50 text-neutral-500 hover:bg-stone-100'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {filteredSarees.length === 0 ? (
              <div className="bg-white border border-luxury-gold/15 rounded-2xl p-16 text-center shadow-sm">
                <p className="text-stone-500 text-sm font-light">No drapes currently matches this availability criteria.</p>
                <button
                  type="button"
                  onClick={() => setInStockOnly(false)}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider text-luxury-gold hover:text-black transition-colors"
                >
                  View Out Of Stock Pieces
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'
                    : 'space-y-6'
                }
              >
                {filteredSarees.map((saree) => (
                  <ProductCard
                    key={saree.id}
                    product={saree}
                    layout={viewMode}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
