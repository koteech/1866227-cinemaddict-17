import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ProfilePresenter from './presenter/profile-presenter.js';
import FilmModel from './model/film-model.js';
import CommentModel from './model/comment-model.js';
import FilterModel from './model/filter-model.js';
import {generateFilms} from './mock/film.js';
import {generateComments} from './mock/comments.js';

const TOTAL_COMMENTS_COUNT = 100;
const FILMS_COUNT = 25;

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

const filmModel = new FilmModel();
const commentModel = new CommentModel();
const filterModel = new FilterModel();

const setData = () => {
  const comments = generateComments(TOTAL_COMMENTS_COUNT);
  const films = generateFilms(FILMS_COUNT, comments);
  filmModel.films = films;
  commentModel.comments = comments;
};

const profilePresenter = new ProfilePresenter(
  siteHeaderElement,
  filmModel
);

const filterPresenter = new FilterPresenter(
  siteMainElement,
  filterModel,
  filmModel
);

const boardPresenter = new BoardPresenter(
  siteMainElement,
  siteFooterStatisticElement,
  siteBodyElement,
  filmModel,
  commentModel,
  filterModel
);

setData();
profilePresenter.init();
filterPresenter.init();
boardPresenter.init();

