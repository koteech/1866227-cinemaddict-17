import AbstractView from '../framework/view/abstract-view.js';
import {getDateForComment} from '../utils/utils.js';

const createFilmDetailsCommentTemplate = (comment) => `<li class="film-details__comment" id="${comment.id}">
<span class="film-details__comment-emoji">
  <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
</span>
<div>
  <p class="film-details__comment-text">${comment.comment}</p>
  <p class="film-details__comment-info">
    <span class="film-details__comment-author">${comment.author}</span>
    <span class="film-details__comment-day">${getDateForComment(comment.date)}</span>
    <button class="film-details__comment-delete">Delete</button>
  </p>
</div>
</li>`;

export default class FilmDetailsCommentView extends AbstractView {
  #comment = {};

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createFilmDetailsCommentTemplate(this.#comment);
  }
}
