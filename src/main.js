import FilmPresenter from './presenter/film-presenter.js';
import FilmModel from './model/film-model.js';

const filmPresenter = new FilmPresenter(
  document.querySelector('.main'),
  document.querySelector('.header'),
  document.querySelector('.footer__statistics'),
  new FilmModel()
);

filmPresenter.init();

