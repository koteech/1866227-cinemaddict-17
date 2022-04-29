import {render} from './render.js';
import FilmPresenter from './presenter/film-presenter.js';
import ProfileView from './view/profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import {generateFilms} from './mock/film.js';
import {generateComments} from './mock/comments.js';
//import FilmDetailsView from './view/film-details-view.js';

const FILMS_COUNT = 25;
const TOTAL_COMMENTS_COUNT = 20;


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const comments = generateComments(TOTAL_COMMENTS_COUNT);
console.log(comments);
const films = generateFilms(FILMS_COUNT, comments);
console.log(films);

const filmPresenter = new FilmPresenter();

render(new ProfileView(), siteHeaderElement);
render(new FooterStatisticsView(), siteFooterStatisticsElement);

filmPresenter.init(siteMainElement);
