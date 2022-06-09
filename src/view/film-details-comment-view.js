import AbstractView from '../framework/view/abstract-view.js';
import {getDateForComment} from '../utils/utils.js';
import he from 'he';

const createFilmDetailsCommentTemplate = (comment, isCommentDeleting) => `<li class="film-details__comment" id="${comment.id}">
<span class="film-details__comment-emoji">
  <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
</span>
<div>
  <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
  <p class="film-details__comment-info">
    <span class="film-details__comment-author">${comment.author}</span>
    <span class="film-details__comment-day">${getDateForComment(comment.date)}</span>
    <button class="film-details__comment-delete"${isCommentDeleting ? ' disabled' : ''}>Delete</button>
  </p>
</div>
</li>`;

export default class FilmDetailsCommentView extends AbstractView {
  #comment = {};
  #isCommentDeleting = null;

  constructor(comment, isCommentDeleting) {
    super();
    this.#comment = comment;
    this.#isCommentDeleting = isCommentDeleting;
  }

  get template() {
    return createFilmDetailsCommentTemplate(this.#comment, this.#isCommentDeleting);
  }
}
