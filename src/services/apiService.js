import { mealDbSearchUrl } from '../data/recipes';

export async function fetchExternalRecipes() {
  const response = await fetch(mealDbSearchUrl);

  if (!response.ok) {
    throw new Error('Gagal mengambil data resep dari API eksternal.');
  }

  const data = await response.json();
  const meals = data.meals || [];

  return meals.slice(0, 8).map(meal => ({
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    image: meal.strMealThumb,
    instructions: meal.strInstructions,
    source: 'TheMealDB API'
  }));
}
