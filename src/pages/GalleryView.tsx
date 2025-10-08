import { useEffect, useState } from 'react';
import { getMealsByCategory, getCategories } from '../api/meals';
import type { Meal } from '../types/meals';
import MealCard from '../components/MealCard';
import './GalleryView.css';

export default function GalleryView() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState('All');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(['All', ...data]);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (selected === 'All') {
        const beef = await getMealsByCategory('Beef');
        const chicken = await getMealsByCategory('Chicken');
        const dessert = await getMealsByCategory('Dessert');
        setMeals([...beef, ...chicken, ...dessert]);
      } else {
        const data = await getMealsByCategory(selected);
        setMeals(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [selected]);

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Gallery View</h1>

      <div className="gallery-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === selected ? 'active' : ''}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p>Loading meals...</p>}

      <ul className="gallery-grid">
        {meals.map((m) => (
          <MealCard key={m.idMeal} meal={m} variant="gallery" category={selected} />
        ))}
      </ul>
    </div>
  );
}
