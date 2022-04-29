import {render} from './render.js';
import FilmPresenter from './presenter/film-presenter.js';
import ProfileView from './view/profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmModel from './model/film-model.js';
//import FilmDetailsView from './view/film-details-view.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const filmPresenter = new FilmPresenter();

const dataModel = new FilmModel();
const comments = dataModel.getComments();
const films = dataModel.getFilms();

console.log(comments);
console.log(films);


render(new ProfileView(), siteHeaderElement);
render(new FooterStatisticsView(), siteFooterStatisticsElement);

filmPresenter.init(siteMainElement, films);
