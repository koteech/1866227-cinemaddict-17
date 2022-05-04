import {generateFilms} from '../mock/film.js';
import {generateComments} from '../mock/comments.js';

const FILMS_COUNT = 13;
const TOTAL_COMMENTS_COUNT = 100;

export default class FilmModel {
  #comments = null;
  #films = null;

  get comments() {
    if (!this.#comments) {
      this.#comments = generateComments(TOTAL_COMMENTS_COUNT);
    }
    return this.#comments;
  }

  get films() {
    if (!this.#films) {
      this.#films = generateFilms(FILMS_COUNT, this.#comments);
    }

    return this.#films;
  }
}

