import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatisticsTemplate = (filmsCount) => `<p>${filmsCount} movies inside</p>`;

export default class FooterStatisticsView extends AbstractView {
  #filmsCount = null;

  constructor(filmCount) {
    super();
    this.#filmsCount = filmCount;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#filmsCount);
  }
}
