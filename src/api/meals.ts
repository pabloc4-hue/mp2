// src/api/meals.ts
import axios from 'axios';
import type { Meal } from '../types/meals';

const BASE = 'https://www.themealdb.com/api/json/v1/1';

// Buscar por nombre (para List View)
export async function searchMeals(query: string): Promise<Meal[]> {
  const { data } = await axios.get(`${BASE}/search.php`, { params: { s: query } });
  return data.meals || [];
}

// (Las siguientes funciones las usaremos más adelante)
// export async function getMealById(id: string): Promise<Meal> {
//   const { data } = await axios.get(`${BASE}/lookup.php`, { params: { i: id } });
//   return data.meals?.[0];
// }
// export async function getCategories(): Promise<string[]> {
//   const { data } = await axios.get(`${BASE}/list.php`, { params: { c: 'list' } });
//   return (data.meals || []).map((c: any) => c.strCategory);
// }
