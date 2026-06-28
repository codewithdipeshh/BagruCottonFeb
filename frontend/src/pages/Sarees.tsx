import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import {
  Grid2x2 as Grid,
  List,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { findProducts } from '../State/Product/Action'; 
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function Sarees() {
  const dispatch = useDispatch<any>();
  const { category: categorySlug } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  
  // URL Queries capturing
  const searchQuery = searchParams.get('q')?.trim() ?? '';

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [inStockOnly, setInStockOnly] = useState(true);
  const [isAvailabilityExpanded, setIsAvailabilityExpanded] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  // 🌟 Redux store state extract kijiye (Check your rootReducer property name)
  const { products, loading } = useSelector((state: any) => state.product);

  // 🌟 Trigger API hit whenever URL parameters or component dependencies change
  useEffect(() => {
    const reqData = {
      category: categorySlug || '',
      colors: '',
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      stock: inStockOnly ? 'in_stock' : '',
      pageNumber: 0,
      pageSize: 50 // Zyada inventory fetch karne ke liye capacity badha di hai
    };

    dispatch(findProducts(reqData));
  }, [categorySlug, inStockOnly, dispatch]);

  // Handle case where backend returns structured object or raw list array
  // Aamtaur par data spring boot/node standard mein `products.content` ya raw array aata hai
  const finalProductsList = Array.isArray(products) 
    ? products 
    : products?.content || [];

  // Client side quick local search loop filter if search query is present
  const clientFilteredProducts = finalProductsList.filter((saree: any) => {
    if (!searchQuery) return true;
    return (
      saree.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      saree.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-8">
      
      {/* HEADER HERO AREA */}
      <section className="relative overflow-hidden bg-neutral-900 py-20 text-center">
        <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-white/5 border border-white/10 text-[#F7DA96] text-[11px] uppercase tracking-widest font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F7DA96]" /> The Luxury Catalog Vault
          </span>

          <h1 className="text-3xl sm:text-5xl font-serif font-light text-white mb-4 tracking-wide leading-tight">
            The Heritage Collection
          </h1>

          <p className="text-stone-400 max-w-xl mx-auto text-xs sm:text-sm font-light tracking-wide leading-relaxed">
            Explore authentic handloom masterpieces dyed organically and stamped individually via ancestral block carving metrics.
          </p>

          {searchQuery && (
            <p className="mt-4 text-[#F7DA96] text-xs font-medium tracking-wider uppercase">
              Filtered Archive For &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* CORE FRAME LAYOUT SPLIT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* SIDEBAR RACK */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sticky top-36 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.02)] text-left">
              <button
                type="button"
                onClick={() => setIsAvailabilityExpanded((prev) => !prev)}
                className="w-full flex items-center justify-between text-xs uppercase tracking-wider text-stone-900 font-bold border-b border-stone-100 pb-3 mb-4 focus:outline-none"
              >
                <span>Availability</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 transition-transform duration-300 ${
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
                    Filter In stock Only
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT RACK */}
          <main className="flex-1">
            <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-8 flex items-center justify-between shadow-[0_4px_20px_-10px_rgba(0,0,0,0.02)]">
              <div>
                <h2 className="text-base font-serif font-medium text-neutral-900 tracking-wide">
                  Masterpiece Vault
                </h2>
                <p className="text-amber-800 text-[11px] font-bold tracking-wider uppercase mt-0.5">
                  {loading ? 'Fetching Cluster...' : `${clientFilteredProducts.length} Editions Loaded`}
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

            {/* DYNAMIC VIEW MANAGEMENT */}
            {loading ? (
              <div className="py-24 text-center">
                <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-xs tracking-widest text-stone-400 uppercase animate-pulse">Synchronizing Saree Archives...</p>
              </div>
            ) : clientFilteredProducts.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-2xl p-16 text-center shadow-sm">
                <p className="text-stone-500 text-sm font-light">No drapes found matching your current selection criteria inside MongoDB.</p>
                <button
                  type="button"
                  onClick={() => setInStockOnly(false)}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider text-amber-800 hover:text-black transition-colors"
                >
                  View Full Archive Catalogue
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
                {clientFilteredProducts.map((saree: any) => (
                  <ProductCard
                    key={saree._id || saree.id} // 🌟 Fixed fallback to match dynamic MongoDB schema _id
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