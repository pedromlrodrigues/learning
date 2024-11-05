import View from './view';
import previewView from './previewView';

// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

class RecipesListView extends View {
  _parentElement = document.querySelector('.results');
  _successMessage = '';
  _errorMessage = '🫠 No recipes found for your query! Please try again! 🫠';

  _generateHtml() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new RecipesListView();
