import FilmPresenter from './film-presenter.js';
import FilmSectionView from '../view/film-section-view.js';
import FilmListView from '../view/film-list-view.js';
import {filter} from '../utils/filter.js';
import SortView from '../view/sort-view.js';
import FilmNoDataView from '../view/film-no-data-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import {SectionSettings, SortType, UserAction, UpdateType} from '../const.js';
import {remove, render} from '../framework/render.js';
import {sortFilmByDate, sortFilmByRating} from '../utils/film.js';
import LoadingView from '../view/loading-view.js';

const ALL_FILM_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #mainContainer = null;
  #footerStatisticsElement = null;
  #pageBodyElement = null;
  #filmModel = null;
  #commentModel = null;
  #filterModel = null;
  #filmPresenter = new Map();
  #openFilmPresenter = null;
  #renderedAllFilms = ALL_FILM_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;
  #pagePosition = null;
  #prevAllFilmsCount = null;
  #isLoading = true;

  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #noFilmComponent = null;
  #filmSectionComponent = new FilmSectionView();
  #allFilmListComponent = new FilmListView(SectionSettings.ALL.TITLE);
  #allFilmListContainerComponent = new FilmListContainerView();
  #topRatedFilmListComponent = new FilmListView(SectionSettings.TOP_RATED.TITLE, true);
  #topRatedFilmListContainerComponent = new FilmListContainerView();
  #mostCommentedFilmListComponent = new FilmListView(SectionSettings.MOST_COMMENTED.TITLE, true);
  #mostCommentedFilmListContainerComponent = new FilmListContainerView();
  #loadMoreButtonComponent = new LoadMoreButtonView();

  constructor (mainContainer, pageBodyElement, filmModel, commentModel, filterModel) {
    this.#mainContainer = mainContainer;
    this.#pageBodyElement = pageBodyElement;
    this.#filmModel = filmModel;
    this.#commentModel = commentModel;
    this.#filterModel = filterModel;
    this.#filmModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderBoard();
  };

  get films() {
    const filterType = this.#filterModel.filter;
    const films = this.#filmModel.films;
    const filteredFilms = filter[filterType](films);

    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return [...filteredFilms].sort(sortFilmByDate);
      case SortType.BY_RATING:
        return [...filteredFilms].sort(sortFilmByRating);
    }

    return filteredFilms;
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

  #renderFilmCards () {
    this.#renderAllFilmCards();
    this.#renderTopRatedFilmCards();
    this.#renderMostCommentedFilmCards();
  }

  #renderAllFilmCards () {
    this.films
      .slice(0, this.#renderedAllFilms)
      .forEach((film) => this.#renderFilm(film, this.#allFilmListContainerComponent.element));
  }

  #renderTopRatedFilmCards () {
    this.#filmModel.topRatedFilms.forEach((film) => this.#renderFilm(film, this.#topRatedFilmListContainerComponent.element));
  }

  #renderMostCommentedFilmCards () {
    this.#filmModel.mostCommentedFilms.forEach((film) => this.#renderFilm(film, this.#mostCommentedFilmListContainerComponent.element));
  }

  #renderSortComponent () {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#sortComponent, this.#mainContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderNoTasks = () => {
    this.#noFilmComponent = new FilmNoDataView(this.#filterModel.filter);
    render(this.#noFilmComponent, this.#allFilmListComponent.element);
  };

  #handleLoadMoreButtonClick = () => {
    this.films
      .slice(this.#renderedAllFilms, this.#renderedAllFilms += ALL_FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film, this.#allFilmListContainerComponent.element));

    if (this.films.length <= this.#renderedAllFilms) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedAllFilms: true});
    this.#renderBoard();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        try {
          await this.#filmModel.updateFilm(updateType, update);
        } catch {
          console.log('Can\'t update film');
        }
        break;
      case UserAction.DELETE_COMMENT:
      case UserAction.ADD_COMMENT:
        this.#filmModel.updateLocalFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id)
          .forEach((presenter) => presenter.init(data));
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedAllFilms: true, resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#filmPresenter
      .forEach((value) => value
        .forEach((presenter) => presenter.resetView()));
    if (this.#openFilmPresenter) {
      this.#openFilmPresenter.resetView();
    }
  };

  #clearBoard = ({resetRenderedAllFilms = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#pagePosition = document.documentElement.scrollTop;

    this.#filmPresenter
      .forEach((presenters) =>
        presenters.forEach((presenter) => {
          if (presenter.isOpen()) {
            this.#openFilmPresenter = presenter;
            return presenter.partialDestroy();
          }
          presenter.destroy();
        })
      );

    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadMoreButtonComponent);
    remove(this.#filmSectionComponent);
    remove(this.#allFilmListComponent);
    remove(this.#loadingComponent);
    remove(this.#mostCommentedFilmListComponent);
    remove(this.#topRatedFilmListComponent);

    if (this.#noFilmComponent) {
      remove(this.#noFilmComponent);
    }

    if (resetRenderedAllFilms) {
      this.#renderedAllFilms = ALL_FILM_COUNT_PER_STEP;
    } else {
      this.#renderedAllFilms = Math.min(filmCount, this.#renderedAllFilms);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #updateOpenFilmPresenter = () => {
    if (!this.#openFilmPresenter) {
      return true;
    }

    if (!this.#openFilmPresenter.isOpen) {
      this.#openFilmPresenter = null;
    }

    const updateFilm = this.#filmModel.films.filter((film) => film.id === this.#openFilmPresenter.film.id)[0];
    this.#openFilmPresenter.init(updateFilm);
  };

  #renderBoard = () => {
    render(this.#filmSectionComponent, this.#mainContainer);
    render(this.#allFilmListComponent, this.#filmSectionComponent.element);

    if (this.#isLoading) {
      render(this.#loadingComponent, this.#allFilmListComponent.element);
      this.#allFilmListComponent.element.firstElementChild.remove();
      return;
    }

    const films = this.films;
    const filmCount = films.length;

    this.#renderSortComponent();
    render(this.#filmSectionComponent, this.#mainContainer);
    render(this.#allFilmListComponent, this.#filmSectionComponent.element);

    if (filmCount === 0) {
      this.#renderNoTasks();
      remove(this.#sortComponent);

      return;
    }

    render(this.#allFilmListContainerComponent, this.#allFilmListComponent.element);
    render(this.#mostCommentedFilmListComponent, this.#filmSectionComponent.element);
    render(this.#mostCommentedFilmListContainerComponent, this.#mostCommentedFilmListComponent.element);
    render(this.#topRatedFilmListComponent, this.#filmSectionComponent.element);
    render(this.#topRatedFilmListContainerComponent, this.#topRatedFilmListComponent.element);

    this.#updateOpenFilmPresenter();
    this.#renderFilmCards();

    if (this.films.length > this.#renderedAllFilms) {
      render(this.#loadMoreButtonComponent, this.#allFilmListComponent.element);
      this.#loadMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
    }

    if (this.#pagePosition) {
      window.scrollTo(0, this.#pagePosition);
    }
  };
}
