import AbstractView from '../framework/view/abstract-view.js';
import {NoDataText} from '../const.js';

const createFilmNoDataTemplate = (noDataText) => (
  `<h2 class="films-list__title">${noDataText}</h2>`
);

export default class FilmNoDataView extends AbstractView {
  #noDataText = null;

  constructor (filmFilter) {
    super();
    this.#noDataText = NoDataText[filmFilter];
  }

  get template() {
    return createFilmNoDataTemplate(this.#noDataText);
  }
}
