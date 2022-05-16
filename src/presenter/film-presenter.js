import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import {render, replace, remove} from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class FilmPresenter {
  #comments = null;
  #filmCountainerElement = null;
  #filmCardComponent = null;
  #filmDetailsComponent = null;
  #pageBodyElement = null;
  #filmModel = null;
  #changeData = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;

  constructor (filmCountainerElement, pageBodyElement, filmModel, changeData, changeMode) {
    this.#filmCountainerElement = filmCountainerElement;
    this.#pageBodyElement = pageBodyElement;
    this.#filmModel = filmModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(film) {
    this.film = film;
    this.#comments = this.#filmModel.getCommentsByFilm(film.id);

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmCardComponent = new FilmCardView(this.film);
    this.#filmDetailsComponent = new FilmDetailsView(this.film, this.#comments);

    this.#filmCardComponent.setClickHandler(this.#openfilmDetails);
    this.#filmCardComponent.setWatchListClickHandler(this.#handleWatchListClick);
    this.#filmCardComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmDetailsComponent.setCloseButtonClickHandler(this.#closefilmDetails);
    this.#filmDetailsComponent.setWatchListClickHandler(this.#handleWatchListClick);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevFilmCardComponent === null) {
      return render(this.#filmCardComponent, this.#filmCountainerElement);
    }

    replace(this.#filmCardComponent, prevFilmCardComponent);
    if (this.#mode === Mode.OPEND) {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmDetailsComponent);
  };

  #openfilmDetails = () => {
    render(this.#filmDetailsComponent, this.#pageBodyElement);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#changeMode();
    this.#mode = Mode.OPENED;

  };

  #closefilmDetails = () => {
    this.#mode = Mode.DEFAULT;
    this.#filmDetailsComponent.element.remove();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      document.body.classList.remove('hide-overflow');
      this.#closefilmDetails();
    }
  };

  #handleWatchListClick = () => {
    this.#changeData(
      Object.assign(
        {},
        this.film,
        {
          userDetails: {
            ...this.film.userDetails,
            watchlist: !this.film.userDetails.watchlist,
          },
        },
      ),
    );
  };

  #handleWatchedClick = () => {
    const updateFilm = {...this.film};
    updateFilm.userDetails.alreadyWatched = !updateFilm.userDetails.alreadyWatched;
    this.#changeData(updateFilm);
  };

  #handleFavoriteClick = () => {
    const updateFilm = {...this.film};
    updateFilm.userDetails.favorite = !updateFilm.userDetails.favorite;
    this.#changeData(updateFilm);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closefilmDetails();
    }
  };
}

