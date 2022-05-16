import {generateFilms} from '../mock/film.js';
import {generateComments} from '../mock/comments.js';
import {addComponentId} from '../utils/common.js';

const FILMS_COUNT = 13;
const TOTAL_COMMENTS_COUNT = 100;
const TOP_RATED_FILM_COUNT_PER_STEP = 2;
const MOST_COMMENTED_FILM_COUNT_PER_STEP = 2;

export default class FilmModel {
  #comments = null;
  #films = null;
  #topRatedFilms = null;
  #mostCommentedFilms = null;

  get comments() {
    if (!this.#comments) {
      this.#comments = generateComments(TOTAL_COMMENTS_COUNT);
    }
    return this.#comments;
  }

  get films() {
    if (!this.#films) {
      this.#films = generateFilms(FILMS_COUNT, this.comments);
    }

    return this.#films;
  }

  get topRatedFilms () {
    if (!this.#topRatedFilms) {
      this.#topRatedFilms = addComponentId(this.films)
        .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
        .slice(0, Math.min(this.films.length, TOP_RATED_FILM_COUNT_PER_STEP));
    }

    return this.#topRatedFilms;
  }

  get mostCommentedFilms () {
    if (!this.#mostCommentedFilms) {
      this.#mostCommentedFilms = addComponentId(this.films)
        .sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, Math.min(this.films.length, MOST_COMMENTED_FILM_COUNT_PER_STEP));
    }

    return this.#mostCommentedFilms;
  }

  getCommentsByFilm(filmId) {
    const selectedFilm = this.films.find((film) => film.id === filmId);
    return this.comments.filter((comment) => selectedFilm.comments.includes(comment.id));
  }
}

