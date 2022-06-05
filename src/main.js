import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import ProfilePresenter from './presenter/profile-presenter.js';
import StatisticPresenter from './presenter/statistic-pesenter.js';
import FilmModel from './model/film-model.js';
import CommentModel from './model/comment-model.js';
import FilterModel from './model/filter-model.js';
import Api from './api.js';

const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';
const AUTHORIZATION = 'Basic qwe123asdgv';

const siteBodyElement = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticElement = document.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);
const filmModel = new FilmModel(api);
const commentModel = new CommentModel(api);
const filterModel = new FilterModel();

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
  siteBodyElement,
  filmModel,
  commentModel,
  filterModel
);

const statisticPresenter = new StatisticPresenter(
  siteFooterStatisticElement,
  filmModel
);


profilePresenter.init();
filterPresenter.init();
boardPresenter.init();
statisticPresenter.init();
filmModel.init();


