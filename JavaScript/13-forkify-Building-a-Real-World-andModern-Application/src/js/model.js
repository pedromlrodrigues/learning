import 'regenerator-runtime/runtime';
import { API_URL, PAGE_SIZE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    pageSize: PAGE_SIZE,
    totalPages: 0,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.query = query;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  state.search.totalPages = Math.ceil(
    state.search.results.length / state.search.pageSize
  );

  const start = (state.search.page - 1) * state.search.pageSize;
  const end = state.search.page * state.search.pageSize;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings = state.recipe?.servings) {
  if (newServings > 0) {
    state.recipe.ingredients.forEach(ingredient => {
      ingredient.quantity =
        (ingredient.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
  }
};
