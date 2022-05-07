import AbstractView from '../framework/view/abstract-view.js';

const createFooterStatisticsTemplate = (filmsCount) => `<p>${filmsCount} movies inside</p>`;

export default class FooterStatisticsView extends AbstractView {
  #filmsCount = null;

  constructor(films) {
    super();
    this.#filmsCount = films.length;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#filmsCount);
  }
}
