import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
  type Dispatch,
} from 'react';
import type {
  CartState,
  CartAction,
  FilterState,
  FilterAction,
  Dish,
  Language,
  Theme,
  Toast,
} from '@/types';
import {
  cartReducer,
  calcSubtotal,
  calcDiscount,
  getCartCount,
} from '@/context/cartReducer';
import { filterReducer, initialFilterState } from '@/context/filterReducer';
import { DELIVERY_FEE, TAX_RATE, MAX_ORDER_TOTAL, PROMO_CODES } from '@/data/dishes';

const CART_KEY = 'savory-cart';
const FAVORITES_KEY = 'savory-favorites';
const THEME_KEY = 'savory-theme';
const LANGUAGE_KEY = 'savory-language';

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  cart: CartState;
  dispatchCart: Dispatch<CartAction>;
  addItem: (dish: Dish) => boolean;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyPromo: (code: string) => boolean;
  clearCart: () => void;
  subtotal: number;
  discountAmount: number;
  tax: number;
  total: number;
  cartCount: number;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  filters: FilterState;
  dispatchFilter: Dispatch<FilterAction>;
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function loadTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'dark' ? 'dark' : 'light';
}

function loadLanguage(): Language {
  const stored = localStorage.getItem(LANGUAGE_KEY);
  if (stored === 'en' || stored === 'ru' || stored === 'uz') return stored;
  return 'en';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [language, setLanguageState] = useState<Language>(loadLanguage);
  const [cart, dispatchCart] = useReducer(cartReducer, { items: [], promoCode: null, discount: 0 });
  const [filters, dispatchFilter] = useReducer(filterReducer, initialFilterState);
  const [favorites, setFavorites] = useState<string[]>(() => loadJSON(FAVORITES_KEY, []));
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadJSON<CartState>(CART_KEY, { items: [], promoCode: null, discount: 0 });
    dispatchCart({ type: 'HYDRATE', payload: saved });
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = useCallback(() => setTheme((p) => (p === 'dark' ? 'light' : 'dark')), []);
  const setLanguage = useCallback((lang: Language) => setLanguageState(lang), []);

  const subtotal = useMemo(() => calcSubtotal(cart.items), [cart.items]);
  const discountAmount = useMemo(
    () => calcDiscount(subtotal, cart.promoCode),
    [subtotal, cart.promoCode]
  );
  const tax = useMemo(() => (subtotal - discountAmount) * TAX_RATE, [subtotal, discountAmount]);
  const total = useMemo(
    () => subtotal - discountAmount + DELIVERY_FEE + tax,
    [subtotal, discountAmount, tax]
  );
  const cartCount = useMemo(() => getCartCount(cart.items), [cart.items]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addItem = useCallback(
    (dish: Dish) => {
      const newSubtotal = subtotal + dish.price;
      if (newSubtotal > MAX_ORDER_TOTAL) return false;
      dispatchCart({ type: 'ADD_ITEM', payload: dish });
      return true;
    },
    [subtotal]
  );

  const removeItem = useCallback((id: string) => {
    dispatchCart({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatchCart({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const applyPromo = useCallback((code: string) => {
    const upper = code.toUpperCase();
    if (PROMO_CODES[upper]) {
      dispatchCart({ type: 'APPLY_PROMO', payload: code });
      return true;
    }
    return false;
  }, []);

  const clearCart = useCallback(() => dispatchCart({ type: 'CLEAR_CART' }), []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      language,
      setLanguage,
      cart,
      dispatchCart,
      addItem,
      removeItem,
      updateQuantity,
      applyPromo,
      clearCart,
      subtotal,
      discountAmount,
      tax,
      total,
      cartCount,
      favorites,
      toggleFavorite,
      isFavorite,
      filters,
      dispatchFilter,
      toasts,
      addToast,
      removeToast,
    }),
    [
      theme, toggleTheme, language, setLanguage, cart, dispatchCart,
      addItem, removeItem, updateQuantity, applyPromo, clearCart,
      subtotal, discountAmount, tax, total, cartCount,
      favorites, toggleFavorite, isFavorite,
      filters, dispatchFilter, toasts, addToast, removeToast,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
