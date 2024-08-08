import 'core-js/stable'; // Polyfilling everything except async/await
import 'regenerator-runtime/runtime'; // Polyfilling async/await

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import recipesListView from './views/recipesListView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    recipesListView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

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
    recipesListView.render(model.getSearchResultsPage());

    // 3) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = function (goToPage) {
  // 1) Render new results page
  recipesListView.render(model.getSearchResultsPage(goToPage));

  // 2) Update pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1) Update servings and ingredients quantity
  model.updateServings(newServings);

  // 2) Render recipe
  recipeView.update(model.state.recipe);
};

const controlAddOrRemoveBookmark = function () {
  // 1) Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddOrRemoveBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPaginationClick(controlPagination);
};
init();
