import View from './view';

// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

class RecipesListView extends View {
  _parentElement = document.querySelector('.results');
  _successMessage = '';
  _errorMessage = '🫠 No recipes found for your query! Please try again! 🫠';

  _generateHtml() {
    const id = window.location.hash.slice(1);

    return this._data
      .map(res => {
        return `
      <li class="preview">
        <a class="preview__link ${
          res.id === id ? 'preview__link--active' : ''
        }" href="#${res.id}">
          <figure class="preview__fig">
            <img src="${res.image}" alt="${res.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${res.title}</h4>
            <p class="preview__publisher">${res.publisher}</p>
          </div>
        </a>
      </li>
    `;
      })
      .join('');
  }
}

export default new RecipesListView();
