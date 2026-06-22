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
  ArrowRight,
} from 'lucide-react';

import { sareeCategories } from '../data/sareeCategories';
import { useApp } from '../context/AppContext';

// Language selection options
const languages = ['English', 'Hindi', 'Marathi'];

// Navigation configurations (Excluding Blog/About as requested)
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Sarees', path: '/sarees', hasDropdown: true },
  { name: 'New Arrivals', path: '/new-arrivals' },
  { name: 'Reviews', path: '/reviews' },
];

function isNavActive(pathname: string, path: string) {
  if (path === '/') return pathname === '/';

  if (path === '/sarees') {
    return (
      pathname === '/sarees' ||
      pathname.startsWith('/sarees/')
    );
  }

  return pathname === path;
}

const TOP_REVEAL_ZONE_PX = 90;

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // App Context hooks (Preserved exactly)
  const {
    isLoggedIn,
    userName,
    cartCount,
    logout,
  } = useApp();

  // Navigation Panel visibility states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSareesOpen, setIsSareesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileSareesOpen, setIsMobileSareesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');

  // Auto-hide States & Reference Nodes
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus and Click-Outside Boundaries
  const profileRef = useRef<HTMLDivElement | null>(null);
  const sareeRef = useRef<HTMLDivElement | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  // Active interaction lock check to prevent autohide conflicts
  const isAnyMenuOpen = isMenuOpen || isSareesOpen || isProfileOpen || isLangOpen;

  // ------------------------
  // ACTIONS & DISMISSALS
  // ------------------------

  const closeAllMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsSareesOpen(false);
    setIsProfileOpen(false);
    setIsLangOpen(false);
    setIsMobileSareesOpen(false);
  }, []);

  const closeDesktopDropdowns = useCallback(() => {
    setIsSareesOpen(false);
    setIsProfileOpen(false);
    setIsLangOpen(false);
  }, []);

  const hideNavbar = useCallback(() => {
    // Only hide if the user is not actively interacting with a floating drop panel
    if (!isAnyMenuOpen) {
      closeDesktopDropdowns();
      setShowNavbar(false);
    }
  }, [closeDesktopDropdowns, isAnyMenuOpen]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(
      q ? `/sarees?q=${encodeURIComponent(q)}` : '/sarees'
    );
    closeAllMenus();
  };

  const handleLogout = () => {
    logout();
    closeAllMenus();
  };

  // ------------------------
  // AUTO HIDE NAVBAR WITH INTERACTION MUTING
  // ------------------------

  useEffect(() => {
    const startTimer = () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      // Lock navbar to visible state if any panel is actively expanded
      if (isAnyMenuOpen) return;

      hideTimer.current = setTimeout(() => {
        hideNavbar();
      }, 4000);
    };

    const revealNavbar = () => {
      setShowNavbar(true);
      startTimer();
    };

    // Initialize timer on render/state changes
    startTimer();

    const handleScroll = () => {
      const current = window.scrollY;

      if (current < lastScrollY.current) {
        // Scrolling UP
        revealNavbar();
      } else if (
        current > lastScrollY.current &&
        current > 80 &&
        !isAnyMenuOpen
      ) {
        // Scrolling DOWN and no dropdowns are open
        hideNavbar();
      }

      lastScrollY.current = current;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= TOP_REVEAL_ZONE_PX) {
        revealNavbar();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, [isAnyMenuOpen, hideNavbar]);

  useEffect(() => {
    if (!showNavbar) {
      closeDesktopDropdowns();
    }
  }, [showNavbar, closeDesktopDropdowns]);

  // ------------------------
  // CLICK OUTSIDE CLOSE
  // ------------------------

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }

      if (sareeRef.current && !sareeRef.current.contains(target)) {
        setIsSareesOpen(false);
      }

      if (langRef.current && !langRef.current.contains(target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ------------------------
  // BODY SCROLL LOCK
  // ------------------------

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // ------------------------
  // ROUTE CHANGE
  // ------------------------

  useEffect(() => {
    closeAllMenus();
    setShowNavbar(true);
  }, [location.pathname, closeAllMenus]);

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 z-[999]
        w-[96%] sm:w-[94%] lg:w-[92%] xl:w-[88%] max-w-7xl
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform
        ${
          showNavbar
            ? '-translate-x-1/2 translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-x-1/2 -translate-y-[140%] opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="rounded-[32px]
          border border-white/35
          bg-[#F8F4EE]/90
          backdrop-blur-2xl
          shadow-[0_15px_50px_-15px_rgba(26,18,12,0.12)]
          transition-all duration-300"
        >
          <div className="px-5 sm:px-8">
            <div className="flex items-center justify-between h-[86px]">
              
              {/* LOGO DESIGN (High-end Serif Motif) */}
              <Link
                to="/"
                className="flex items-center gap-3.5 flex-shrink-0 group select-none"
              >
                <div className="w-12 h-12 rounded-[20px] bg-[#080616] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <span className="text-[#F8F4EE] text-xl font-serif font-light tracking-wider">
                    B
                  </span>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-[20px] lg:text-[23px] font-serif font-bold text-[#080616] leading-none tracking-[0.05em]">
                    BAGRU
                  </h1>
                  <p className="text-[8px] uppercase tracking-[4px] text-[#A68F81] mt-1.5 font-sans font-semibold">
                    Atelier Jaipur
                  </p>
                </div>
              </Link>

              {/* DESKTOP NAVIGATION CHIPS */}
              <div className="hidden lg:flex items-center gap-1.5">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div className="relative" ref={sareeRef}>
                        <button
                          type="button"
                          onClick={() => setIsSareesOpen(!isSareesOpen)}
                          className={`px-5 py-3 rounded-full text-[13px] xl:text-[14px] font-medium tracking-[0.05em] uppercase transition-all duration-300 flex items-center gap-1.5 ${
                            isNavActive(location.pathname, item.path)
                              ? 'bg-[#080616] text-white shadow-md'
                              : 'text-[#3B2F2F] hover:bg-[#EFE7DD] hover:text-[#080616]'
                          }`}
                        >
                          {item.name}
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isSareesOpen ? 'rotate-180 text-amber-600' : 'opacity-70'}`} />
                        </button>

                        {/* DESKTOP PREMIUM MEGA MENU CONTAINER */}
                        {showNavbar && isSareesOpen && (
                          <div className="absolute top-[calc(100%+14px)] -left-48 w-[720px] rounded-[28px] bg-[#FDFBF7] shadow-[0_25px_60px_-15px_rgba(26,18,12,0.18)] border border-stone-200/50 p-6 z-50 animate-in fade-in slide-in-from-top-3 duration-300">
                            <div className="grid grid-cols-12 gap-6">
                              
                              {/* Left & Mid Side Categories */}
                              <div className="col-span-8 grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <h4 className="text-[10px] uppercase tracking-widest text-[#A68F81] font-bold border-b border-stone-200/50 pb-2 mb-3">
                                    Atelier Collections
                                  </h4>
                                  <Link
                                    to="/sarees"
                                    onClick={() => setIsSareesOpen(false)}
                                    className="block px-3 py-2 rounded-xl text-[13px] font-semibold text-[#080616] hover:bg-[#F7F3EE] transition-colors"
                                  >
                                    View All Sarees
                                  </Link>
                                  <Link
                                    to="/sarees?q=New"
                                    onClick={() => setIsSareesOpen(false)}
                                    className="block px-3 py-2 rounded-xl text-[13px] font-medium text-amber-800 hover:bg-[#F7F3EE] transition-colors"
                                  >
                                    New Collection ✦
                                  </Link>
                                  <Link
                                    to="/sarees?q=Festive"
                                    onClick={() => setIsSareesOpen(false)}
                                    className="block px-3 py-1.5 rounded-xl text-[13px] text-gray-700 hover:text-[#080616] hover:bg-[#F7F3EE] transition-colors"
                                  >
                                    Festive Collection
                                  </Link>
                                  <Link
                                    to="/sarees?q=Indigo"
                                    onClick={() => setIsSareesOpen(false)}
                                    className="block px-3 py-1.5 rounded-xl text-[13px] text-gray-700 hover:text-[#080616] hover:bg-[#F7F3EE] transition-colors"
                                  >
                                    Indigo Collection
                                  </Link>
                                </div>

                                <div className="space-y-2">
                                  <h4 className="text-[10px] uppercase tracking-widest text-[#A68F81] font-bold border-b border-stone-200/50 pb-2 mb-3">
                                    Browse Heritage Crafts
                                  </h4>
                                  <Link
                                    to="/sarees?q=Cotton"
                                    onClick={() => setIsSareesOpen(false)}
                                    className="block px-3 py-1.5 rounded-xl text-[13px] text-gray-700 hover:text-[#080616] hover:bg-[#F7F3EE] transition-colors"
                                  >
                                    Cotton Sarees
                                  </Link>
                                  <Link
                                    to="/sarees?q=Hand+Block"
                                    onClick={() => setIsSareesOpen(false)}
                                    className="block px-3 py-1.5 rounded-xl text-[13px] text-gray-700 hover:text-[#080616] hover:bg-[#F7F3EE] transition-colors"
                                  >
                                    Hand Block Print
                                  </Link>
                                  <Link
                                    to="/sarees?q=Bagru"
                                    onClick={() => setIsSareesOpen(false)}
                                    className="block px-3 py-1.5 rounded-xl text-[13px] text-gray-700 hover:text-[#080616] hover:bg-[#F7F3EE] transition-colors"
                                  >
                                    Bagru Print
                                  </Link>
                                  <div className="pt-2">
                                    <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400 block px-3">Dynamic Categories</span>
                                    {sareeCategories.slice(0, 2).map((category) => (
                                      <Link
                                        key={category.slug}
                                        to={`/sarees/${category.slug}`}
                                        onClick={() => setIsSareesOpen(false)}
                                        className="block px-3 py-1 rounded-xl text-[12px] text-gray-500 hover:text-[#080616] hover:bg-[#F7F3EE] transition-colors"
                                      >
                                        {category.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Right Side Editorial Highlight */}
                              <div className="col-span-4 bg-[#F5ECE2] rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative group">
                                <div className="space-y-1">
                                  <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-amber-800">
                                    Craft Spotlight
                                  </span>
                                  <h5 className="font-serif font-bold text-sm text-[#080616]">
                                    Jaipur Indigo Handlooms
                                  </h5>
                                  <p className="text-[11px] text-stone-600 font-sans leading-snug pt-1">
                                    Preserving ancestral wooden hand-block prints using pure vegetable dyes.
                                  </p>
                                </div>
                                <Link
                                  to="/sarees"
                                  onClick={() => setIsSareesOpen(false)}
                                  className="text-[11px] font-semibold tracking-wider uppercase text-amber-900 flex items-center gap-1 hover:gap-2 mt-4 transition-all"
                                >
                                  Discover Craft &rarr;
                                </Link>
                              </div>

                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`px-5 py-3 rounded-full text-[13px] xl:text-[14px] font-medium tracking-[0.05em] uppercase transition-all duration-300 ${
                          isNavActive(location.pathname, item.path)
                            ? 'bg-[#080616] text-white shadow-md'
                            : 'text-[#3B2F2F] hover:bg-[#EFE7DD] hover:text-[#080616]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE INTERACTION DECK */}
              <div className="hidden lg:flex items-center gap-4">
                
                {/* ADVANCED LUXURY SEARCH BAR */}
                <form
                  onSubmit={handleSearch}
                  className="relative hidden xl:block"
                >
                  <input
                    type="search"
                    placeholder="Search master drapes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 h-11 pl-4 pr-11 rounded-full border border-stone-200 bg-[#FAF8F5]/80 text-xs tracking-wider focus:outline-none focus:border-[#080616] focus:w-56 focus:bg-white transition-all duration-300"
                  />

                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform text-[#080616]/70 hover:text-[#080616]"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                {/* LANGUAGE SELECTION */}
                <div className="relative" ref={langRef}>
                  <button
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="h-11 px-4 rounded-full border border-stone-200 bg-white/80 flex items-center gap-1.5 text-xs tracking-widest uppercase font-medium text-gray-700 hover:text-[#080616] hover:bg-[#EFE7DD] transition-all"
                  >
                    <Globe className="w-4 h-4 opacity-75" />
                    {selectedLang}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {showNavbar && isLangOpen && (
                    <div className="absolute top-[calc(100%+8px)] right-0 mt-1 w-36 rounded-2xl bg-white shadow-xl border border-stone-200/50 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-250">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setSelectedLang(lang);
                            setIsLangOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs tracking-wider uppercase font-medium transition-colors ${
                            selectedLang === lang
                              ? 'bg-[#080616] text-[#F8F4EE]'
                              : 'text-gray-700 hover:bg-[#F6EFE7]'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* LUXURY WISHLIST TRIGGER */}
                <Link
                  to="/wishlist"
                  className="w-11 h-11 rounded-full bg-white/80 border border-stone-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-[#080616] hover:text-red-500 hover:border-red-100"
                >
                  <Heart className="w-4.5 h-4.5 transition-colors" />
                </Link>

                {/* PREMIUM CART INDICATOR */}
                <Link
                  to="/cart"
                  className="relative w-11 h-11 rounded-full bg-[#080616] text-[#F8F4EE] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md hover:bg-amber-900"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />

                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-600 text-[10px] font-sans font-bold flex items-center justify-center text-white ring-2 ring-[#F8F4EE] animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* LUXURY ACCOUNT CONTROL PANEL */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="h-11 px-4 rounded-full border border-stone-200 bg-white/80 flex items-center gap-1.5 text-xs tracking-widest uppercase font-medium text-[#080616] hover:bg-[#EFE7DD] transition-all"
                  >
                    <User className="w-4 h-4 opacity-75" />
                    <span>
                      {isLoggedIn ? userName || 'Client' : 'Account'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  </button>

                  {showNavbar && isProfileOpen && (
                    <div className="absolute top-[calc(100%+8px)] right-0 mt-1 w-56 rounded-3xl bg-white shadow-2xl border border-stone-100 p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                      {isLoggedIn ? (
                        <>
                          <div className="px-3 pb-2 mb-2 border-b border-stone-100">
                            <p className="text-[9px] uppercase tracking-widest text-[#A68F81] font-bold">Patron Portal</p>
                            <p className="text-xs text-[#080616] font-semibold truncate pt-0.5">{userName || 'Our Client'}</p>
                          </div>
                          
                          <Link
                            to="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-3 py-2 rounded-xl text-xs tracking-wider uppercase font-medium hover:bg-[#F7F3EE] text-[#3B2F2F] hover:text-[#080616] transition-colors"
                          >
                            My Profile
                          </Link>

                          <Link
                            to="/orders"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-3 py-2 rounded-xl text-xs tracking-wider uppercase font-medium hover:bg-[#F7F3EE] text-[#3B2F2F] hover:text-[#080616] transition-colors"
                          >
                            My Orders
                          </Link>

                          <Link
                            to="/wishlist"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-3 py-2 rounded-xl text-xs tracking-wider uppercase font-medium hover:bg-[#F7F3EE] text-[#3B2F2F] hover:text-[#080616] transition-colors"
                          >
                            Wishlist
                          </Link>

                          <div className="border-t border-stone-100 my-2" />

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-3 py-2.5 rounded-xl text-xs tracking-wider uppercase font-semibold hover:bg-[#F7F3EE] text-[#080616] transition-colors"
                          >
                            Login
                          </Link>

                          <Link
                            to="/signup"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-3 py-2.5 mt-1 rounded-xl text-xs tracking-wider uppercase font-bold bg-[#080616] text-[#F8F4EE] hover:bg-amber-900 text-center transition-all"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* MOBILE HAMBURGER ICON BUTTON */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-11 h-11 rounded-full bg-[#080616] text-[#F8F4EE] flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* RESPONSIVE FULL SCREEN MOBILE MENU DRAWER */}
            {isMenuOpen && (
              <div className="lg:hidden border-t border-stone-200/50 py-6 max-h-[75vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                
                {/* SEARCH INPUT */}
                <form
                  onSubmit={handleSearch}
                  className="px-2 mb-6"
                >
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search heritage sarees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-4 pr-11 rounded-full border border-stone-200 bg-white focus:outline-none focus:border-[#080616]"
                    />

                    <button
                      type="submit"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
                    >
                      <Search className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </form>

                {/* PRIMARY NAVIGATION LINKS */}
                <div className="space-y-1.5 px-1">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <div className="rounded-2xl overflow-hidden bg-[#FAF8F5] border border-stone-200/40">
                          <button
                            onClick={() => setIsMobileSareesOpen(!isMobileSareesOpen)}
                            className="w-full flex justify-between items-center px-4 py-3.5 text-sm uppercase tracking-wider font-semibold text-[#080616] hover:bg-[#F5EEE6] transition-colors"
                          >
                            <span>{item.name}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
                                isMobileSareesOpen ? 'rotate-180 text-amber-800' : 'opacity-70'
                              }`}
                            />
                          </button>

                          {isMobileSareesOpen && (
                            <div className="bg-[#FAF8F5] border-t border-stone-200/30 py-2 pl-3 pr-2 space-y-1 animate-in fade-in duration-200">
                              <Link
                                to="/sarees"
                                onClick={closeAllMenus}
                                className="block px-4 py-2.5 text-sm font-semibold text-[#080616] rounded-xl hover:bg-[#F5EEE6]"
                              >
                                View All Sarees
                              </Link>
                              <Link
                                to="/sarees?q=Cotton"
                                onClick={closeAllMenus}
                                className="block px-4 py-2 text-sm text-[#4E3F3F] rounded-xl hover:bg-[#F5EEE6]"
                              >
                                Cotton Sarees
                              </Link>
                              <Link
                                  to="/sarees?q=Hand+Block"
                                  onClick={closeAllMenus}
                                  className="block px-4 py-2 text-sm text-[#4E3F3F] rounded-xl hover:bg-[#F5EEE6]"
                              >
                                Hand Block Print
                              </Link>
                              <Link
                                  to="/sarees?q=Bagru"
                                  onClick={closeAllMenus}
                                  className="block px-4 py-2 text-sm text-[#4E3F3F] rounded-xl hover:bg-[#F5EEE6]"
                              >
                                Bagru Print
                              </Link>
                              <Link
                                  to="/sarees?q=Indigo"
                                  onClick={closeAllMenus}
                                  className="block px-4 py-2 text-sm text-[#4E3F3F] rounded-xl hover:bg-[#F5EEE6]"
                              >
                                Indigo Collection
                              </Link>
                              <Link
                                  to="/sarees?q=Festive"
                                  onClick={closeAllMenus}
                                  className="block px-4 py-2 text-sm text-[#4E3F3F] rounded-xl hover:bg-[#F5EEE6]"
                              >
                                Festive Collection
                              </Link>
                              <Link
                                  to="/sarees?q=New"
                                  onClick={closeAllMenus}
                                  className="block px-4 py-2 text-sm text-[#4E3F3F] rounded-xl hover:bg-[#F5EEE6]"
                              >
                                New Collection
                              </Link>
                              
                              {sareeCategories.slice(0, 3).map((category) => (
                                <Link
                                  key={category.slug}
                                  to={`/sarees/${category.slug}`}
                                  onClick={closeAllMenus}
                                  className="block px-4 py-2 text-sm text-stone-500 rounded-xl hover:bg-[#F5EEE6]"
                                >
                                  {category.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={closeAllMenus}
                          className="block px-4 py-3.5 rounded-2xl text-sm uppercase tracking-wider font-semibold text-[#080616] hover:bg-[#FAF8F5] transition-colors"
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* USER ACCOUNT ACTIONS */}
                  <div className="border-t border-stone-200/50 pt-4 mt-4 space-y-1.5">
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-2 mb-2 bg-[#F5ECE2]/40 rounded-xl">
                          <p className="text-[9px] uppercase tracking-widest text-[#A68F81] font-bold">Active Session</p>
                          <p className="text-xs text-[#080616] font-semibold">{userName || 'Patron'}</p>
                        </div>

                        <Link
                          to="/profile"
                          onClick={closeAllMenus}
                          className="block px-4 py-3 rounded-2xl text-sm uppercase tracking-wider font-medium text-stone-700 hover:bg-[#FAF8F5]"
                        >
                          My Profile
                        </Link>

                        <Link
                          to="/orders"
                          onClick={closeAllMenus}
                          className="block px-4 py-3 rounded-2xl text-sm uppercase tracking-wider font-medium text-stone-700 hover:bg-[#FAF8F5]"
                        >
                          My Orders
                        </Link>

                        <Link
                          to="/wishlist"
                          onClick={closeAllMenus}
                          className="block px-4 py-3 rounded-2xl text-sm uppercase tracking-wider font-medium text-stone-700 hover:bg-[#FAF8F5]"
                        >
                          Wishlist
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 rounded-2xl text-sm uppercase tracking-wider font-bold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 px-2 pt-2">
                        <Link
                          to="/login"
                          onClick={closeAllMenus}
                          className="flex items-center justify-center h-12 rounded-2xl border border-stone-200 text-sm uppercase tracking-wider font-bold text-[#080616] bg-white"
                        >
                          Login
                        </Link>

                        <Link
                          to="/signup"
                          onClick={closeAllMenus}
                          className="flex items-center justify-center h-12 rounded-2xl bg-[#080616] text-[#F8F4EE] text-sm uppercase tracking-wider font-bold shadow"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* MINI MOBILE DRAWER CART SHORTCUT */}
                  <div className="px-2 pt-2">
                    <Link
                      to="/cart"
                      onClick={closeAllMenus}
                      className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-[#080616] hover:bg-amber-900 text-[#F8F4EE] text-sm uppercase tracking-wider font-bold transition-all"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Cart ({cartCount})
                    </Link>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </nav>

      {/* COMPANION MOBILE BUTTON (Shown only when main navbar hides) */}
      {!showNavbar && (
        <button
          onClick={() => setShowNavbar(true)}
          className="fixed bottom-6 right-6 z-[998] lg:hidden w-14 h-14 rounded-full bg-[#080616] text-white flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 animate-in fade-in duration-200"
          aria-label="Reveal Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
    </>
  );
}