import FilmPresenter from './film-presenter.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListView from '../view/film-list-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ProfileView from '../view/profile-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import FilmNoDataView from '../view/film-no-data-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import {SectionSettings, SortType} from '../const.js';
import {remove, render} from '../framework/render.js';
import {sortFilmByDate, sortFilmByRating} from '../utils/film.js';

const ALL_FILM_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #mainContainer = null;
  #profileElement = null;
  #footerStatisticsElement = null;
  #pageBodyElement = null;
  #sourcedFilms = null;
  #films = null;
  #filmModel = null;
  #filmPresenter = new Map();
  #currentSortType = null;
  #renderedAllFilmShowen = ALL_FILM_COUNT_PER_STEP;

  #sortComponent = new SortView();
  #filmSectionComponent = new FilmSectionView();
  #allFilmListComponent = new FilmListView(SectionSettings.ALL.TITLE);
  #allFilmListContainerComponent = new FilmListContainerView();
  #topRatedFilmListComponent = new FilmListView(SectionSettings.TOP_RATED.TITLE, true);
  #topRatedFilmListContainerComponent = new FilmListContainerView();
  #mostCommentedFilmListComponent = new FilmListView(SectionSettings.MOST_COMMENTED.TITLE, true);
  #mostCommentedFilmListContainerComponent = new FilmListContainerView();
  #loadMoreButtonComponent = new LoadMoreButtonView();

  constructor (mainContainer, profileElement, footerStatisticsElement, pageBodyElement, filmModel) {
    this.#mainContainer = mainContainer;
    this.#profileElement = profileElement;
    this.#footerStatisticsElement = footerStatisticsElement;
    this.#pageBodyElement = pageBodyElement;
    this.#filmModel = filmModel;
  }

  init = () => {
    this.#sourcedFilms = [...this.#filmModel.films];
    this.#films = this.#filmModel.films;
    this.#currentSortType = SortType.DEFAULT;
    this.#renderPage();
  };

  #renderPage () {
    render(new ProfileView(this.#filmModel.films), this.#profileElement);
    render(new FooterStatisticsView(this.#filmModel.films), this.#footerStatisticsElement);
    this.#renderFilterComponent();
    this.#renderSortComponent();
    render(this.#filmSectionComponent, this.#mainContainer);
    render(this.#allFilmListComponent, this.#filmSectionComponent.element);

    if (this.#filmModel.films.length < 1) {
      render(new FilmNoDataView(), this.#allFilmListComponent.element);
      this.#sortComponent.element.remove();
      this.#allFilmListComponent.element.firstElementChild.remove();
      return true;
    }

    render(this.#mostCommentedFilmListComponent, this.#filmSectionComponent.element);
    render(this.#topRatedFilmListComponent, this.#filmSectionComponent.element);
    render(this.#allFilmListContainerComponent, this.#allFilmListComponent.element);
    render(this.#topRatedFilmListContainerComponent, this.#topRatedFilmListComponent.element);
    render(this.#mostCommentedFilmListContainerComponent, this.#mostCommentedFilmListComponent.element);

    this.#renderFilmCards();
  }

  #renderFilm (film, container) {
    const filmPresenter = new FilmPresenter(container, this.#pageBodyElement, this.#filmModel, this.#changeData, this.#changeMode);
    filmPresenter.init(film);
    if (this.#filmPresenter.has(film.id)) {
      this.#filmPresenter.get(film.id).push(filmPresenter);
      return;
    }
    this.#filmPresenter.set(film.id, [filmPresenter]);
  }

  #clearFilmCards = () => {
    this.#filmPresenter
      .forEach((value) => value
        .forEach((presenter) => presenter.destroy()));
    this.#filmPresenter.clear();
    this.#renderedAllFilmShowen = ALL_FILM_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  };

  #renderFilmCards () {
    this.#renderAllFilmCards();
    this.#renderTopRatedFilmCards();
    this.#renderMostCommentedFilmCards();
  }

  #renderAllFilmCards () {
    this.#films
      .slice(0, Math.min(this.#sourcedFilms.length, ALL_FILM_COUNT_PER_STEP))
      .forEach((film) => this.#renderFilm(film, this.#allFilmListContainerComponent.element));

    if (this.#filmModel.films.length > ALL_FILM_COUNT_PER_STEP) {
      render(this.#loadMoreButtonComponent, this.#allFilmListComponent.element);
      this.#loadMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
    }
  }

  #renderTopRatedFilmCards () {
    this.#filmModel.topRatedFilms.forEach((film) => this.#renderFilm(film, this.#topRatedFilmListContainerComponent.element));
  }

  #renderMostCommentedFilmCards () {
    this.#filmModel.mostCommentedFilms.forEach((film) => this.#renderFilm(film, this.#mostCommentedFilmListContainerComponent.element));
  }

  #renderSortComponent () {
    render(this.#sortComponent, this.#mainContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderFilterComponent () {
    render(new FilterView(this.#filmModel.films), this.#mainContainer);
  }

  #handleLoadMoreButtonClick = () => {
    this.#films
      .slice(this.#renderedAllFilmShowen, this.#renderedAllFilmShowen += ALL_FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film, this.#allFilmListContainerComponent.element));

    if (this.#sourcedFilms.length <= this.#renderedAllFilmShowen) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.BY_DATE:
        this.#films.sort(sortFilmByDate);
        break;
      case SortType.BY_RATING:
        this.#films.sort(sortFilmByRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmCards();
    this.#renderFilmCards();
  };

  #changeData = (updatedFilm) => {
    this.#filmPresenter.get(updatedFilm.id)
      .forEach((presenter) => presenter.init(updatedFilm));
  };

  #changeMode = () => {
    this.#filmPresenter
      .forEach((value) => value
        .forEach((presenter) => presenter.resetView()));
  };
}
