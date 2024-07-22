import 'core-js/stable'; // Polyfilling everything except async/await
import 'regenerator-runtime/runtime'; // Polyfilling async/await

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import recipesListView from './views/recipesListView';

if (module.hot) {
  module.hot.accept();
}
///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    recipesListView.renderSpinner();

    // 1) Load search results
    await model.loadSearchResults(searchView.getQuery());

    // 2) Render search results
    recipesListView.render(model.state.search.results);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
