import Observable from '../framework/observable.js';


export default class CommentModel extends Observable {
  #comments = [];
  #api = null;

  constructor(api) {
    super();
    this.#api = api;
  }

  getCommentsById = async (filmId) => {
    try {
      const comments = await this.#api.getComments(filmId);
      this.#comments = comments;
    } catch(error) {
      this.#comments = [];
      throw new Error(error.message);
    }

    return this.#comments;
  };

  get comments() {
    return this.#comments;
  }

  set comments(comments) {
    this.#comments = comments;
  }

  deleteComment = async (updateType, id) => {
    await this.#api.deleteComment(id);
    this.#comments = this.#comments.filter((comment) => comment.id !== id);
  };

  addComment = async (filmId, update) => {
    const updatedData = await this.#api.addComment(filmId, update);
    this.#comments = updatedData.comments;
    return updatedData.movie;
  };
}

