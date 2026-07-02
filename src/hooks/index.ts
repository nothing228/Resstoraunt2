import { useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import type { TranslationDictionary } from '@/types';
import en from '@/assets/i18n/en.json';
import ru from '@/assets/i18n/ru.json';
import uz from '@/assets/i18n/uz.json';

const translations: Record<string, TranslationDictionary> = {
  en: en as TranslationDictionary,
  ru: ru as TranslationDictionary,
  uz: uz as TranslationDictionary,
};

function getNestedValue(obj: TranslationDictionary, path: string): string {
  const keys = path.split('.');
  let current: TranslationDictionary | string = obj;
  for (const key of keys) {
    if (typeof current === 'string') return current;
    current = current[key];
    if (current === undefined) return path;
  }
  return typeof current === 'string' ? current : path;
}

export function useTranslation() {
  const { language } = useApp();
  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      let text = getNestedValue(translations[language], key);
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [language]
  );
  return { t, language };
}

export function useTheme() {
  const { theme, toggleTheme } = useApp();
  return { theme, toggleTheme };
}

export function useLanguage() {
  const { language, setLanguage } = useApp();
  return { language, setLanguage };
}

export function useCart() {
  const {
    cart, addItem, removeItem, updateQuantity, applyPromo, clearCart,
    subtotal, discountAmount, tax, total, cartCount,
  } = useApp();
  return {
    cart, addItem, removeItem, updateQuantity, applyPromo, clearCart,
    subtotal, discountAmount, tax, total, cartCount,
  };
}

export function useFavorites() {
  const { favorites, toggleFavorite, isFavorite } = useApp();
  return { favorites, toggleFavorite, isFavorite };
}

export function useFilters() {
  const { filters, dispatchFilter } = useApp();
  return { filters, dispatchFilter };
}

export function useToast() {
  const { addToast, removeToast, toasts } = useApp();
  return { addToast, removeToast, toasts };
}
