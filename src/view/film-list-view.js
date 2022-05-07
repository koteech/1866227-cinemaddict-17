import AbstractView from '../framework/view/abstract-view.js';

const createFilmListTemplate = (title, isExtra) => `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
<h2 class="films-list__title ${!isExtra ? 'visually-hidden' : ''}">${title}</h2>
</section>`;

export default class FilmListView extends AbstractView{
  #title = null;
  #isExtra = null;

  constructor(title, isExtra) {
    super();
    this.#title = title;
    this.#isExtra = isExtra;
  }

  get template() {
    return createFilmListTemplate(this.#title, this.#isExtra);
  }
}
