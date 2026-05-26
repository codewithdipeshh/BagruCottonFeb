import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type AppContextValue = {
  isLoggedIn: boolean;
  userName: string;
  cartCount: number;
  /** True when the floating navbar (or mobile menu) is taking layout space */
  navbarVisible: boolean;
  setNavbarVisible: (visible: boolean) => void;
  login: (name: string) => void;
  logout: () => void;
  setCartCount: (value: number | ((prev: number) => number)) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const AUTH_KEY = 'bagru_auth';
const CART_KEY = 'bagru_cart';

function readAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return { isLoggedIn: false, userName: '' };
    const parsed = JSON.parse(raw) as { userName?: string };
    return {
      isLoggedIn: true,
      userName: parsed.userName ?? 'Guest',
    };
  } catch {
    return { isLoggedIn: false, userName: '' };
  }
}

function readCartCount() {
  try {
    const n = Number(localStorage.getItem(CART_KEY));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [cartCount, setCartCountState] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const auth = readAuth();
    setIsLoggedIn(auth.isLoggedIn);
    setUserName(auth.userName);
    setCartCountState(readCartCount());
  }, []);

  const login = useCallback((name: string) => {
    const trimmed = name.trim() || 'Guest';
    setIsLoggedIn(true);
    setUserName(trimmed);
    localStorage.setItem(AUTH_KEY, JSON.stringify({ userName: trimmed }));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const setCartCount = useCallback(
    (value: number | ((prev: number) => number)) => {
      setCartCountState((prev) => {
        const next = typeof value === 'function' ? value(prev) : value;
        const safe = Math.max(0, next);
        localStorage.setItem(CART_KEY, String(safe));
        return safe;
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      isLoggedIn,
      userName,
      cartCount,
      navbarVisible,
      setNavbarVisible,
      login,
      logout,
      setCartCount,
    }),
    [isLoggedIn, userName, cartCount, navbarVisible, login, logout, setCartCount]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}
