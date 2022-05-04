import {createElement} from '../render.js';

const createFooterStatisticsTemplate = (filmsCount) => `<p>${filmsCount} movies inside</p>`;

export default class FooterStatisticsView {
  #filmsCount = null;
  #element = null;

  constructor(films) {
    this.#filmsCount = films.length;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#filmsCount);
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
