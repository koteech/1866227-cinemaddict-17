import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsContainerView from '../view/film-details-container-view.js';
import {render, replace, remove} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class FilmPresenter {
  #comments = [];
  #filmCountainerElement = null;
  #filmCardComponent = null;
  #filmDetailsComponent = null;
  #filmDetailsContainerComponent = null;
  #pageBodyElement = null;
  #filmModel = null;
  #commentModel = null;
  #changeData = null;
  #changeMode = null;
  #handleViewAction = null;
  #mode = Mode.DEFAULT;
  #scrollTopDetails = null;
  #updatedFilm = null;
  #prevFilmCardComponent = null;
  #prevFilmDetailsComponent = null;

  constructor (filmCountainerElement, pageBodyElement, filmModel, commentModel, changeData, changeMode) {
    this.#filmCountainerElement = filmCountainerElement;
    this.#pageBodyElement = pageBodyElement;
    this.#filmModel = filmModel;
    this.#commentModel = commentModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(film) {
    this.film = film;
    this.#comments = this.#commentModel.comments;
    this.#prevFilmCardComponent = this.#filmCardComponent;
    this.#prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmCardComponent = new FilmCardView(this.film);
    this.#setFilmHandlers();
    this.#filmDetailsComponent = new FilmDetailsView(this.film, []);
    this.#setFilmDetailsHandlers();
    this.#filmDetailsContainerComponent = new FilmDetailsContainerView();

    if (this.#prevFilmCardComponent === null && this.#prevFilmDetailsComponent === null) {
      return render(this.#filmCardComponent, this.#filmCountainerElement);
    }

    if (!this.isOpen()) {
      replace(this.#filmCardComponent, this.#prevFilmCardComponent);
      remove(this.#prevFilmCardComponent);
    }

    if (this.isOpen()) {
      this.#replaceFilmDetailsComponent(this.#comments);
    }
  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmDetailsComponent);
  };

  partialDestroy = () => {
    remove(this.#filmCardComponent);
  };

  #openfilmDetails = () => {
    if (this.#mode === Mode.DEFAULT) {
      render(this.#filmDetailsContainerComponent, this.#pageBodyElement);
      render(this.#filmDetailsComponent, this.#filmDetailsContainerComponent.element);
      document.addEventListener('keydown', this.#escKeydownHandler);
      this.#changeMode();
      this.#mode = Mode.OPENED;
      this.#getCommentsAndUpdateDetails();
    }
  };

  #closefilmDetails = () => {
    this.#mode = Mode.DEFAULT;
    this.#filmDetailsComponent.reset(this.film);
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsContainerComponent.element.remove();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      document.body.classList.remove('hide-overflow');
      this.#closefilmDetails();
    }
  };

  #handleWatchListClick = async () => {
    try {
      await this.#changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {
          ...this.film,
          userDetails: {
            ...this.film.userDetails,
            watchlist: !this.film.userDetails.watchlist,
          }
        }
      );
    } catch {
      this.#rollBackChanges();
    }
  };

  #handleWatchedClick = async () => {
    try {
      await this.#changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {...this.film,
          userDetails: {
            ...this.film.userDetails,
            alreadyWatched: !this.film.userDetails.alreadyWatched,
          }
        }
      );
    } catch {
      this.#rollBackChanges();
    }
  };

  #handleFavoriteClick = async() => {
    try {
      await this.#changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        {
          ...this.film,
          userDetails: {
            ...this.film.userDetails,
            favorite: !this.film.userDetails.favorite,
          }
        }
      );
    } catch {
      this.#rollBackChanges();
    }
  };

  #handleCommentDeleteClick = async (commentId) => {
    try {
      await this.#commentModel.deleteComment(
        UpdateType.MINOR,
        commentId
      );

      this.#changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.MINOR,
        {
          ...this.film,
          comments: this.film.comments.filter((filmCommentId) => filmCommentId !== commentId),
        }
      );
    } catch {
      this.#rollBackChanges();
    }
  };

  #handleCommentAdd = async (update) => {
    try {
      this.#updatedFilm = await this.#commentModel.addComment(this.film.id, update);

      this.#changeData(
        UserAction.ADD_COMMENT,
        UpdateType.MINOR,
        this.#updatedFilm
      );
    } catch {
      this.#rollBackChanges();
    }
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closefilmDetails();
    }
  };

  isOpen = () => this.#mode === Mode.OPENED;

  #setFilmHandlers = () => {
    this.#filmCardComponent.setClickHandler(this.#openfilmDetails);
    this.#filmCardComponent.setWatchListClickHandler(this.#handleWatchListClick);
    this.#filmCardComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
  };

  #setFilmDetailsHandlers = () => {
    this.#filmDetailsComponent.setCloseButtonClickHandler(this.#closefilmDetails);
    this.#filmDetailsComponent.setWatchListClickHandler(this.#handleWatchListClick);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmDetailsComponent.setCommentDeleteClickHandler(this.#handleCommentDeleteClick);
    this.#filmDetailsComponent.setCommentAddHandler(this.#handleCommentAdd);
  };

  #getCommentsAndUpdateDetails = async () => {
    const comments = await this.#commentModel.getCommentsById(this.film.id);
    this.#prevFilmDetailsComponent = this.#filmDetailsComponent;
    this.#replaceFilmDetailsComponent(comments);
  };

  #replaceFilmDetailsComponent = (comments) => {
    this.#scrollTopDetails = this.#prevFilmDetailsComponent.element.scrollTop;
    this.#filmDetailsComponent = new FilmDetailsView(this.film, comments);
    this.#setFilmDetailsHandlers();
    replace(this.#filmDetailsComponent, this.#prevFilmDetailsComponent);
    this.#filmDetailsComponent.element.scrollTop = this.#scrollTopDetails;
    remove(this.#prevFilmDetailsComponent);
  };

  #rollBackChanges = () => {
    if (this.isOpen()) {
      const resetFilmDetails = () => {
        this.#filmDetailsComponent.updateElement({
          isCommentDeleting: false,
          isCommentAdding: false,
          isFilmUpdating: false
        });
      };

      this.#filmDetailsComponent.shake(resetFilmDetails);
      return true;
    }

    const resetFilm = () => {
      this.#filmCardComponent.updateElement({
        isFilmUpdating: false
      });
    };
    this.#filmCardComponent.shake(resetFilm);
  };
}

