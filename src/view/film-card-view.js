import dayjs from 'dayjs';
import {getTimeFromMins} from '../utils/utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createBoardTemplate = (film) => `<article class="film-card" id=${film.id}>
<a class="film-card__link">
  <h3 class="film-card__title">${film.filmInfo.title}</h3>
  <p class="film-card__rating">${film.filmInfo.totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dayjs(film.filmInfo.release.date).year()}</span>
    <span class="film-card__duration">${getTimeFromMins(film.filmInfo.runtime)}</span>
    <span class="film-card__genre">${film.filmInfo.genre[0]}</span>
  </p>
  <img src="${film.filmInfo.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${film.filmInfo.description.length > 140? `${film.filmInfo.description.slice(0,139)  }...` : film.filmInfo.description}</p>
  <span class="film-card__comments">${film.comments.length} ${film.comments.length === 1? 'comment' : 'comments'}</span>
</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${film.userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${film.userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite ${film.userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
</div>
</article>`;

export default class FilmCardView extends AbstractView {
  #film = {};

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createBoardTemplate(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    document.body.classList.add('hide-overflow');
    this._callback.click();
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick= callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchListClick();
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
