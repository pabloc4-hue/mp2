// src/pages/ListView.tsx
import { useEffect, useState } from 'react';
import { searchMeals } from '../api/meals';
import type { Meal } from '../types/meals';
import './ListView.css'
import MealCard from '../components/MealCard';
import SearchBar from '../components/SearchBar';



export default function ListView() {
  const [query, setQuery] = useState('');   // búsqueda inicial
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [sortProperty, setSortProperty] = useState<'name' | 'category'>('name');


  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!query.trim()) { setMeals([]); return; }
      setLoading(true); setError(null);
      try {
        const data = await searchMeals(query.trim());
        if (!cancelled) setMeals(data);
      } catch (e) {
        if (!cancelled) setError('Error cargando datos');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [query]);

  // Order the meals
  const sortedMeals = [...meals].sort((a, b) => {
    const fieldA =
      sortProperty === 'name'
        ? a.strMeal.toLowerCase()
        : a.strCategory?.toLowerCase() ?? '';
    const fieldB =
      sortProperty === 'name'
        ? b.strMeal.toLowerCase()
        : b.strCategory?.toLowerCase() ?? '';

    return sortAsc ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
  });


  return (
    <div className="lv-container">
      <h1 className="lv-title">Meal Search</h1>
      <div className="lv-sort-controls">
        <label htmlFor="sortProperty">Sort by:</label>
        <select
          id="sortProperty"
          value={sortProperty}
          onChange={(e) => setSortProperty(e.target.value as 'name' | 'category')}
        >
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        sortAsc={sortAsc}
        onToggleSort={() => setSortAsc(!sortAsc)}
      />


      {loading && <p className="lv-status">Loading…</p>}
      {error && <p className="lv-error">{error}</p>}
      {!loading && !error && meals.length === 0 && (
        <p className="lv-status">No results.</p>
      )}

      <ul className="lv-grid">
        {sortedMeals.map((m) => (
          <MealCard key={m.idMeal} meal={m} variant="list" />
            ))}
      </ul>
    </div>
  );
}
