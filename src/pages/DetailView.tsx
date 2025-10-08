import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMealById, getMealsByCategory } from "../api/meals";
import type { Meal } from "../types/meals";
import "./DetailView.css";

export default function DetailView() {
  const { idMeal } = useParams<{ idMeal: string }>();
  const navigate = useNavigate();

  const [meal, setMeal] = useState<Meal | null>(null);
  const [catMeals, setCatMeals] = useState<Meal[]>([]);
  const [index, setIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!idMeal) return;
      setLoading(true);
      try {
        // 1) Trae el meal actual por id
        const m = await getMealById(idMeal);
        if (cancelled) return;
        setMeal(m);

        // 2) Con su categoría real, trae TODA la lista de esa categoría
        if (m?.strCategory) {
          const list = await getMealsByCategory(m.strCategory);
          if (cancelled) return;
          setCatMeals(list);

          // 3) Calcula el índice dentro de esa lista
          const i = list.findIndex(x => x.idMeal === idMeal);
          setIndex(i >= 0 ? i : 0);
        } else {
          setCatMeals([]);
          setIndex(-1);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [idMeal]);

  const goPrev = () => {
    if (index > 0) navigate(`/meal/${catMeals[index - 1].idMeal}`);
  };

  const goNext = () => {
    if (index >= 0 && index < catMeals.length - 1) {
      navigate(`/meal/${catMeals[index + 1].idMeal}`);
    }
  };

  if (loading || !meal) return <p className="dv-status">Loading…</p>;

  return (
    <div className="dv-container">
      <h1 className="dv-title">{meal.strMeal}</h1>

      <div className="dv-image-wrap">
        <img
          className="dv-image"
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
        <button
          onClick={goPrev}
          disabled={index <= 0}
          className="dv-arrow-btn dv-prev"
          aria-label="Previous"
        >
          ⬅
        </button>
        <button
          onClick={goNext}
          disabled={index === -1 || index >= catMeals.length - 1}
          className="dv-arrow-btn dv-next"
          aria-label="Next"
        >
          ➡
        </button>
      </div>

      <div className="dv-meta">
        {meal.strCategory} · {meal.strArea}
      </div>

      <p className="dv-instructions">{meal.strInstructions}</p>

      {meal.strYoutube && (
        <div className="dv-video">
          <iframe
            width="100%"
            height="315"
            src={meal.strYoutube.replace("watch?v=", "embed/")}
            title={meal.strMeal}
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}