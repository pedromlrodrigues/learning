import View from './view';

// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPaginationClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      const btn = e.target.closest('.btn--inline');
      if (btn) {
        handler(+btn.dataset.goto);
      }
    });
  }

  _generateHtml() {
    if (this._data.results.length === 0) return '';

    const currentPage = this._data.page;
    const totalPages = this._data.totalPages;
    let html = '';

    // Page 1 or other != last, Number of Pages > 1
    if ((currentPage === 1 || currentPage < totalPages) && totalPages > 1) {
      html = this._generateNextPageButtonHtml(currentPage + 1);
    }

    // Page != 1
    if (currentPage !== 1) {
      html += this._generatePreviousPageButtonHtml(currentPage - 1);
    }

    return html;
  }

  _generatePreviousPageButtonHtml(page) {
    return `
        <button data-goto="${page}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page}</span>
        </button>`;
  }

  _generateNextPageButtonHtml(page) {
    return `
        <button data-goto="${page}" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${page}</span>
        </button>`;
  }
}

export default new PaginationView();
