import AbstractView from '../framework/view/abstract-view.js';
import {NoDataText} from '../const.js';

const createFilmNoDataTemplate = (noDataText) => (
  `<h2 class="films-list__title">${noDataText}</h2>`
);

export default class FilmNoDataView extends AbstractView {
  #noDataText = null;

  constructor (filter) {
    super();
    this.#noDataText = NoDataText[filter];
  }

  get template() {
    return createFilmNoDataTemplate(this.#noDataText);
  }
}
