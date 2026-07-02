import type { CartState, CartAction } from '@/types';
import { PROMO_CODES } from '@/data/dishes';

export function calcSubtotal(items: CartState['items']): number {
  return items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
}

export function calcDiscount(subtotal: number, promoCode: string | null): number {
  if (!promoCode) return 0;
  const promo = PROMO_CODES[promoCode.toUpperCase()];
  if (!promo) return 0;
  return promo.type === 'percent'
    ? subtotal * (promo.discount / 100)
    : promo.discount;
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.dish.id === action.payload.id);
      const items = existing
        ? state.items.map((i) =>
            i.dish.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.items, { dish: action.payload, quantity: 1 }];
      return { ...state, items };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.dish.id !== action.payload) };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.dish.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.dish.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case 'APPLY_PROMO': {
      const code = action.payload.toUpperCase();
      const valid = PROMO_CODES[code];
      return valid
        ? { ...state, promoCode: code, discount: valid.discount }
        : state;
    }
    case 'CLEAR_CART':
      return { items: [], promoCode: null, discount: 0 };
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

export function getCartCount(items: CartState['items']): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
