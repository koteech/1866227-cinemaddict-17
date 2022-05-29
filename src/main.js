import BoardPresenter from './presenter/board-presenter.js';
import FilmModel from './model/film-model.js';
import CommentModel from './model/comment-model.js';
import {generateFilms} from './mock/film.js';
import {generateComments} from './mock/comments.js';

const TOTAL_COMMENTS_COUNT = 100;
const FILMS_COUNT = 13;

const filmModel = new FilmModel();
const commentModel = new CommentModel();

const setData = () => {
  const comments = generateComments(TOTAL_COMMENTS_COUNT);
  const films = generateFilms(FILMS_COUNT, comments);
  filmModel.films = films;
  commentModel.comments = comments;
};

const boardPresenter = new BoardPresenter(
  document.querySelector('.main'),
  document.querySelector('.header'),
  document.querySelector('.footer__statistics'),
  document.body,
  filmModel,
  commentModel
);

setData();
boardPresenter.init();

