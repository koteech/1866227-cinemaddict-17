import BoardPresenter from './presenter/board-presenter.js';
import FilmModel from './model/film-model.js';

const boardPresenter = new BoardPresenter(
  document.querySelector('.main'),
  document.querySelector('.header'),
  document.querySelector('.footer__statistics'),
  document.body,
  new FilmModel()
);

boardPresenter.init();

