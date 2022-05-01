import {render} from './render.js';
import FilmPresenter from './presenter/film-presenter.js';
import ProfileView from './view/profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmModel from './model/film-model.js';
import FilmDetailsPresenter from './presenter/film-details-presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const filmPresenter = new FilmPresenter();
const filmDetailsPresenter = new FilmDetailsPresenter();

const dataModel = new FilmModel();
const comments = dataModel.getComments();
const films = dataModel.getFilms();

// console.log(comments);
// console.log(films);

render(new ProfileView(films), siteHeaderElement);
render(new FooterStatisticsView(films), siteFooterStatisticsElement);

filmPresenter.init(siteMainElement, films);
filmDetailsPresenter.init(document.body, films, comments);
