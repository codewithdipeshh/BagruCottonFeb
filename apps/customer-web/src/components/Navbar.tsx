import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  Search,
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  User,
  LogOut,
  Heart,
  Sparkles,
  ShieldCheck,
  Loader2,
} from 'lucide-react';

import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';
import { getCart } from '../State/Cart/Action';

// Default Import
import favicon from '../assets/images/favicon.ico';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Sarees', path: '/sarees', hasDropdown: true },
  { name: 'New Arrivals', path: '/new-arrivals' },
  { name: 'Reviews', path: '/reviews' },
];

function isNavActive(pathname: string, path: string) {
  if (path === '/') return pathname === '/';
  if (path === '/sarees') {
    return pathname === '/sarees' || pathname.startsWith('/sarees/');
  }
  return pathname === path;
}

interface SareeCategory {
  slug: string;
  name: string;
  filterId: string;
  group: 'silk' | 'cotton';
}

const sareeCategories: SareeCategory[] = [
  { slug: 'cotton-mulmul', name: 'Mulmul Cotton Sarees', filterId: 'mulmul_cotton', group: 'cotton' },
  { slug: 'handblock', name: 'Cotton HandBlock Sarees', filterId: 'cotton_handblock', group: 'cotton' },
  { slug: 'linen-cotton', name: 'Cotton Linen Saree', filterId: 'cotton_linen', group: 'cotton' },
  { slug: 'maheshwari-silk', name: 'Maheshwari Silk Saree', filterId: 'maheshwari_silk', group: 'silk' },
  { slug: 'kota-doria', name: 'Kota Doria Silk', filterId: 'kota_doria', group: 'silk' },
  { slug: 'chanderi-bagru', name: 'Chanderi Silk Saree', filterId: 'chanderi_silk', group: 'silk' },
  { slug: 'temple-border', name: 'Temple Border Saree', filterId: 'temple_border', group: 'silk' },
  { slug: 'khadi-cotton', name: 'Khadi Cotton Saree', filterId: 'khadi_cotton', group: 'cotton' },
];

function computeLevenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
      }
    }
  }
  return dp[m][n];
}

function performFuzzyMatch(products: any[], query: string): any[] {
  const cleanQuery = query.toLowerCase().trim();
  const queryWords = cleanQuery.split(/\s+/).filter(Boolean);

  const matches = products.map((product) => {
    const title = (product.title || '').toLowerCase();
    const description = (product.description || '').toLowerCase();
    const titleWords = title.split(/\s+/).filter(Boolean);

    let score = 0;
    let containsAnyWord = false;

    for (const qWord of queryWords) {
      let bestWordScore = 999;
      let exactMatchFound = false;

      if (title.includes(qWord) || description.includes(qWord)) {
        containsAnyWord = true;
        exactMatchFound = true;
        score += 50;
      }

      if (!exactMatchFound) {
        for (const tWord of titleWords) {
          if (Math.abs(tWord.length - qWord.length) <= 2) {
            const distance = computeLevenshteinDistance(qWord, tWord);
            if (distance < bestWordScore) {
              bestWordScore = distance;
            }
          }
        }

        if (bestWordScore <= 2) {
          containsAnyWord = true;
          score += (3 - bestWordScore) * 10;
        }
      }
    }

    return { product, score, isValid: containsAnyWord };
  });

  return matches
    .filter((item) => item.isValid && item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
}

function performCategoryFuzzyMatch(categories: SareeCategory[], query: string): SareeCategory[] {
  const cleanQuery = query.toLowerCase().trim();
  const queryWords = cleanQuery.split(/\s+/).filter(Boolean);

  const matches = categories.map((category) => {
    const name = category.name.toLowerCase();
    const nameWords = name.split(/\s+/).filter(Boolean);

    let score = 0;
    let containsAnyWord = false;

    for (const qWord of queryWords) {
      let bestWordScore = 999;
      let exactMatchFound = false;

      if (name.includes(qWord)) {
        containsAnyWord = true;
        exactMatchFound = true;
        score += 50;
      }

      if (!exactMatchFound) {
        for (const nWord of nameWords) {
          if (Math.abs(nWord.length - qWord.length) <= 2) {
            const distance = computeLevenshteinDistance(qWord, nWord);
            if (distance < bestWordScore) {
              bestWordScore = distance;
            }
          }
        }

        if (bestWordScore <= 2) {
          containsAnyWord = true;
          score += (3 - bestWordScore) * 10;
        }
      }
    }

    return { category, score, isValid: containsAnyWord };
  });

  return matches
    .filter((item) => item.isValid && item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.category);
}

type SearchSuggestion =
  | { type: 'category'; data: SareeCategory }
  | { type: 'product'; data: any };

function getSuggestionKey(suggestion: SearchSuggestion): string {
  return suggestion.type === 'category'
    ? `category-${suggestion.data.slug}`
    : `products-${suggestion.data._id || suggestion.data.id}`;
}

function getSuggestionLink(suggestion: SearchSuggestion): string {
  return suggestion.type === 'category'
    ? `/sarees/${suggestion.data.slug}`
    : `/product/${suggestion.data._id || suggestion.data.id}`;
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const { jwt, user } = useSelector((state: any) => state.auth);
  const { cartItems } = useSelector((state: any) => state.cart);

  // Fix: Only consider logged in if both jwt exists AND user data is loaded
  const isLoggedIn = !!(jwt && user);
  
  // Real world logic: Use user's real name if logged in and data is available, otherwise default to empty string.
  const userName = user?.firstName || user?.name || '';
  
  const cartCount = cartItems?.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0) || 0;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSareesOpen, setIsSareesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSareesOpen, setIsMobileSareesOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  // Cache of all products fetched once, reused across every keystroke.
  const productsCacheRef = useRef<any[] | null>(null);
  const productsFetchPromiseRef = useRef<Promise<any[]> | null>(null);

  const profileRef = useRef<HTMLDivElement | null>(null);
  const sareeRef = useRef<HTMLDivElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollYRef = useRef(0);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCart());
    }
  }, [isLoggedIn, dispatch, cartItems?.length]);

  const ensureProductsLoaded = useCallback(async (): Promise<any[]> => {
    if (productsCacheRef.current) {
      return productsCacheRef.current;
    }
    if (productsFetchPromiseRef.current) {
      return productsFetchPromiseRef.current;
    }

    const fetchPromise = (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products?pageSize=100`);
        const products = res.data?.content || res.data || [];
        productsCacheRef.current = products;
        setSearchError(false);
        return products;
      } catch (err) {
        productsFetchPromiseRef.current = null;
        setSearchError(true);
        return [];
      }
    })();

    productsFetchPromiseRef.current = fetchPromise;
    return fetchPromise;
  }, []);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearchLoading(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    let isCancelled = false;
    setIsSearchLoading(true);

    const delayDebounce = setTimeout(async () => {
      const products = await ensureProductsLoaded();
      if (isCancelled) return;

      const categoryMatches = performCategoryFuzzyMatch(sareeCategories, trimmedQuery);
      const productMatches = performFuzzyMatch(products, trimmedQuery);

      const combined: SearchSuggestion[] = [
        ...categoryMatches.slice(0, 3).map((category) => ({ type: 'category' as const, data: category })),
        ...productMatches.slice(0, 6).map((product) => ({ type: 'product' as const, data: product })),
      ].slice(0, 6);

      setSuggestions(combined);
      setShowSuggestions(true);
      setActiveSuggestionIndex(-1);
      setIsSearchLoading(false);
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(delayDebounce);
    };
  }, [searchQuery, ensureProductsLoaded]);

  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout>;

    const closeDropdowns = () => {
      setIsSareesOpen(false);
      setIsProfileOpen(false);
      setShowSuggestions(false);
    };

    const hideNavbar = () => {
      setShowNavbar(false);
      closeDropdowns();
    };

    const showNavbarFn = () => {
      setShowNavbar(true);
    };

    const resetTimer = () => {
      clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(() => {
        if (window.scrollY > 150) {
          hideNavbar();
        }
      }, 4000);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;

      if (currentScrollY < 80) {
        showNavbarFn();
      } else if (currentScrollY > previousScrollY + 5) {
        hideNavbar();
      } else if (currentScrollY < previousScrollY - 5) {
        showNavbarFn();
      }

      lastScrollYRef.current = currentScrollY;
      resetTimer();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 80) {
        showNavbarFn();
        resetTimer();
      }
    };

    const handleActivity = () => {
      showNavbarFn();
      resetTimer();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleActivity, { passive: true });
    window.addEventListener('keydown', handleActivity);

    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  const closeAllMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsSareesOpen(false);
    setIsProfileOpen(false);
    setIsMobileSareesOpen(false);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
      navigate(getSuggestionLink(suggestions[activeSuggestionIndex]));
      closeAllMenus();
      return;
    }

    const q = searchQuery.trim();
    navigate(q ? `/sarees?search=${encodeURIComponent(q)}` : '/sarees');
    closeAllMenus();
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
    closeAllMenus();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (profileRef.current && !profileRef.current.contains(target)) setIsProfileOpen(false);
      if (sareeRef.current && !sareeRef.current.contains(target)) setIsSareesOpen(false);
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) setShowSuggestions(false);
    };

    document.addEventListener('mousedown', handleClickOutside, { passive: true });
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    closeAllMenus();
  }, [location.pathname, closeAllMenus]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const renderSuggestionsPanel = (variant: 'desktop' | 'mobile') => {
    const wrapperClass =
      variant === 'desktop'
        ? 'absolute top-[calc(100%+6px)] right-0 w-72 rounded-2xl bg-white shadow-2xl border border-stone-200 p-2 z-[9999] flex flex-col gap-1 text-left'
        : 'absolute top-[calc(100%+6px)] left-0 w-full rounded-2xl bg-white shadow-2xl border border-stone-200 p-2 z-[9999] flex flex-col gap-1 text-left';

    if (isSearchLoading) {
      return (
        <div className={wrapperClass}>
          <div className="flex items-center gap-2 px-3 py-3 text-xs text-stone-500">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Searching...
          </div>
        </div>
      );
    }

    if (searchError) {
      return (
        <div className={wrapperClass}>
          <div className="px-3 py-3 text-xs text-red-600">
            Couldn't load products. Please try again.
          </div>
        </div>
      );
    }

    if (suggestions.length === 0) {
      return (
        <div className={wrapperClass}>
          <div className="px-3 py-3 text-xs text-stone-500">
            No products found for "{searchQuery.trim()}"
          </div>
        </div>
      );
    }

    return (
      <div className={wrapperClass}>
        {variant === 'desktop' && (
          <div className="px-3 py-1.5 border-b border-stone-100">
            <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">Results</p>
          </div>
        )}
        <div className="max-h-64 overflow-y-auto space-y-0.5">
          {suggestions.map((suggestion, index) => {
            const isActive = activeSuggestionIndex === index;

            if (suggestion.type === 'category') {
              const category = suggestion.data;
              return (
                <Link
                  key={getSuggestionKey(suggestion)}
                  to={getSuggestionLink(suggestion)}
                  onClick={() => (variant === 'desktop' ? setShowSuggestions(false) : closeAllMenus())}
                  onMouseEnter={() => setActiveSuggestionIndex(index)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors no-underline group ${
                    isActive ? 'bg-stone-100' : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-neutral-900 truncate group-hover:text-amber-800 transition-colors">
                      {category.name}
                    </h5>
                    <p className="text-[10px] text-stone-500 mt-0.5">Collection</p>
                  </div>
                </Link>
              );
            }

            const product = suggestion.data;
            return (
              <Link
                key={getSuggestionKey(suggestion)}
                to={getSuggestionLink(suggestion)}
                onClick={() => (variant === 'desktop' ? setShowSuggestions(false) : closeAllMenus())}
                onMouseEnter={() => setActiveSuggestionIndex(index)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors no-underline group ${
                  isActive ? 'bg-stone-100' : 'hover:bg-stone-50'
                }`}
              >
                <img
                  src={product.imageUrl || product.imageUrls?.[0] || 'https://via.placeholder.com/40'}
                  alt={product.title}
                  className="w-9 h-9 object-cover rounded-lg bg-stone-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-semibold text-neutral-900 truncate group-hover:text-amber-800 transition-colors">
                    {product.title}
                  </h5>
                  <p className="text-[10px] text-stone-500 mt-0.5">
                    ₹{product.discountedPrice || product.price}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-[999] w-[95%] sm:w-[92%] lg:w-[90%] max-w-7xl select-none transition-all duration-500 ease-in-out ${
          showNavbar ? 'top-12 opacity-100 pointer-events-auto' : '-top-48 opacity-0 pointer-events-none'
        }`}
      >
        <div className="rounded-3xl border border-stone-200 bg-white shadow-md">

          <div className="rounded-t-3xl bg-neutral-900 text-white text-[10px] uppercase tracking-[0.2em] py-2 px-4 flex items-center justify-center">
            <div className="flex items-center gap-2 font-sans font-light">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Handcrafted by Master Artisans in Jaipur • Free Premium Shipping</span>
            </div>
          </div>

          <div className="px-6 py-4 flex items-center justify-between">

            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group no-underline">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-white border border-stone-200 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img
                  src={favicon}
                  alt="Bagru Cotton logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg lg:text-xl font-serif font-semibold text-neutral-900 leading-none tracking-wider">
                  BAGRU
                </h1>
                <p className="text-[7.5px] uppercase tracking-[0.4em] text-amber-700 mt-1 font-sans font-bold">
                  COTTON FEB
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <div
                      ref={sareeRef}
                      className="relative"
                      onMouseEnter={() => setIsSareesOpen(true)}
                      onMouseLeave={() => setIsSareesOpen(false)}
                    >
                      <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={isSareesOpen}
                        className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-1 border-none outline-none cursor-pointer ${isNavActive(location.pathname, item.path) || isSareesOpen
                          ? "bg-neutral-900 text-white shadow-sm"
                          : "text-neutral-700 bg-transparent hover:bg-stone-100"
                          }`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-300 ${isSareesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {isSareesOpen && (
                        <div className="absolute top-full left-0 lg:left-1/2 lg:-translate-x-1/2 pt-2 z-50">
                          <div className="w-[520px] max-w-[90vw] rounded-2xl bg-white shadow-2xl border border-stone-200 p-6">
                            <div className="grid grid-cols-2 gap-6 text-left">

                              <div className="space-y-2">
                                <h4 className="text-[10px] uppercase tracking-widest text-amber-700 font-bold border-b border-stone-100 pb-1 mb-2">
                                  Silk Masterpieces
                                </h4>
                                {sareeCategories
                                  .filter((c: SareeCategory) => c.group === 'silk')
                                  .map((cat: SareeCategory) => (
                                    <Link
                                      key={cat.slug}
                                      to={`/sarees/${cat.slug}`}
                                      className="block text-xs font-medium text-neutral-700 hover:text-amber-800 py-0.5 transition-colors no-underline"
                                    >
                                      {cat.name}
                                    </Link>
                                  ))
                                }
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-[10px] uppercase tracking-widest text-amber-700 font-bold border-b border-stone-100 pb-1 mb-2">
                                  Cotton Legacies
                                </h4>
                                {sareeCategories
                                  .filter((c: SareeCategory) => c.group === 'cotton')
                                  .map((cat: SareeCategory) => (
                                    <Link
                                      key={cat.slug}
                                      to={`/sarees/${cat.slug}`}
                                      className="block text-xs text-neutral-700 hover:text-black py-0.5 transition-colors no-underline"
                                    >
                                      {cat.name}
                                    </Link>
                                  ))
                                }
                              </div>

                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-colors no-underline inline-block ${isNavActive(location.pathname, item.path)
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'text-neutral-700 hover:bg-stone-100'
                        }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <div className="relative" ref={searchContainerRef}>
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="search"
                    placeholder="Search masterpieces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                    onKeyDown={handleSearchKeyDown}
                    className="w-40 h-9 pl-4 pr-9 rounded-full border border-stone-300 bg-stone-50 text-xs tracking-wide focus:outline-none focus:border-neutral-900 focus:bg-white transition-all focus:w-60"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black transition-colors border-none bg-transparent cursor-pointer" aria-label="Search">
                    {isSearchLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                  </button>
                </form>

                {showSuggestions && renderSuggestionsPanel('desktop')}
              </div>

              <Link to="/wishlist" className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-neutral-700 hover:text-red-500 hover:bg-stone-50 transition-colors no-underline" aria-label="Wishlist">
                <Heart className="w-4 h-4" />
              </Link>

              <Link to="/cart" className="relative w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors shadow-sm no-underline" aria-label="Cart">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-700 text-[9px] font-bold flex items-center justify-center text-white ring-1 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="h-9 px-3.5 rounded-full border border-stone-300 bg-white flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-neutral-900 hover:bg-stone-50 transition-colors border-none outline-none cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 opacity-70" />
                  {/* Clean Fallback Logic */}
                  <span>{userName ? userName : 'Account'}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute top-[calc(100%+6px)] right-0 w-44 rounded-xl bg-white shadow-2xl border border-stone-200 p-2 z-50 flex flex-col text-left gap-1">
                    {isLoggedIn ? (
                      <>
                        <div className="px-2 py-1 mb-1 border-b border-stone-100">
                          <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">My Account</p>
                          <p className="text-xs text-black font-semibold truncate">{userName ? userName : 'Patron'}</p>
                        </div>
                        <Link to="/profile" className="block px-2 py-1.5 text-xs text-neutral-700 hover:bg-stone-100 rounded-lg transition-colors no-underline">Profile</Link>
                        <Link to="/orders" className="block px-2 py-1.5 text-xs text-neutral-700 hover:bg-stone-100 rounded-lg transition-colors no-underline">Orders</Link>
                        <Link to="/account/security" className="black px-2 py-1.5 text-xs text-neutral-700 hover:bg-stone-100 rounded-lg transition-colors no-underline flex items-center gap-1.5 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-neutral-900" /> Security & 2FA
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg text-left font-semibold transition-colors border-none bg-transparent cursor-pointer outline-none">
                          <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block w-full text-center py-2 text-xs font-medium text-neutral-900 hover:bg-stone-100 rounded-lg transition-colors no-underline">Log In</Link>
                        <Link to="/signup" className="block w-full text-center py-2 text-xs font-bold bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg transition-all no-underline">Sign Up</Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <Link to="/wishlist" className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-neutral-700 hover:text-red-500 transition-colors no-underline" aria-label="Wishlist">
                <Heart className="w-4 h-4" />
              </Link>
              <Link to="/cart" className="relative w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors no-underline" aria-label="Cart">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-700 text-[9px] font-bold flex items-center justify-center text-white ring-1 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center active:scale-95 transition-transform border-none cursor-pointer outline-none"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden border-t border-stone-100 py-4 px-4 bg-white rounded-b-3xl space-y-4 text-left">
              <div className="relative w-full mb-2" ref={searchContainerRef}>
                <form onSubmit={handleSearch} className="relative w-full">
                  <input
                    type="search"
                    placeholder="Search masterpieces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                    onKeyDown={handleSearchKeyDown}
                    className="w-full h-10 pl-4 pr-10 rounded-xl border border-stone-300 bg-stone-50 text-xs tracking-wide focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black transition-colors border-none bg-transparent cursor-pointer" aria-label="Search">
                    {isSearchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  </button>
                </form>

                {showSuggestions && renderSuggestionsPanel('mobile')}
              </div>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-stone-50 py-1 last:border-none">
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setIsMobileSareesOpen((prev) => !prev)}
                          className="w-full flex justify-between items-center py-1.5 text-xs uppercase font-semibold text-neutral-900 border-none bg-transparent cursor-pointer outline-none"
                        >
                          <span>{item.name}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileSareesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isMobileSareesOpen && (
                          <div className="pl-3 py-1 space-y-1 mt-1 bg-stone-50 rounded-lg">
                            <Link to="/sarees" onClick={closeAllMenus} className="block py-1.5 text-xs font-semibold text-black no-underline">View All Collections</Link>
                            {sareeCategories.map((cat: SareeCategory) => (
                              <Link key={cat.slug} to={`/sarees/${cat.slug}`} onClick={closeAllMenus} className="block py-1.5 text-xs text-neutral-600 no-underline">
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link to={item.path} onClick={closeAllMenus} className="block py-1.5 text-xs uppercase font-semibold text-neutral-900 no-underline">
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <Link to="/account/security" onClick={closeAllMenus} className="w-full py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-neutral-900 text-center flex items-center justify-center gap-1.5 bg-stone-50 no-underline">
                      <ShieldCheck className="w-4 h-4 text-neutral-900" /> Security & 2FA
                    </Link>
                    <button onClick={handleLogout} className="w-full py-2 rounded-xl border border-red-200 text-xs font-medium text-red-600 text-center border-none bg-transparent cursor-pointer outline-none">
                      Logout ({userName})
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/login" onClick={closeAllMenus} className="py-2 border border-stone-200 rounded-xl text-center text-xs text-neutral-900 bg-stone-50 no-underline">Log In</Link>
                    <Link to="/signup" onClick={closeAllMenus} className="py-2 rounded-xl text-center text-xs font-bold bg-neutral-900 text-white no-underline">Sign Up</Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}