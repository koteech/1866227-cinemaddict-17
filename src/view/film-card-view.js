import {createElement} from '../render.js';
import dayjs from 'dayjs';

const createBoardTemplate = (film) => `<article class="film-card" id=${film.id}>
<a class="film-card__link">
  <h3 class="film-card__title">${film.filmInfo.title}</h3>
  <p class="film-card__rating">${film.filmInfo.totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dayjs(film.filmInfo.release.date).year()}</span>
    <span class="film-card__duration">1h 59m</span>
    <span class="film-card__genre">${film.filmInfo.genre[0]}</span>
  </p>
  <img src="${film.filmInfo.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${film.filmInfo.description.length > 140? `${film.filmInfo.description.slice(0,139)  }...` : film.filmInfo.description}</p>
  <span class="film-card__comments">${film.comments.length} ${film.comments.length === 1? 'comment' : 'comments'}</span>
</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
</div>
</article>`;

export default class FilmCardView {
  #film = {};
  #element = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createBoardTemplate(this.#film);
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
