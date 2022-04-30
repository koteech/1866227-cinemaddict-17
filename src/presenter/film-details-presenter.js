import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsCommentView from '../view/film-details-comment-view.js';
import {render} from '../render.js';

const getFilmComments = (film, allComments) => allComments.filter((comment) => film.comments.includes(comment.id));

export default class FilmDetailsPresenter {

  init = (filmContainer, films, comments) => {
    const onFilmCardClick = (evt) => {
      const elementId = parseInt(evt.target.closest('.film-card').id, 10);
      const selectedFilm = films.filter((film) => film.id === elementId)[0];
      const selectedFilmComments = getFilmComments(selectedFilm, comments);

      render(new FilmDetailsView(selectedFilm), filmContainer);
      const filmDetainsCommentContainer = document.querySelector('.film-details__comments-list');
      selectedFilmComments.forEach((comment) => render(new FilmDetailsCommentView(comment), filmDetainsCommentContainer));

      document.querySelector('.film-details__close-btn').addEventListener('click', () => document.querySelector('.film-details').remove());
    };

    if (films.length > 0) {
      document.querySelectorAll('.film-card__link').forEach((element) => element.addEventListener('click',onFilmCardClick));
    }
  };
}
