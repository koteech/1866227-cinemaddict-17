import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

const TOP_RATED_FILM_COUNT_PER_STEP = 2;
const MOST_COMMENTED_FILM_COUNT_PER_STEP = 2;

export default class FilmModel extends Observable {
  #films = [];
  #topRatedFilms = null;
  #mostCommentedFilms = null;
  #api = null;

  constructor (api) {
    super();
    this.#api = api;
  }

  init = async () => {
    try {
      const films = await this.#api.films;
      this.#films = films.map(this.#adaptFilmToClient);
    } catch(err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  };

  get films() {
    return this.#films;
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

  updateFilm = async (updateType, update) => {
    const index = this.#checkFilmExisting(update);

    try {
      const response = await this.#api.updateFilm(update);
      const updatedFilm = this.#adaptFilmToClient(response);
      this.#setLocalFilmAndNotify(index, updateType, updatedFilm);
    } catch {
      throw new Error('Can\'t update film');
    }
  };

  updateLocalFilm = async (updateType, update) => {
    const index = this.#checkFilmExisting(update);
    this.#setLocalFilmAndNotify(index, updateType, update);
  };

  #setLocalFilmAndNotify = (index, updateType, update) => {
    if (update.user_details) {
      update = this.#adaptFilmToClient(update);
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

  #checkFilmExisting = (update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }
    return index;
  };


  #adaptFilmToClient = (film) => {
    const adaptedFilm = {
      id: film.id,
      comments: film.comments,
      filmInfo: {...film.film_info,
        ageRating: film.film_info.age_rating,
        alternativeTitle: film.film_info.alternative_title,
        totalRating: film.film_info.total_rating,
        release: {
          date: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
          releaseCountry: film.film_info.release.release_country
        }
      },
      userDetails: {...film.user_details,
        alreadyWatched: film.user_details.already_watched,
        watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date
      }
    };

    delete adaptedFilm.filmInfo.age_rating;
    delete adaptedFilm.filmInfo.alternative_title;
    delete adaptedFilm.filmInfo.total_rating;
    delete adaptedFilm.userDetails.already_watched;
    delete adaptedFilm.userDetails.watching_date;

    return adaptedFilm;
  };
}

