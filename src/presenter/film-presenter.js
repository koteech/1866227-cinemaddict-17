import FilmSectionView from '../view/film-section-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import FilmCardView from '../view/film-card-view.js';
import {render} from '../render.js';

const ALL_MOVIES_LENGTH = 5;
const TOP_RATED_LENGTH = 2;
const MOST_COMMENTED_LENGTH = 2;

export default class FilmPresenter {

  init = (filmContainer, films) => {

    render(new FilterView(films), filmContainer);
    render(new SortView(), filmContainer);
    render(new FilmSectionView(), filmContainer);

    const allMoviesElement = document.querySelector('#all-movies');
    const allMoviesListContainerElement = allMoviesElement.querySelector('.films-list__container');
    const allMoviesListEmptyElement = allMoviesElement.querySelector('.films-list__empty');
    const topRatedElement = document.querySelector('#top-rated');
    const topRatedListContainerElement = topRatedElement.querySelector('.films-list__container');
    const mostCommentedElement = document.querySelector('#most-commented');
    const mostCommentedListContainerElement = mostCommentedElement.querySelector('.films-list__container');

    if (films.length > 0) {
      allMoviesListEmptyElement.classList.add('visually-hidden');
      films.slice(0, ALL_MOVIES_LENGTH).map((film) => render(new FilmCardView(film), allMoviesListContainerElement));
      films.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating).slice(0, TOP_RATED_LENGTH).map((film) => render(new FilmCardView(film), topRatedListContainerElement));
      films.sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_COMMENTED_LENGTH).map((film) => render(new FilmCardView(film), mostCommentedListContainerElement));
    }
  };
}


