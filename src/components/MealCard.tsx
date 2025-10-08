import type { Meal } from '../types/meals';
import { useNavigate } from 'react-router-dom';
import './MealCard.css';

type Props = {
  meal: Meal;
  variant?: 'list' | 'gallery';
  category?: string; // 👈 nueva prop
};

export default function MealCard({ meal, variant = 'list', category }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/meal/${meal.idMeal}`, { state: { category } }); // 👈 enviamos la categoría
  };

  return (
    <li
      className={`meal-card ${variant === 'gallery' ? 'gallery-only' : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img className="meal-thumb" src={meal.strMealThumb} alt={meal.strMeal} />
      {variant === 'list' && (
        <>
          <div className="meal-name">{meal.strMeal}</div>
          <div className="meal-meta">
            {meal.strCategory} · {meal.strArea}
          </div>
        </>
      )}
    </li>
  );
}
