import Observable from '../framework/observable.js';

const TOP_RATED_FILM_COUNT_PER_STEP = 2;
const MOST_COMMENTED_FILM_COUNT_PER_STEP = 2;

export default class FilmModel extends Observable {
  #films = null;
  #topRatedFilms = null;
  #mostCommentedFilms = null;

  get films() {
    return this.#films;
  }

  set films(films) {
    this.#films = films;
  }

  get topRatedFilms () {
    if (!this.#topRatedFilms) {
      this.#topRatedFilms = [...this.films]
        .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
        .slice(0, Math.min(this.films.length, TOP_RATED_FILM_COUNT_PER_STEP));
    }

    return this.#topRatedFilms;
  }

  get mostCommentedFilms () {
    if (!this.#mostCommentedFilms) {
      this.#mostCommentedFilms = [...this.films]
        .sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, Math.min(this.films.length, MOST_COMMENTED_FILM_COUNT_PER_STEP));
    }

    return this.#mostCommentedFilms;
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this.#mostCommentedFilms = null;
    this.#topRatedFilms = null;

    this._notify(updateType, update);
  };
}

