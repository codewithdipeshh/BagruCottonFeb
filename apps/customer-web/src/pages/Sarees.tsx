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
import { getCategoryBySlug } from '../data/sareeCategories';

export default function Sarees() {
  const dispatch = useDispatch<any>();
  const { category: categorySlug } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('q')?.trim() ?? '';

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [inStockOnly, setInStockOnly] = useState(true);
  const [isAvailabilityExpanded, setIsAvailabilityExpanded] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  const { products, loading } = useSelector((state: any) => state.product);
  const currentCategoryConfig = getCategoryBySlug(categorySlug);

  useEffect(() => {
    const reqData = {
      category: '', 
      colors: '',
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      stock: inStockOnly ? 'in_stock' : '',
      pageNumber: 0,
      pageSize: 100 
    };

    dispatch(findProducts(reqData));
  }, [categorySlug, searchQuery, inStockOnly, dispatch]); 

  const finalProductsList = Array.isArray(products) 
    ? products 
    : products?.content || [];

  const clientFilteredProducts = finalProductsList.filter((saree: any) => {
    let matchesCategory = true;
    
    if (categorySlug && categorySlug !== 'sarees' && categorySlug.trim() !== '') {
      if (currentCategoryConfig) {
        const dbCategoryName = saree.category && typeof saree.category === 'object'
          ? (saree.category.name || '').toLowerCase().trim()
          : '';
        const dbCategorySlug = saree.category && typeof saree.category === 'object'
          ? (saree.category.slug || '').toLowerCase().trim()
          : '';
        const dbCategoryId = saree.category && typeof saree.category === 'object'
          ? (saree.category._id || '').toString()
          : (saree.category || '').toString();

        const targetSlug = categorySlug.toLowerCase().trim();
        const targetFilterId = currentCategoryConfig.filterId.toLowerCase().trim();
        const targetCleanName = currentCategoryConfig.name.toLowerCase().trim();

        matchesCategory = 
          dbCategorySlug === targetSlug || 
          dbCategorySlug === targetSlug.replace('-', '_') ||
          dbCategoryId === targetFilterId ||
          dbCategoryName === targetCleanName ||
          dbCategoryName.includes(targetSlug.replace('-', ' '));
      }
    }

    if (!matchesCategory) return false;

    if (!searchQuery && inStockOnly) {
      const isOutOfStock = saree.stock === 'out_of_stock' || saree.quantity === 0;
      if (isOutOfStock) return false;
    }

    if (!searchQuery) return true;

    const searchTokens = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    const titleText = (saree.title || saree.name || '').toLowerCase();
    const descriptionText = (saree.description || saree.philosophy || '').toLowerCase();
    const categoryNameText = saree.category && typeof saree.category === 'object' 
      ? (saree.category.name || '').toLowerCase() 
      : '';

    const combinedProductText = `${titleText} ${descriptionText} ${categoryNameText}`;

    return searchTokens.every(token => combinedProductText.includes(token));
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-4 sm:pt-8">
      <section className="relative overflow-hidden bg-neutral-900 py-12 sm:py-20 text-center">
        <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-[#F7DA96] text-[10px] uppercase tracking-widest font-medium mb-3">
            <Sparkles className="w-3 h-3 text-[#F7DA96]" /> The Luxury Catalog Vault
          </span>

          <h1 className="text-2xl sm:text-5xl font-serif font-light text-white mb-3 tracking-wide leading-tight">
            {currentCategoryConfig ? currentCategoryConfig.name : 'The Heritage Collection'}
          </h1>

          <p className="text-stone-400 max-w-xl mx-auto text-[11px] sm:text-sm font-light tracking-wide leading-relaxed">
            Explore authentic handloom masterpieces dyed organically and stamped individually via ancestral block carving metrics.
          </p>

          {searchQuery && (
            <p className="mt-3 text-[#F7DA96] text-[10px] font-medium tracking-wider uppercase">
              Filtered Archive For &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-10">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-stone-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 sticky top-36 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.02)] text-left">
              <button
                type="button"
                onClick={() => setIsAvailabilityExpanded((prev) => !prev)}
                className="w-full flex items-center justify-between text-[11px] uppercase tracking-wider text-stone-900 font-bold border-b border-stone-100 pb-2.5 mb-3 focus:outline-none"
              >
                <span>Availability</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-300 ${
                    isAvailabilityExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isAvailabilityExpanded ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-neutral-900 border-stone-300 rounded cursor-pointer transition-all focus:ring-0"
                  />
                  <label
                    htmlFor="inStock"
                    className="text-[11px] font-medium text-neutral-800 cursor-pointer select-none tracking-wide"
                  >
                    Filter In stock Only
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white border border-stone-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 flex items-center justify-between shadow-[0_4px_20px_-10px_rgba(0,0,0,0.02)]">
              <div>
                <h2 className="text-sm sm:text-base font-serif font-medium text-neutral-900 tracking-wide">
                  Masterpiece Vault
                </h2>
                <p className="text-amber-800 text-[9px] sm:text-[11px] font-bold tracking-wider uppercase mt-0.5">
                  {loading ? 'Fetching Cluster...' : `${clientFilteredProducts.length} Editions Loaded`}
                </p>
              </div>

              <div className="hidden sm:flex gap-2">
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

            {loading ? (
              <div className="py-24 text-center">
                <div className="w-7 h-7 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-[10px] tracking-widest text-stone-400 uppercase animate-pulse">Synchronizing Saree Archives...</p>
              </div>
            ) : clientFilteredProducts.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-xl p-10 text-center shadow-sm">
                <p className="text-stone-500 text-xs font-light">No drapes found matching your current selection criteria inside MongoDB.</p>
                <button
                  type="button"
                  onClick={() => setInStockOnly(false)}
                  className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-amber-800"
                >
                  View Full Archive Catalogue
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8'
                    : 'space-y-4 sm:space-y-6'
                }
              >
                {clientFilteredProducts.map((saree: any) => (
                  <ProductCard
                    key={saree._id || saree.id} 
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