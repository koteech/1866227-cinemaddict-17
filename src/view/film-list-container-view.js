import {createElement} from '../render.js';

const createFilmListContainerTemplate = () => '<div class="films-list__container"></div>';

export default class FilmListContainerView {
  #element = null;

  get template() {
    return createFilmListContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
