import {createElement} from '../render.js';

const createFilmNoDataTemplate = () => (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

export default class FilmNoDataView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmNoDataTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
