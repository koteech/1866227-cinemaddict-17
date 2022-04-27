import {render} from './render.js';
import FilmPresenter from './presenter/film-presenter.js';
import ProfileView from './view/profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
//import FilmDetailsView from './view/film-details-view.js';


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const filmPresenter = new FilmPresenter();

render(new ProfileView(), siteHeaderElement);
render(new FooterStatisticsView(), siteFooterStatisticsElement);

filmPresenter.init(siteMainElement);
