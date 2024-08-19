import View from './view';
import previewView from './previewView';

// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _successMessage = '';
  _errorMessage = '🫠 No bookmarks yet! Find a nice recipe and bookmark it! 🫠';

  addHandlerRenderBookmarks(handler) {
    window.addEventListener('load', handler);
  }

  _generateHtml() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
