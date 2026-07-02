import axios from 'axios';
import type { Dish } from '@/types';
import { DISHES } from '@/data/dishes';

const api = axios.create({ baseURL: '/api', timeout: 5000 });
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchDishes(): Promise<Dish[]> {
  await delay(400);
  const response = await api.get<Dish[]>('/dishes', {
    adapter: async () => ({
      data: DISHES,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as never,
    }),
  });
  return response.data;
}

export async function fetchDishById(id: string): Promise<Dish | undefined> {
  await delay(200);
  const dish = DISHES.find((d) => d.id === id);
  const response = await api.get<Dish | undefined>(`/dishes/${id}`, {
    adapter: async () => ({
      data: dish,
      status: dish ? 200 : 404,
      statusText: dish ? 'OK' : 'Not Found',
      headers: {},
      config: {} as never,
    }),
  });
  return response.data;
}

export async function fetchSpecials(): Promise<Dish[]> {
  await delay(300);
  const specials = DISHES.filter((d) => d.special);
  const response = await api.get<Dish[]>('/dishes/specials', {
    adapter: async () => ({
      data: specials,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as never,
    }),
  });
  return response.data;
}
