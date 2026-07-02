export type Language = 'en' | 'ru' | 'uz';
export type Theme = 'light' | 'dark';

export type DishCategory =
  | 'pizza'
  | 'pasta'
  | 'burgers'
  | 'sushi'
  | 'salads'
  | 'drinks'
  | 'desserts';

export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten-free' | 'spicy';

export type SortOption = 'popular' | 'rating' | 'price-asc' | 'price-desc';

export interface LocalizedString {
  en: string;
  ru: string;
  uz: string;
}

export interface Dish {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  image: string;
  category: DishCategory;
  dietary: DietaryTag[];
  rating: number;
  reviews: number;
  ingredients: string[];
  isAvailable: boolean;
  preparationTime: number;
  popular?: boolean;
  special?: boolean;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  promoCode: string | null;
  discount: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Dish }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'APPLY_PROMO'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartState };

export interface FilterState {
  category: DishCategory | null;
  dietary: DietaryTag[];
  priceRange: [number, number];
  sortBy: SortOption;
  searchQuery: string;
}

export type FilterAction =
  | { type: 'SET_CATEGORY'; payload: DishCategory | null }
  | { type: 'TOGGLE_DIETARY'; payload: DietaryTag }
  | { type: 'SET_PRICE_RANGE'; payload: [number, number] }
  | { type: 'SET_SORT'; payload: SortOption }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'RESET' };

export interface RestaurantInfo {
  name: LocalizedString;
  description: LocalizedString;
  founded: number;
  mission: LocalizedString;
  vision: LocalizedString;
  chefName: LocalizedString;
  chefBio: LocalizedString;
  chefImage: string;
  address: LocalizedString;
  phone: string;
  email: string;
  openingHours: Record<string, LocalizedString>;
  images: string[];
  socialMedia: {
    instagram?: string;
    telegram?: string;
    facebook?: string;
  };
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: LocalizedString;
  avatar: string;
}

export interface DeliveryForm {
  fullName: string;
  phone: string;
  address: string;
  apartment: string;
  notes: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}
