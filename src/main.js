import FilmPresenter from './presenter/film-presenter.js';
import FilmModel from './model/film-model.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const filmModel = new FilmModel();
const filmPresenter = new FilmPresenter(siteMainElement, siteHeaderElement, siteFooterStatisticsElement, filmModel);

filmPresenter.init();

