import dayjs from 'dayjs';
import {getTimeFromMins} from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createBoardTemplate = (state) => `<article class="film-card" id=${state.id}>
<a class="film-card__link">
  <h3 class="film-card__title">${state.filmInfo.title}</h3>
  <p class="film-card__rating">${state.filmInfo.totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${dayjs(state.filmInfo.release.date).year()}</span>
    <span class="film-card__duration">${getTimeFromMins(state.filmInfo.runtime)}</span>
    <span class="film-card__genre">${state.filmInfo.genre[0]}</span>
  </p>
  <img src="${state.filmInfo.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${state.filmInfo.description.length > 140? `${state.filmInfo.description.slice(0,139)  }...` : state.filmInfo.description}</p>
  <span class="film-card__comments">${state.comments.length} ${state.comments.length === 1? 'comment' : 'comments'}</span>
</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${state.userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button"${state.isFilmUpdating ? ' disabled' : ''}>Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${state.userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button"${state.isFilmUpdating ? ' disabled' : ''}>Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite ${state.userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button"${state.isFilmUpdating ? ' disabled' : ''}>Mark as favorite</button>
</div>
</article>`;

export default class FilmCardView extends AbstractStatefulView {

  constructor(film) {
    super();
    this._state = this.#convertFilmToState(film);
  }

  get template() {
    return createBoardTemplate(this._state);
  }

  #convertFilmToState = (film) => ({
    ...film,
    isFilmUpdating: false
  });

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  };

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
    this.updateElement({
      isFilmUpdating: true,
    });
    this._callback.watchListClick();
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      isFilmUpdating: true
    });
    this._callback.watchedClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      isFilmUpdating: true,
    });
    this._callback.favoriteClick();
  };
}
