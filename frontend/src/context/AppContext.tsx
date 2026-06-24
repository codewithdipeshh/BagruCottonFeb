import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ProductId, SareeProduct } from '../types/product';

export type CartItem = {
  id: ProductId;
  name: string;
  price: number;
  image: string;
  quantity: number;
  fabric?: string;
  description?: string;
};

type AppContextValue = {
  isLoggedIn: boolean;
  userName: string;
  cartItems: CartItem[];
  cartCount: number;
  login: (name: string) => void;
  logout: () => void;
  addToCart: (product: SareeProduct, quantity?: number) => void;
  removeFromCart: (id: ProductId) => void;
  updateQuantity: (id: ProductId, quantity: number) => void;
  clearCart: () => void;
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
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is CartItem => {
        if (!item || typeof item !== 'object') return false;
        const candidate = item as Partial<CartItem>;
        return (
          candidate.id !== undefined &&
          typeof candidate.name === 'string' &&
          typeof candidate.price === 'number' &&
          typeof candidate.image === 'string' &&
          typeof candidate.quantity === 'number'
        );
      })
      .map((item) => ({
        ...item,
        quantity: Math.max(1, Math.floor(item.quantity)),
      }));
  } catch {
    return [];
  }
}

function persistCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const auth = readAuth();
    setIsLoggedIn(auth.isLoggedIn);
    setUserName(auth.userName);
    setCartItems(readCartCount());
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

  const addToCart = useCallback((product: SareeProduct, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.floor(quantity));
    const image = product.images[0] ?? '';

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const next = existing
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + safeQuantity }
              : item
          )
        : [
            ...prev,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              image,
              quantity: safeQuantity,
              fabric: product.fabric,
              description: product.description,
            },
          ];

      persistCart(next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id: ProductId) => {
    setCartItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      persistCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((id: ProductId, quantity: number) => {
    setCartItems((prev) => {
      const safeQuantity = Math.max(0, Math.floor(quantity));
      const next =
        safeQuantity === 0
          ? prev.filter((item) => item.id !== id)
          : prev.map((item) =>
              item.id === id ? { ...item, quantity: safeQuantity } : item
            );

      persistCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    persistCart([]);
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      isLoggedIn,
      userName,
      cartItems,
      cartCount,
      login,
      logout,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [
      isLoggedIn,
      userName,
      cartItems,
      cartCount,
      login,
      logout,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    ]
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
