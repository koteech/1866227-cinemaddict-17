import {createElement} from '../render.js';
import {getDateForComment} from '../utils.js';

const createFilmDetailsCommentTemplate = (comment) => `<li class="film-details__comment">
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

export default class FilmDetailsCommentView {
  constructor(comment) {
    this.comment = comment;
  }

  getTemplate() {
    return createFilmDetailsCommentTemplate(this.comment);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
