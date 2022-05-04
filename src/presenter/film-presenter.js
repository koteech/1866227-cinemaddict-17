import FilmSectionView from '../view/film-section-view.js';
import FilmListView from '../view/film-list-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import FilmCardView from '../view/film-card-view.js';
import ProfileView from '../view/profile-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import FilmNoDataView from '../view/film-no-data-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsCommentView from '../view/film-details-comment-view.js';
import {SectionTitle} from '../const.js';
import {render} from '../render.js';

const ALL_FILM_COUNT_PER_STEP = 5;
const TOP_RATED_FILM_COUNT_PER_STEP = 2;
const MOST_COMMENTED_FILM_COUNT_PER_STEP = 2;

export default class FilmPresenter {
  #mainContainer = null;
  #profileElement = null;
  #footerStatisticsElement = null;
  #comments = null;
  #films = null;
  #filmModel = null;
  #renderedAllFilmShowen = ALL_FILM_COUNT_PER_STEP;

  #sortComponent = new SortView();
  #filmSectionComponent = new FilmSectionView();
  #allFilmListComponent = new FilmListView(SectionTitle.all);
  #allFilmListContainerComponent = new FilmListContainerView();
  #topRatedFilmListComponent = new FilmListView(SectionTitle.topRated, true);
  #topRatedFilmListContainerComponent = new FilmListContainerView();
  #mostCommentedFilmListComponent = new FilmListView(SectionTitle.mostCommented, true);
  #mostCommentedFilmListContainerComponent = new FilmListContainerView();
  #loadMoreButtonComponent = new LoadMoreButtonView();
  #filmDetailsComponent = null;

  constructor (mainContainer, profileElement, footerStatisticsElement, filmModel) {
    this.#mainContainer = mainContainer;
    this.#profileElement = profileElement;
    this.#footerStatisticsElement = footerStatisticsElement;
    this.#filmModel = filmModel;
    this.#comments = [...this.#filmModel.comments];
    this.#films = [...this.#filmModel.films];
  }

  init = () => {
    this.#renderPage();
    this.#renderFilmCards();
  };

  #renderFilm (film, FilmCountainerElement) {
    const filmCardComponent = new FilmCardView(film);
    render(filmCardComponent, FilmCountainerElement);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        closefilmDetails(evt, this.#filmDetailsComponent);
      }
    };

    const handleCloseButtonClick = (evt) => {
      closefilmDetails(evt, this.#filmDetailsComponent);
    };

    function closefilmDetails(evt, component) {
      evt.preventDefault();
      component.element.remove();
      component.removeElement();
      document.removeEventListener('keydown', onEscKeyDown);
      document.body.classList.remove('hide-overflow');
    }

    const onCardClick = () => {
      document.body.classList.add('hide-overflow');
      this.#filmDetailsComponent = new FilmDetailsView(film);
      render(this.#filmDetailsComponent, document.body);
      this.#filmModel.getCommentsByFilm(film.id).forEach((comment) => render(new FilmDetailsCommentView(comment), this.#filmDetailsComponent.element.querySelector('.film-details__comments-list')));
      document.addEventListener('keydown', onEscKeyDown);
      this.#filmDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', handleCloseButtonClick);
    };

    filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', onCardClick);
  }

  #handleLoadMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#films.slice(this.#renderedAllFilmShowen, this.#renderedAllFilmShowen + ALL_FILM_COUNT_PER_STEP).forEach((film) => this.#renderFilm(film, this.#allFilmListContainerComponent.element));
    this.#renderedAllFilmShowen += ALL_FILM_COUNT_PER_STEP;
    if (this.#films.length <= this.#renderedAllFilmShowen) {
      this.#loadMoreButtonComponent.element.remove();
    }
  };

  #renderPage () {
    render(new ProfileView(this.#films), this.#profileElement);
    render(new FooterStatisticsView(this.#films), this.#footerStatisticsElement);
    render(new FilterView(this.#films), this.#mainContainer);
    render(this.#sortComponent, this.#mainContainer);
    render(this.#filmSectionComponent, this.#mainContainer);
    render(this.#allFilmListComponent, this.#filmSectionComponent.element);

    if (this.#films.length < 1) {
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
  }

  #renderFilmCards () {
    this.#films.slice(0, Math.min(this.#films.length, ALL_FILM_COUNT_PER_STEP)).forEach((film) => this.#renderFilm(film, this.#allFilmListContainerComponent.element));
    if (this.#films.length > ALL_FILM_COUNT_PER_STEP) {
      render(this.#loadMoreButtonComponent, this.#allFilmListComponent.element);
      this.#loadMoreButtonComponent.element.addEventListener('click', this.#handleLoadMoreButtonClick);
    }
    this.#films.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating).slice(0, Math.min(this.#films.length, TOP_RATED_FILM_COUNT_PER_STEP)).forEach((film) => this.#renderFilm(film, this.#topRatedFilmListContainerComponent.element));
    this.#films.sort((a, b) => b.comments.length - a.comments.length).slice(0, Math.min(this.#films.length, MOST_COMMENTED_FILM_COUNT_PER_STEP)).forEach((film) => this.#renderFilm(film, this.#mostCommentedFilmListContainerComponent.element));
  }
}
