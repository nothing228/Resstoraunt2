import type { Dish, FilterState, SortOption } from '@/types';

export function filterAndSortDishes(dishes: Dish[], filters: FilterState): Dish[] {
  let result = dishes.filter((dish) => {
    if (!dish.isAvailable) return false;
    if (filters.category && dish.category !== filters.category) return false;
    if (dish.price < filters.priceRange[0] || dish.price > filters.priceRange[1]) return false;

    if (filters.dietary.length > 0) {
      const hasAll = filters.dietary.every((tag) => dish.dietary.includes(tag));
      if (!hasAll) return false;
    }

    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = Object.values(dish.name).some((n) => n.toLowerCase().includes(q));
      const matchCat = dish.category.includes(q);
      const matchIng = dish.ingredients.some((i) => i.toLowerCase().includes(q));
      if (!matchName && !matchCat && !matchIng) return false;
    }

    return true;
  });

  result = sortDishes(result, filters.sortBy);
  return result;
}

function sortDishes(dishes: Dish[], sortBy: SortOption): Dish[] {
  const sorted = [...dishes];
  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.reviews - a.reviews);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function getLocalizedText(
  obj: { en: string; ru: string; uz: string },
  lang: 'en' | 'ru' | 'uz'
): string {
  return obj[lang] || obj.en;
}
