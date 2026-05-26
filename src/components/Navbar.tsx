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
    return (
      pathname === '/sarees' ||
      pathname.startsWith('/sarees/')
    );
  }

  return pathname === path;
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isLoggedIn,
    userName,
    cartCount,
    logout,
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isSareesOpen, setIsSareesOpen] =
    useState(false);

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const [isLangOpen, setIsLangOpen] =
    useState(false);

  const [isMobileSareesOpen, setIsMobileSareesOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState('');

  const [selectedLang, setSelectedLang] =
    useState('English');

  // AUTO HIDE
  const [showNavbar, setShowNavbar] =
    useState(true);

  const lastScrollY = useRef(0);
  const hideTimer = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const profileRef =
    useRef<HTMLDivElement | null>(null);

  const sareeRef =
    useRef<HTMLDivElement | null>(null);

  // ------------------------
  // CLOSE ALL MENUS
  // ------------------------

  const closeAllMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsSareesOpen(false);
    setIsProfileOpen(false);
    setIsLangOpen(false);
    setIsMobileSareesOpen(false);
  }, []);

  // ------------------------
  // SEARCH
  // ------------------------

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    const q = searchQuery.trim();

    navigate(
      q
        ? `/sarees?q=${encodeURIComponent(q)}`
        : '/sarees'
    );

    closeAllMenus();
  };

  // ------------------------
  // LOGOUT
  // ------------------------

  const handleLogout = () => {
    logout();
    closeAllMenus();
  };

  // ------------------------
  // AUTO HIDE NAVBAR
  // ------------------------

  useEffect(() => {
    const startTimer = () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      hideTimer.current = setTimeout(() => {
        if (!isMenuOpen) {
          setShowNavbar(false);
        }
      }, 4000);
    };

    startTimer();

    const handleScroll = () => {
      const current =
        window.scrollY;

      if (current < lastScrollY.current) {
        setShowNavbar(true);
        startTimer();
      } else if (
        current > lastScrollY.current &&
        current > 80
      ) {
        setShowNavbar(false);
      }

      lastScrollY.current =
        current;
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );

      if (hideTimer.current) {
        clearTimeout(
          hideTimer.current
        );
      }
    };
  }, [isMenuOpen]);

  // ------------------------
  // CLICK OUTSIDE CLOSE
  // ------------------------

  useEffect(() => {
    const handleClickOutside = (
      e: MouseEvent
    ) => {
      const target =
        e.target as Node;

      if (
        profileRef.current &&
        !profileRef.current.contains(
          target
        )
      ) {
        setIsProfileOpen(false);
      }

      if (
        sareeRef.current &&
        !sareeRef.current.contains(
          target
        )
      ) {
        setIsSareesOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  // ------------------------
  // BODY SCROLL LOCK
  // ------------------------

  useEffect(() => {
    document.body.style.overflow =
      isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow =
        '';
    };
  }, [isMenuOpen]);

  // ------------------------
  // ROUTE CHANGE
  // ------------------------

  useEffect(() => {
    closeAllMenus();
    setShowNavbar(true);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-10 left-1/2 -translate-x-1/2 z-[999]
        w-[99%] sm:w-[97%] lg:w-[96%] xl:w-[95%]
        transition-all duration-500
        
        ${
          showNavbar
            ? 'translate-y-0 opacity-100'
            : '-translate-y-[140%] opacity-100'
        }`}
      >
        <div
          className="rounded-[28px]
          border border-white/20
          bg-[#F8F4EE]/95
          backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[82px]">
              {/* LOGO */}

              <Link
                to="/"
                className="flex items-center gap-3 flex-shrink-0"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#080616] flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-bold">
                    B
                  </span>
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

              {/* DESKTOP NAV */}

              <div className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    ref={
                      item.hasDropdown
                        ? sareeRef
                        : null
                    }
                  >
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setIsSareesOpen(
                              !isSareesOpen
                            )
                          }
                          className={`px-4 xl:px-5 py-3 rounded-full text-[14px] xl:text-[15px] font-medium transition-all duration-300 flex items-center gap-1 ${
                            isNavActive(
                              location.pathname,
                              item.path
                            )
                              ? 'bg-[#080616] text-white shadow-lg'
                              : 'text-[#3B2F2F] hover:bg-[#EFE7DD]'
                          }`}
                        >
                          {item.name}

                          <ChevronDown className="w-4 h-4" />
                        </button>

                        {isSareesOpen && (
                          <div className="absolute top-[120%] left-0 w-72 rounded-3xl bg-white shadow-2xl border border-gray-100 p-3">
                            <Link
                              to="/sarees"
                              onClick={() =>
                                setIsSareesOpen(
                                  false
                                )
                              }
                              className="block px-4 py-3 rounded-2xl text-sm font-semibold hover:bg-[#F7F3EE]"
                            >
                              View All Sarees
                            </Link>

                            {sareeCategories.map(
                              (
                                category
                              ) => (
                                <Link
                                  key={
                                    category.slug
                                  }
                                  to={`/sarees/${category.slug}`}
                                  onClick={() =>
                                    setIsSareesOpen(
                                      false
                                    )
                                  }
                                  className="block px-4 py-3 rounded-2xl text-sm text-gray-700 hover:bg-[#F7F3EE]"
                                >
                                  {
                                    category.name
                                  }
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`px-4 xl:px-5 py-3 rounded-full text-[14px] xl:text-[15px] font-medium transition-all duration-300 ${
                          isNavActive(
                            location.pathname,
                            item.path
                          )
                            ? 'bg-[#080616] text-white shadow-lg'
                            : 'text-[#3B2F2F] hover:bg-[#EFE7DD]'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE */}

              <div className="hidden lg:flex items-center gap-3">
                {/* SEARCH */}

                <form
                  onSubmit={handleSearch}
                  className="relative hidden xl:block"
                >
                  <input
                    type="search"
                    placeholder="Search sarees..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(
                        e.target.value
                      )
                    }
                    className="w-52 h-11 pl-4 pr-11 rounded-full border border-[#E7DED4] bg-white text-sm focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                  </button>
                </form>

                {/* LANGUAGE */}

                <div className="relative">
                  <button
                    onClick={() =>
                      setIsLangOpen(
                        !isLangOpen
                      )
                    }
                    className="h-11 px-4 rounded-full border border-[#E7DED4] bg-white flex items-center gap-2 text-sm"
                  >
                    <Globe className="w-4 h-4" />

                    {selectedLang}

                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isLangOpen && (
                    <div className="absolute top-[120%] right-0 w-36 rounded-2xl bg-white shadow-xl border p-2">
                      {languages.map(
                        (lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setSelectedLang(
                                lang
                              );

                              setIsLangOpen(
                                false
                              );
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-[#F6EFE7]"
                          >
                            {lang}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* WISHLIST */}

                <Link
                  to="/wishlist"
                  className="w-11 h-11 rounded-full bg-white border border-[#E7DED4] flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 text-[#080616]" />
                </Link>

                {/* CART */}

                <Link
                  to="/cart"
                  className="relative w-11 h-11 rounded-full bg-[#080616] text-white flex items-center justify-center"
                >
                  <ShoppingBag className="w-5 h-5" />

                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C48B5A] text-[10px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* ACCOUNT */}

                <div
                  className="relative"
                  ref={profileRef}
                >
                  <button
                    onClick={() =>
                      setIsProfileOpen(
                        !isProfileOpen
                      )
                    }
                    className="h-11 px-4 rounded-full border border-[#E7DED4] bg-white flex items-center gap-2 text-sm font-medium text-[#080616]"
                  >
                    <User className="w-4 h-4" />

                    <span>
                      {isLoggedIn
                        ? userName ||
                          'Account'
                        : 'Account'}
                    </span>

                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute top-[120%] right-0 w-56 rounded-3xl bg-white shadow-2xl border border-gray-100 p-3">
                      {isLoggedIn ? (
                        <>
                          <Link
                            to="/profile"
                            className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F7F3EE]"
                          >
                            My Profile
                          </Link>

                          <Link
                            to="/orders"
                            className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F7F3EE]"
                          >
                            My Orders
                          </Link>

                          <Link
                            to="/wishlist"
                            className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F7F3EE]"
                          >
                            Wishlist
                          </Link>

                          <div className="border-t my-2" />

                          <button
                            onClick={
                              handleLogout
                            }
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
                            className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F7F3EE]"
                          >
                            Login
                          </Link>

                          <Link
                            to="/signup"
                            className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F7F3EE]"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* MOBILE BUTTON */}

              <button
                onClick={() =>
                  setIsMenuOpen(
                    !isMenuOpen
                  )
                }
                className="lg:hidden w-11 h-11 rounded-full bg-[#080616] text-white flex items-center justify-center"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* MOBILE MENU */}

            {isMenuOpen && (
              <div className="lg:hidden border-t border-[#E7DED4] py-5 max-h-[70vh] overflow-y-auto">
                {/* SEARCH */}

                <form
                  onSubmit={
                    handleSearch
                  }
                  className="px-4 mb-4"
                >
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search sarees..."
                      value={
                        searchQuery
                      }
                      onChange={(e) =>
                        setSearchQuery(
                          e.target.value
                        )
                      }
                      className="w-full h-11 pl-4 pr-11 rounded-full border border-[#E7DED4]"
                    />

                    <button
                      type="submit"
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <Search className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </form>

                {/* NAV LINKS */}

                <div className="space-y-2 px-3">
                  {navItems.map(
                    (item) => (
                      <div
                        key={
                          item.name
                        }
                      >
                        {item.hasDropdown ? (
                          <>
                            <button
                              onClick={() =>
                                setIsMobileSareesOpen(
                                  !isMobileSareesOpen
                                )
                              }
                              className="w-full flex justify-between items-center px-4 py-3 rounded-2xl text-sm font-medium text-[#080616] hover:bg-[#F5EEE6]"
                            >
                              <span>
                                {
                                  item.name
                                }
                              </span>

                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                  isMobileSareesOpen
                                    ? 'rotate-180'
                                    : ''
                                }`}
                              />
                            </button>

                            {isMobileSareesOpen && (
                              <div className="ml-3 mt-2 space-y-2">
                                {sareeCategories.map(
                                  (
                                    category
                                  ) => (
                                    <Link
                                      key={
                                        category.slug
                                      }
                                      to={`/sarees/${category.slug}`}
                                      onClick={
                                        closeAllMenus
                                      }
                                      className="block px-4 py-2 text-sm text-gray-600 rounded-xl hover:bg-[#F5EEE6]"
                                    >
                                      {
                                        category.name
                                      }
                                    </Link>
                                  )
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            to={
                              item.path
                            }
                            onClick={
                              closeAllMenus
                            }
                            className="block px-4 py-3 rounded-2xl text-sm font-medium text-[#080616] hover:bg-[#F5EEE6]"
                          >
                            {
                              item.name
                            }
                          </Link>
                        )}
                      </div>
                    )
                  )}

                  {/* ACCOUNT */}

                  <div className="border-t border-[#E7DED4] pt-4 mt-4">
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="/profile"
                          onClick={
                            closeAllMenus
                          }
                          className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F5EEE6]"
                        >
                          My Profile
                        </Link>

                        <Link
                          to="/orders"
                          onClick={
                            closeAllMenus
                          }
                          className="block px-4 py-3 rounded-2xl text-sm hover:bg-[#F5EEE6]"
                        >
                          My Orders
                        </Link>

                        <button
                          onClick={
                            handleLogout
                          }
                          className="w-full text-left px-4 py-3 rounded-2xl text-sm text-red-500 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Link
                          to="/login"
                          onClick={
                            closeAllMenus
                          }
                          className="block w-full text-center px-4 py-3 rounded-2xl border border-[#E7DED4]"
                        >
                          Login
                        </Link>

                        <Link
                          to="/signup"
                          onClick={
                            closeAllMenus
                          }
                          className="block w-full text-center px-4 py-3 rounded-2xl bg-[#080616] text-white"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* CART */}

                  <Link
                    to="/cart"
                    onClick={
                      closeAllMenus
                    }
                    className="flex items-center justify-center gap-2 h-12 rounded-2xl bg-[#080616] text-white mt-5"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Cart ({cartCount})
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* SHOW BUTTON WHEN HIDDEN */}

      {!showNavbar && (
        <button
          onClick={() =>
            setShowNavbar(true)
          }
          className="fixed bottom-5 right-5 z-[998] lg:hidden w-12 h-12 rounded-full bg-[#080616] text-white flex items-center justify-center shadow-xl"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
    </>
  );
}