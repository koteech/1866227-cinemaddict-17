import {generateFilms} from '../mock/film.js';
import {generateComments} from '../mock/comments.js';

const FILMS_COUNT = 13;
const TOTAL_COMMENTS_COUNT = 100;

export default class FilmModel {
  #commentList = null;
  #filmList = null;

  get comments() {
    if (!this.#commentList) {
      this.#commentList = generateComments(TOTAL_COMMENTS_COUNT);
    }
    return this.#commentList;
  }

  get films() {
    if (!this.#filmList) {
      this.#filmList = generateFilms(FILMS_COUNT, this.comments);
    }

    return this.#filmList;
  }

  getCommentsByFilm(filmId) {
    const selectedFilm = this.films.find((film) => film.id === filmId);
    return this.comments.filter((comment) => selectedFilm.comments.includes(comment.id));
  }
}

