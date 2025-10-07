// src/components/MealCard.tsx
import type { Meal } from '../types/meals';
import './MealCard.css';

type Props = {
  meal: Meal;
};

export default function MealCard({ meal }: Props) {
  return (
    <li className="meal-card">
      <img className="meal-thumb" src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="meal-name">{meal.strMeal}</div>
      <div className="meal-meta">{meal.strCategory} · {meal.strArea}</div>
    </li>
  );
}
