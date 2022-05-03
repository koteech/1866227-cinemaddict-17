import {createElement, render} from '../render.js';
import FilmCardView from './film-card-view.js';
import ShowMoreButtonView from './show-more-button-view.js';

const createFilmListTemplate = (title, isExtra) => `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
<h2 class="films-list__title ${!isExtra ? 'visually-hidden' : ''}">${title}</h2>
</section>`;

export default class FilmListView {
  #title = null;
  #isExtra = null;
  #element = null;

  constructor(title, isExtra) {
    this.#title = title;
    this.#isExtra = isExtra;
  }

  get template() {
    return createFilmListTemplate(this.#title, this.#isExtra);
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
