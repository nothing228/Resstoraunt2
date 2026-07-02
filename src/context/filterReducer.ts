import type { FilterState, FilterAction } from '@/types';
import { PRICE_MIN, PRICE_MAX } from '@/data/dishes';

export const initialFilterState: FilterState = {
  category: null,
  dietary: [],
  priceRange: [PRICE_MIN, PRICE_MAX],
  sortBy: 'popular',
  searchQuery: '',
};

export function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'TOGGLE_DIETARY': {
      const exists = state.dietary.includes(action.payload);
      return {
        ...state,
        dietary: exists
          ? state.dietary.filter((d) => d !== action.payload)
          : [...state.dietary, action.payload],
      };
    }
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'RESET':
      return { ...initialFilterState };
    default:
      return state;
  }
}
