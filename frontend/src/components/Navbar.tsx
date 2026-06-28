import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';

import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  Search,
  Menu,
  X,
  ChevronDown,
  Globe,
  ShoppingBag,
  User,
  LogOut,
  Heart,
  Sparkles,
} from 'lucide-react';

import { useApp } from '../context/AppContext';

const languages = ['English', 'Hindi', 'Marathi'];

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

// 🌟 Strict TypeScript Interface for Categories to resolve type errors
interface SareeCategory {
  slug: string;
  name: string;
  filterId: string;
}

const sareeCategories: SareeCategory[] = [
  { slug: 'mulmul-cotton', name: 'Mulmul Cotton Sarees', filterId: 'mulmul_cotton' },
  { slug: 'cotton-handblock', name: 'Cotton HandBlock Sarees', filterId: 'cotton_handblock' },
  { slug: 'cotton-linen', name: 'Cotton Linen Saree', filterId: 'cotton_linen' },
  { slug: 'maheshwari-silk', name: 'Maheshwari Silk Saree', filterId: 'maheshwari_silk' },
  { slug: 'kota-doria-silk', name: 'Kota Doria Silk', filterId: 'kota_doria' },
  { slug: 'chanderi-silk', name: 'Chanderi Silk Saree', filterId: 'chanderi_silk' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isLoggedIn,
    userName,
    cartCount,
    logout,
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSareesOpen, setIsSareesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileSareesOpen, setIsMobileSareesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');

  const profileRef = useRef<HTMLDivElement | null>(null);
  const sareeRef = useRef<HTMLDivElement | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);
  const lastScrollYRef = useRef(0);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout>;

    const closeDropdowns = () => {
      setIsSareesOpen(false);
      setIsProfileOpen(false);
      setIsLangOpen(false);
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

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('mousemove', handleMouseMove);

    window.addEventListener('touchstart', handleActivity, {
      passive: true,
    });

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
    setIsLangOpen(false);
    setIsMobileSareesOpen(false);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/sarees?q=${encodeURIComponent(q)}` : '/sarees');
    closeAllMenus();
  };

  const handleLogout = () => {
    logout();
    closeAllMenus();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (profileRef.current && !profileRef.current.contains(target)) setIsProfileOpen(false);
      if (sareeRef.current && !sareeRef.current.contains(target)) setIsSareesOpen(false);
      if (langRef.current && !langRef.current.contains(target)) setIsLangOpen(false);
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

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-[999] w-[95%] sm:w-[92%] lg:w-[90%] max-w-7xl select-none transition-all duration-500 ease-in-out ${
          showNavbar ? 'top-12 opacity-100 pointer-events-auto' : '-top-48 opacity-0 pointer-events-none'
        }`}
      >
        <div className="rounded-3xl border border-stone-200 bg-white shadow-md">

          {/* TOP ANNOUNCEMENT TICKER */}
          <div className="rounded-t-3xl bg-neutral-900 text-white text-[10px] uppercase tracking-[0.2em] py-2 px-4 flex items-center justify-center">
            <div className="flex items-center gap-2 font-sans font-light">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Handcrafted by Master Artisans in Jaipur • Free Premium Shipping</span>
            </div>
          </div>

          <div className="px-6 py-4 flex items-center justify-between">

            {/* BRANDING GRAPHIC */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-11 h-11 rounded-xl bg-neutral-900 flex items-center justify-center transition-colors group-hover:bg-amber-800">
                <span className="text-white text-lg font-serif font-light tracking-widest">B</span>
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

            {/* DESKTOP NAV ITEMS */}
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
                        className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-1 ${isNavActive(location.pathname, item.path) || isSareesOpen
                          ? "bg-neutral-900 text-white shadow-sm"
                          : "text-neutral-700 hover:bg-stone-100"
                          }`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-300 ${isSareesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* STABLE DROP DOWN ROW GRID */}
                      {isSareesOpen && (
                        <div className="absolute top-full left-0 lg:left-1/2 lg:-translate-x-1/2 pt-2 z-50">
                          <div className="w-[520px] max-w-[90vw] rounded-2xl bg-white shadow-2xl border border-stone-200 p-6">
                            <div className="grid grid-cols-2 gap-6 text-left">
                              
                              <div className="space-y-2">
                                <h4 className="text-[10px] uppercase tracking-widest text-amber-700 font-bold border-b border-stone-100 pb-1 mb-2">
                                  Silk Masterpieces
                                </h4>
                                {sareeCategories
                                  .filter((c: SareeCategory) => c.slug.includes('silk') || c.slug.includes('doria'))
                                  .map((cat: SareeCategory) => (
                                    <Link 
                                      key={cat.slug} 
                                      to={`/sarees/${cat.slug}`} 
                                      className="block text-xs font-medium text-neutral-700 hover:text-amber-800 py-0.5 transition-colors"
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
                                  .filter((c: SareeCategory) => c.slug.includes('cotton') || c.slug.includes('mulmul') || c.slug.includes('handblock'))
                                  .map((cat: SareeCategory) => (
                                    <Link 
                                      key={cat.slug} 
                                      to={`/sarees/${cat.slug}`} 
                                      className="block text-xs text-neutral-700 hover:text-black py-0.5 transition-colors"
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
                      className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-colors ${isNavActive(location.pathname, item.path)
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

            {/* UTILITY CONTROL RACK */}
            <div className="hidden lg:flex items-center gap-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="search"
                  placeholder="Search masterpieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 h-9 pl-4 pr-9 rounded-full border border-stone-300 bg-stone-50 text-xs tracking-wide focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black transition-colors" aria-label="Search">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className="h-9 px-3 rounded-full border border-stone-300 bg-white flex items-center gap-1 text-[11px] uppercase tracking-wider text-neutral-700 hover:bg-stone-50 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 opacity-70" />
                  <span>{selectedLang}</span>
                </button>

                {isLangOpen && (
                  <div className="absolute top-[calc(100%+6px)] right-0 w-28 rounded-xl bg-white shadow-xl border border-stone-200 p-1 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setSelectedLang(lang);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedLang === lang ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-stone-100'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/wishlist" className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-neutral-700 hover:text-red-500 hover:bg-stone-50 transition-colors" aria-label="Wishlist">
                <Heart className="w-4 h-4" />
              </Link>

              <Link to="/cart" className="relative w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors shadow-sm" aria-label="Cart">
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
                  className="h-9 px-3.5 rounded-full border border-stone-300 bg-white flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-neutral-900 hover:bg-stone-50 transition-colors"
                >
                  <User className="w-3.5 h-3.5 opacity-70" />
                  <span>{isLoggedIn ? userName || 'Patron' : 'Account'}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute top-[calc(100%+6px)] right-0 w-44 rounded-xl bg-white shadow-2xl border border-stone-200 p-2 z-50 flex flex-col text-left gap-1">
                    {isLoggedIn ? (
                      <>
                        <div className="px-2 py-1 mb-1 border-b border-stone-100">
                          <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold">Portal</p>
                          <p className="text-xs text-black font-semibold truncate">{userName || 'Patron'}</p>
                        </div>
                        <Link to="/profile" className="block px-2 py-1.5 text-xs text-neutral-700 hover:bg-stone-100 rounded-lg transition-colors">Profile</Link>
                        <Link to="/orders" className="block px-2 py-1.5 text-xs text-neutral-700 hover:bg-stone-100 rounded-lg transition-colors">Orders</Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg text-left font-semibold transition-colors">
                          <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block w-full text-center py-2 text-xs font-medium text-neutral-900 hover:bg-stone-100 rounded-lg transition-colors">Log In</Link>
                        <Link to="/signup" className="block w-full text-center py-2 text-xs font-bold bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg transition-all">Sign Up</Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* MOBILE INTERACTION HUD */}
            <div className="lg:hidden flex items-center gap-2">
              <Link to="/wishlist" className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-neutral-700 hover:text-red-500 transition-colors" aria-label="Wishlist">
                <Heart className="w-4 h-4" />
              </Link>
              <Link to="/cart" className="relative w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors" aria-label="Cart">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-700 text-[9px] font-bold flex items-center justify-center text-white ring-1 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center active:scale-95 transition-transform"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* MOBILE NAVIGATION TRAY */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-stone-100 py-4 px-4 bg-white rounded-b-3xl space-y-4 text-left">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-stone-50 py-1 last:border-none">
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setIsMobileSareesOpen((prev) => !prev)}
                          className="w-full flex justify-between items-center py-1.5 text-xs uppercase font-semibold text-neutral-900"
                        >
                          <span>{item.name}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileSareesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isMobileSareesOpen && (
                          <div className="pl-3 py-1 space-y-1 mt-1 bg-stone-50 rounded-lg">
                            <Link to="/sarees" onClick={closeAllMenus} className="block py-1.5 text-xs font-semibold text-black">View All Collections</Link>
                            {sareeCategories.map((cat: SareeCategory) => (
                              <Link key={cat.slug} to={`/sarees/${cat.slug}`} onClick={closeAllMenus} className="block py-1.5 text-xs text-neutral-600">
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link to={item.path} onClick={closeAllMenus} className="block py-1.5 text-xs uppercase font-semibold text-neutral-900">
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="w-full py-2 rounded-xl border border-red-200 text-xs font-medium text-red-600 text-center">
                    Logout ({userName})
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/login" onClick={closeAllMenus} className="py-2 border border-stone-200 rounded-xl text-center text-xs text-neutral-900 bg-stone-50">Log In</Link>
                    <Link to="/signup" onClick={closeAllMenus} className="py-2 rounded-xl text-center text-xs font-bold bg-neutral-900 text-white">Sign Up</Link>
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