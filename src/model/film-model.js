import {generateFilms} from '../mock/film.js';
import {generateComments} from '../mock/comments.js';

const FILMS_COUNT = 25;
const TOTAL_COMMENTS_COUNT = 20;

export default class FilmModel {

  getComments() {
    if (!this.comments) {
      this.comments = generateComments(TOTAL_COMMENTS_COUNT);
    }

    return this.comments;
  }

  getFilms() {
    if (!this.films) {
      this.films = generateFilms(FILMS_COUNT, this.comments);
    }

    return this.films;
  }
}

