import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import {render, replace, remove} from '../framework/render.js';
import {UserAction, UpdateType} from '../const.js';

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
  #commentModel = null;
  #changeData = null;
  #changeMode = null;
  #handleViewAction = null;
  #mode = Mode.DEFAULT;
  #scrollTopDetails = null;

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
    this.#comments = this.#getCommentsByFilm();

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
    this.#filmDetailsComponent.setCommentDeleteClickHandler(this.#handleCommentDeleteClick);
    this.#filmDetailsComponent.setCommentAddHandler(this.#handleCommentAdd);

    if (prevFilmCardComponent === null) {
      return render(this.#filmCardComponent, this.#filmCountainerElement);
    }

    replace(this.#filmCardComponent, prevFilmCardComponent);
    remove(prevFilmCardComponent);

    if (this.#mode === Mode.OPENED) {
      this.#scrollTopDetails = prevFilmDetailsComponent.element.scrollTop;
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
      this.#filmDetailsComponent.element.scrollTop = this.#scrollTopDetails;
      remove(prevFilmDetailsComponent);
    }
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
    this.#filmDetailsComponent.reset(this.film);
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
  };

  #handleWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.film,
        userDetails: {
          ...this.film.userDetails,
          alreadyWatched: !this.film.userDetails.alreadyWatched,
        }
      }
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
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
  };

  #handleCommentDeleteClick = (commentId) => {
    console.log(commentId);
    this.#commentModel.deleteComment(
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
  };

  #handleCommentAdd = (update) => {
    this.#commentModel.addComment(
      UpdateType.MINOR,
      update
    );

    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.MINOR,
      {
        ...this.film,
        comments: [...this.film.comments, update.id],
      }
    );
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closefilmDetails();
    }
  };

  #getCommentsByFilm() {
    return this.#commentModel.comments.filter((comment) => this.film.comments.includes(comment.id));
  }
}

