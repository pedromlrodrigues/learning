// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const html = this._generateHtml();

    if (!render) return html;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    this._data = data;
    const newHtml = this._generateHtml();

    const newDOM = document.createRange().createContextualFragment(newHtml);
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];

      // Update changed text
      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue?.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }

      // Update changed attributes
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attribute =>
          currentElement.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  renderMessage(message = this._successMessage) {
    const html = `
        <div class="message">
          <div>
            <svg>
             <use href="src/img/icons.svg#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderError(message = this._errorMessage) {
    const html = `
        <div class="error">
          <div>
            <svg>
             <use href="src/img/icons.svg#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderSpinner() {
    const html = `
      <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
