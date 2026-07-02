import { useState, useEffect } from 'react';
import type { Dish } from '@/types';
import { fetchDishes } from '@/data/api';

export function useDishes() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchDishes()
      .then((data) => { if (!cancelled) { setDishes(data); setError(null); } })
      .catch(() => { if (!cancelled) setError('Failed to load dishes'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { dishes, loading, error };
}
