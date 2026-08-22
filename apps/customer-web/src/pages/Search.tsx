import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon, X, ArrowRight, Sparkles } from 'lucide-react';
import { findProducts } from '../State/Product/Action';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function Search() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q')?.trim() || '';
  
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const { products, loading } = useSelector((state: any) => state.product);

  useEffect(() => {
    // Fetch all products for search
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

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const searchResults = useMemo(() => {
    if (!searchQuery || !products) return [];
    
    const rawList = Array.isArray(products) 
      ? products 
      : products?.content || products?.products || [];

    const query = searchQuery.toLowerCase();

    return rawList.filter((item: any) => {
      const title = (item?.title || item?.name || '').toLowerCase();
      const description = (item?.description || '').toLowerCase();
      const category = typeof item?.category === 'object' 
        ? (item?.category?.name || '').toLowerCase() 
        : (item?.category || '').toLowerCase();
      const fabric = (item?.fabric || '').toLowerCase();
      const tags = Array.isArray(item?.tags) 
        ? item.tags.join(' ').toLowerCase() 
        : (item?.tags || '').toLowerCase();

      return (
        title.includes(query) ||
        description.includes(query) ||
        category.includes(query) ||
        fabric.includes(query) ||
        tags.includes(query) ||
        query.includes(title.split(' ')[0]) || // Partial word match
        query.includes(category.split(' ')[0])
      );
    });
  }, [products, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = localSearchQuery.trim();
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
      navigate('/sarees');
    }
  };

  const clearSearch = () => {
    setLocalSearchQuery('');
    setSearchParams({});
    navigate('/sarees');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-8 text-left">
      {/* Search Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-16 text-center">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#9A7B56]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F7DA96]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#F7DA96] text-[11px] uppercase tracking-widest font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#F7DA96]" />
            Search Our Collection
          </span>
          
          <h1 className="text-4xl md:text-5xl font-serif font-light text-white tracking-wide mb-6">
            Find Your Perfect <span className="text-[#F7DA96]">Drape</span>
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="search"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Search for sarees, fabrics, colors..."
                className="w-full pl-12 pr-24 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:border-[#F7DA96] focus:ring-2 focus:ring-[#F7DA96]/20 transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {localSearchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-2 text-stone-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F7DA96] text-neutral-900 rounded-full text-sm font-semibold hover:bg-[#B8956E] transition-colors flex items-center gap-2"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Search Stats */}
          {searchQuery && (
            <p className="mt-6 text-stone-300 text-sm">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `No results found for "${searchQuery}"`
              }
            </p>
          )}
        </div>
      </section>

      {/* Search Results */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {!searchQuery ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full border border-stone-200 flex items-center justify-center bg-white shadow-sm">
              <SearchIcon className="w-8 h-8 text-stone-400" />
            </div>
            <h2 className="text-2xl font-serif text-stone-900 font-light tracking-wide mb-3">
              Start Your Search
            </h2>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              Enter keywords like "silk", "cotton", "handblock", or specific colors to find your perfect saree.
            </p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#9A7B56] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-stone-500 text-sm">Searching our collection...</p>
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-serif text-stone-900 font-light tracking-wide">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-stone-500 text-sm mt-2">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product: any) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full border border-stone-200 flex items-center justify-center bg-white shadow-sm">
              <SearchIcon className="w-8 h-8 text-stone-400" />
            </div>
            <h2 className="text-2xl font-serif text-stone-900 font-light tracking-wide mb-3">
              No Results Found
            </h2>
            <p className="text-stone-500 text-sm max-w-md mx-auto mb-8">
              We couldn't find any products matching "{searchQuery}". Try different keywords or browse our categories.
            </p>
            <button
              onClick={clearSearch}
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-[#9A7B56] transition-colors text-sm font-semibold"
            >
              <span>Browse All Sarees</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}