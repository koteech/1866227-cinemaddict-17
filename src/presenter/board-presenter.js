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
import {SectionSettings, SortType, UserAction, UpdateType} from '../const.js';
import {remove, render} from '../framework/render.js';
import {sortFilmByDate, sortFilmByRating} from '../utils/film.js';

const ALL_FILM_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #mainContainer = null;
  #profileElement = null;
  #footerStatisticsElement = null;
  #pageBodyElement = null;
  #filmModel = null;
  #commentModel = null;
  #filmPresenter = new Map();
  #renderedAllFilmShowen = ALL_FILM_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;

  #sortComponent = new SortView();
  #filmSectionComponent = new FilmSectionView();
  #allFilmListComponent = new FilmListView(SectionSettings.ALL.TITLE);
  #allFilmListContainerComponent = new FilmListContainerView();
  #topRatedFilmListComponent = new FilmListView(SectionSettings.TOP_RATED.TITLE, true);
  #topRatedFilmListContainerComponent = new FilmListContainerView();
  #mostCommentedFilmListComponent = new FilmListView(SectionSettings.MOST_COMMENTED.TITLE, true);
  #mostCommentedFilmListContainerComponent = new FilmListContainerView();
  #loadMoreButtonComponent = new LoadMoreButtonView();

  constructor (mainContainer, profileElement, footerStatisticsElement, pageBodyElement, filmModel, commentModel) {
    this.#mainContainer = mainContainer;
    this.#profileElement = profileElement;
    this.#footerStatisticsElement = footerStatisticsElement;
    this.#pageBodyElement = pageBodyElement;
    this.#filmModel = filmModel;
    this.#commentModel = commentModel;
    this.#filmModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderPage();
  };

  get films() {
    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return [...this.#filmModel.films].sort(sortFilmByDate);
      case SortType.BY_RATING:
        return [...this.#filmModel.films].sort(sortFilmByRating);
    }

    return this.#filmModel.films;
  }

  #renderPage () {
    render(new ProfileView(this.films), this.#profileElement);
    render(new FooterStatisticsView(this.films), this.#footerStatisticsElement);
    this.#renderFilterComponent();
    this.#renderSortComponent();
    render(this.#filmSectionComponent, this.#mainContainer);
    render(this.#allFilmListComponent, this.#filmSectionComponent.element);

    if (this.films.length < 1) {
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
    const filmPresenter = new FilmPresenter(container, this.#pageBodyElement, this.#filmModel, this.#commentModel, this.#handleViewAction, this.#handleModeChange);
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
    this.films
      .slice(0, Math.min(this.films.length, ALL_FILM_COUNT_PER_STEP))
      .forEach((film) => this.#renderFilm(film, this.#allFilmListContainerComponent.element));

    if (this.films.length > ALL_FILM_COUNT_PER_STEP) {
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
    render(new FilterView(this.films), this.#mainContainer);
  }

  #handleLoadMoreButtonClick = () => {
    this.films
      .slice(this.#renderedAllFilmShowen, this.#renderedAllFilmShowen += ALL_FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film, this.#allFilmListContainerComponent.element));

    if (this.films.length <= this.#renderedAllFilmShowen) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmCards();
    this.#renderFilmCards();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
      case UserAction.DELETE_COMMENT:
      case UserAction.ADD_COMMENT:
        this.#filmModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.#filmPresenter.get(data.id)
          .forEach((presenter) => presenter.init(data));
        break;
      // case UpdateType.MAJOR:
      //   this.#clearFilmCards();
      //   this.#renderFilmCards();
      //   break;
    }
  };

  #handleModeChange = () => {
    this.#filmPresenter
      .forEach((value) => value
        .forEach((presenter) => presenter.resetView()));
  };
}
