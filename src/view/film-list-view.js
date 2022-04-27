import {createElement, render} from '../render.js';
import FilmCardView from './film-card-view.js';
import ShowMoreButtonView from './show-more-button-view.js';

const createFilmListTemplate = (title, isExtra) => `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
<h2 class="films-list__title ${!isExtra ? 'visually-hidden' : ''}">${title}</h2>
<div class="films-list__container">
</div>
</section>`;

export default class FilmListView {
  constructor(title, count, isExtra) {
    this.title = title;
    this.count = count;
    this.isExtra = isExtra;
  }

  getTemplate() {
    return createFilmListTemplate(this.title, this.isExtra);
  }

  updateElement() {
    const element = createElement(this.getTemplate());
    const container = element.querySelector('.films-list__container');
    Array.from({length: this.count}).map(() => {render(new FilmCardView(),container)});
    !this.isExtra ? render(new ShowMoreButtonView, element) : '';
    return element
  }

  getElement() {
    if (!this.element) {
      this.element = this.updateElement();
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
