import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Globe, ShoppingBag, User, LogOut } from 'lucide-react';

const sareeCategories = [
  { name: 'Cotton Mulmul Sarees', path: `/sarees/${encodeURIComponent('Cotton Mulmul Sarees')}` },
  {
    name: 'Handblock Printed Cotton Sarees',
    path: `/sarees/${encodeURIComponent('Handblock Printed Cotton Sarees')}`,
  },
  { name: 'Linen Cotton Sarees', path: `/sarees/${encodeURIComponent('Linen Cotton Sarees')}` },
  { name: 'kota doria Sarees', path: `/sarees/${encodeURIComponent('kota doria Sarees')}` },
  { name: 'Chanderi Bagru Sarees', path: `/sarees/${encodeURIComponent('Chanderi Bagru Sarees')}` },
  { name: 'Maheshwari Silk Sarees', path: `/sarees/${encodeURIComponent('Maheshwari Silk Sarees')}` },
];

const languages = ['English', 'Hindi', 'Marathi'];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSareesOpen, setIsSareesOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');
  const [cartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();


  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Sarees', path: '/sarees', hasDropdown: true },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#E8EDF2] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-[#080616] tracking-tight">
              BAGRU COTTON FEB
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setIsSareesOpen(true)}
                onMouseLeave={() => item.hasDropdown && setIsSareesOpen(false)}
              >
                <Link
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center ${isActive(item.path)
                      ? 'text-[#080616] border-b-2 border-[#080616]'
                      : 'text-gray-700 hover:text-[#080616]'
                    }`}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                </Link>

                {item.hasDropdown && isSareesOpen && (
                  <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-b-lg py-2 z-50">
                    {sareeCategories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E8EDF2] hover:text-[#080616] transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search, Language, Cart and Profile */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search sarees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-[#080616] transition-colors"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Language Selector */}
            <div
              className="relative"
              onMouseEnter={() => setIsLangOpen(true)}
              onMouseLeave={() => setIsLangOpen(false)}
            >
              <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#080616] transition-colors">
                <Globe className="w-4 h-4" />
                <span>{selectedLang}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 w-32 bg-white shadow-lg rounded-b-lg py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#E8EDF2] hover:text-[#080616] transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Bag */}
            <button className="relative p-2 text-gray-700 hover:text-[#080616] transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <div
              className="relative"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#080616] transition-colors">
                <User className="w-5 h-5" />
                <span>{isLoggedIn ? userName : 'Account'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 w-48 bg-white shadow-lg rounded-b-lg py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E8EDF2] hover:text-[#080616] transition-colors"
                      >
                        My Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E8EDF2] hover:text-[#080616] transition-colors"
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E8EDF2] hover:text-[#080616] transition-colors"
                      >
                        Wishlist
                      </Link>

                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E8EDF2] hover:text-[#080616] transition-colors"
                      >
                        Settings
                      </Link>

                      <div className="border-t border-gray-200 my-2" />

                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setUserName('');
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#E8EDF2] hover:text-[#080616] transition-colors font-medium"
                      >
                        Login
                      </Link>

                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E8EDF2] hover:text-[#080616] transition-colors"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#080616] transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-300">
            <div className="space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => !item.hasDropdown && setIsMenuOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium ${isActive(item.path)
                        ? 'text-[#080616] bg-gray-200'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <div className="ml-4 mt-1 space-y-1">
                      {sareeCategories.map((category) => (
                        <Link
                          key={category.name}
                          to={category.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-[#080616]"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Search */}
            <div className="mt-4 px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sarees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-[#080616]"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Mobile Language */}
            <div className="mt-4 px-4">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#080616]"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Cart and Profile */}
            <div className="mt-4 px-4 space-y-2 border-t border-gray-300 pt-4">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#080616] text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                <ShoppingBag className="w-5 h-5" />
                Shopping Bag {cartCount > 0 && `(${cartCount})`}
              </button>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#E8EDF2] rounded-lg transition-colors text-center font-medium"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#E8EDF2] rounded-lg transition-colors text-center"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setUserName('');
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsLoggedIn(true);
                      setUserName('Priya Sharma');
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-[#080616] text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Login
                  </button>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#E8EDF2] rounded-lg transition-colors text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}