import {createElement} from '../render.js';

const createFooterStatisticsTemplate = (filmsCount) => `<p>${filmsCount} movies inside</p>`;

export default class FooterStatisticsView {
  constructor(films) {
    this.filmsCount = films.length;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this.filmsCount);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
