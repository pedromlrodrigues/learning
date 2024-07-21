import 'core-js/stable'; // Polyfilling everything except async/await
import 'regenerator-runtime/runtime'; // Polyfilling async/await
import * as model from './model';
import recipeView from './views/recipeView';

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
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
