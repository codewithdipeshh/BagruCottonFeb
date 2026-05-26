import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
} from 'lucide-react';
import { sareeCategories } from '../data/sareeCategories';
import { useApp } from '../context/AppContext';

const languages = ['English', 'Hindi', 'Marathi'];

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Sarees', path: '/sarees', hasDropdown: true },
  { name: 'New Arrivals', path: '/new-arrivals' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Blog', path: '/blog' },
];

function isNavActive(pathname: string, path: string) {
  if (path === '/') return pathname === '/';
  if (path === '/sarees') {
    return pathname === '/sarees' || pathname.startsWith('/sarees/');
  }
  return pathname === path;
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, userName, cartCount, logout } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSareesOpen, setIsSareesOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSareesOpen, setIsMobileSareesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');

  const [showNavbar, setShowNavbar] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsSareesOpen(false);
    setIsLangOpen(false);
    setIsProfileOpen(false);
    setIsMobileSareesOpen(false);
  }, []);

  const startHideTimer = useCallback(() => {
    if (isTouchDevice) {
      setShowNavbar(true);
      return;
    }

    if (hideTimeout.current) clearTimeout(hideTimeout.current);

    hideTimeout.current = setTimeout(() => {
      if (!isSareesOpen && !isLangOpen && !isProfileOpen && !isMenuOpen) {
        setShowNavbar(false);
      }
    }, 10000);
  }, [isTouchDevice, isSareesOpen, isLangOpen, isProfileOpen, isMenuOpen]);

  useEffect(() => {
    closeMenus();
  }, [location.pathname, closeMenus]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const checkTouch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(checkTouch);
    startHideTimer();

    const handleMouseMove = (e: MouseEvent) => {
      if (checkTouch) return;
      if (e.clientY < 140) {
        setShowNavbar(true);
        startHideTimer();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [startHideTimer]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/sarees?q=${encodeURIComponent(q)}` : '/sarees');
    closeMenus();
  };

  const handleLogout = () => {
    logout();
    closeMenus();
    setIsProfileOpen(false);
  };

  return (
    <nav
      onMouseEnter={() => {
        setShowNavbar(true);
        startHideTimer();
      }}
      className={`fixed top-10 left-1/2 z-[999] w-[99%] sm:w-[97%] lg:w-[96%] xl:w-[95%] -translate-x-1/2 transition-all duration-500 ${
        showNavbar
          ? 'translate-y-0 opacity-100'
          : '-translate-y-[140%] opacity-0 pointer-events-none'
      }`}
      aria-label="Main navigation"
    >
      <div className="rounded-[28px] border border-white/20 bg-[#F8F4EE]/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[82px]">
            <Link
              to="/"
              className="flex items-center gap-3 flex-shrink-0"
              onClick={closeMenus}
            >
              <div className="w-11 h-11 rounded-2xl bg-[#080616] flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">B</span>
              </div>
              <div>
                <h1 className="text-[20px] lg:text-[22px] font-bold text-[#080616] leading-none">
                  BAGRU
                </h1>
                <p className="text-[10px] uppercase tracking-[3px] text-[#9A8478] mt-1">
                  Premium Sarees
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setIsSareesOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsSareesOpen(false)}
                >
                  <Link
                    to={item.path}
                    className={`px-4 xl:px-5 py-3 rounded-full text-[14px] xl:text-[15px] font-medium transition-all duration-300 flex items-center gap-1 ${
                      isNavActive(location.pathname, item.path)
                        ? 'bg-[#080616] text-white shadow-lg'
                        : 'text-[#3B2F2F] hover:bg-[#EFE7DD]'
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {item.hasDropdown && isSareesOpen && (
                    <div className="absolute top-full left-0 pt-2 w-72">
                      <div className="rounded-3xl bg-white shadow-2xl border border-gray-100 p-3">
                        <Link
                          to="/sarees"
                          onClick={() => setIsSareesOpen(false)}
                          className="block px-4 py-3 rounded-2xl text-sm font-semibold text-[#080616] hover:bg-[#F7F3EE] border-b border-gray-100 mb-1"
                        >
                          View All Sarees
                        </Link>
                        {sareeCategories.map((category) => (
                          <Link
                            key={category.slug}
                            to={`/sarees/${category.slug}`}
                            onClick={() => setIsSareesOpen(false)}
                            className="block px-4 py-3 rounded-2xl text-sm text-gray-700 hover:bg-[#F7F3EE] hover:text-[#080616] transition-all"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <form onSubmit={handleSearch} className="relative hidden xl:block">
                <input
                  type="search"
                  placeholder="Search sarees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-44 2xl:w-56 h-11 pl-4 pr-11 rounded-full border border-[#E7DED4] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#080616]/10"
                  aria-label="Search sarees"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#080616]"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              <div
                className="relative hidden 2xl:block"
                onMouseEnter={() => setIsLangOpen(true)}
                onMouseLeave={() => setIsLangOpen(false)}
              >
                <button
                  type="button"
                  className="h-11 px-4 rounded-full border border-[#E7DED4] bg-white flex items-center gap-2 text-sm text-[#080616]"
                  aria-expanded={isLangOpen}
                >
                  <Globe className="w-4 h-4" />
                  {selectedLang}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isLangOpen && (
                  <div className="absolute top-full right-0 pt-2 w-36">
                    <div className="rounded-2xl bg-white shadow-xl border p-2">
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            setSelectedLang(lang);
                            setIsLangOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-[#F6EFE7]"
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/wishlist"
                className="w-11 h-11 rounded-full bg-white border border-[#E7DED4] flex items-center justify-center hover:bg-[#F3ECE4] transition"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-[#080616]" />
              </Link>

              <Link
                to="/cart"
                className="relative w-11 h-11 rounded-full bg-[#080616] text-white flex items-center justify-center shadow-lg"
                aria-label={`Cart, ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C48B5A] text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button
                  type="button"
                  className="h-11 px-4 rounded-full border border-[#E7DED4] bg-white flex items-center gap-2 text-sm font-medium text-[#080616] min-w-[120px]"
                  aria-expanded={isProfileOpen}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden xl:block truncate max-w-[100px]">
                    {isLoggedIn ? userName || 'Account' : 'Account'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-full right-0 pt-2 w-56">
                    <div className="rounded-3xl bg-white shadow-2xl border border-gray-100 p-3">
                      {isLoggedIn ? (
                        <>
                          <Link
                            to="/profile"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F7F3EE]"
                          >
                            My Profile
                          </Link>
                          <Link
                            to="/orders"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F7F3EE]"
                          >
                            My Orders
                          </Link>
                          <Link
                            to="/wishlist"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F7F3EE]"
                          >
                            Wishlist
                          </Link>
                          <div className="border-t my-2" />
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl text-sm text-red-500 hover:bg-red-50"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F7F3EE]"
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            onClick={() => setIsProfileOpen(false)}
                            className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F7F3EE]"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-11 h-11 rounded-full bg-[#080616] text-white flex items-center justify-center shadow-lg"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden border-t border-[#E7DED4] py-5 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSearch} className="px-4 mb-4">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search sarees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-4 pr-11 rounded-full border border-[#E7DED4] focus:outline-none bg-white"
                    aria-label="Search sarees"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    aria-label="Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="space-y-2 px-3">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => setIsMobileSareesOpen(!isMobileSareesOpen)}
                          className="w-full flex justify-between items-center px-4 py-3 rounded-2xl text-sm font-medium text-[#080616] hover:bg-[#F5EEE6]"
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isMobileSareesOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isMobileSareesOpen && (
                          <div className="ml-3 mt-1 space-y-1 border-l border-[#E7DED4] pl-3">
                            <Link
                              to="/sarees"
                              onClick={closeMenus}
                              className="block px-4 py-2 text-sm font-medium text-[#080616] rounded-xl hover:bg-[#F5EEE6]"
                            >
                              View All Sarees
                            </Link>
                            {sareeCategories.map((category) => (
                              <Link
                                key={category.slug}
                                to={`/sarees/${category.slug}`}
                                onClick={closeMenus}
                                className="block px-4 py-2 text-sm text-gray-600 rounded-xl hover:bg-[#F5EEE6]"
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
                        onClick={closeMenus}
                        className={`block px-4 py-3 rounded-2xl text-sm font-medium ${
                          isNavActive(location.pathname, item.path)
                            ? 'bg-[#080616] text-white'
                            : 'text-[#080616] hover:bg-[#F5EEE6]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="border-t border-[#E7DED4] my-4 pt-4">
                  <p className="px-4 text-[10px] font-bold text-[#9A8478] uppercase tracking-wider mb-2">
                    Account Services
                  </p>
                  {isLoggedIn ? (
                    <div className="space-y-1">
                      <div className="mx-4 my-2 px-4 py-3 bg-[#EFE7DD] rounded-2xl text-xs text-[#080616] font-semibold flex items-center justify-between">
                        <span>
                          Logged in as:{' '}
                          <span className="text-[#9A8478]">{userName}</span>
                        </span>
                        <User className="w-4 h-4 text-[#9A8478]" />
                      </div>
                      <Link
                        to="/profile"
                        onClick={closeMenus}
                        className="block px-4 py-2.5 rounded-2xl text-sm font-medium text-[#3B2F2F] hover:bg-[#F5EEE6]"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={closeMenus}
                        className="block px-4 py-2.5 rounded-2xl text-sm font-medium text-[#3B2F2F] hover:bg-[#F5EEE6]"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={closeMenus}
                        className="block px-4 py-2.5 rounded-2xl text-sm font-medium text-[#3B2F2F] hover:bg-[#F5EEE6]"
                      >
                        Wishlist
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 px-2">
                      <Link
                        to="/login"
                        onClick={closeMenus}
                        className="w-full h-12 rounded-2xl border border-[#E7DED4] bg-white text-[#080616] flex items-center justify-center text-sm font-bold hover:bg-[#F5EEE6] transition-all"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={closeMenus}
                        className="w-full h-12 rounded-2xl bg-[#080616] text-white flex items-center justify-center text-sm font-bold hover:bg-opacity-90 transition-all"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 mt-5 flex gap-2">
                <Link
                  to="/wishlist"
                  onClick={closeMenus}
                  className="flex-1 h-12 rounded-2xl border border-[#E7DED4] bg-white text-[#080616] flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  <Heart className="w-5 h-5" />
                  Wishlist
                </Link>
                <Link
                  to="/cart"
                  onClick={closeMenus}
                  className="flex-1 h-12 rounded-2xl bg-[#080616] text-white flex items-center justify-center gap-2 text-sm font-semibold shadow-lg"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Cart ({cartCount})
                </Link>
              </div>

              <div className="px-5 mt-3">
                <label htmlFor="mobile-lang-nav" className="sr-only">
                  Language
                </label>
                <select
                  id="mobile-lang-nav"
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="w-full h-11 px-4 rounded-2xl border border-[#E7DED4] bg-white text-sm"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
