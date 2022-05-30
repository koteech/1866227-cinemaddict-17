import AbstractView from '../framework/view/abstract-view.js';
import ProfileView from '../view/profile-view.js';
import { render, replace, remove } from '../framework/render.js';

const profileMap = {
  novice: [0, 10],
  fan: [11, 20],
  'Movie Buff': [21, Infinity]
};

export default class ProfilePresenter extends AbstractView {
  #filmsWatchedCount = null;
  #profileName = null;
  #filmModel = null;
  #profileComponent = null;
  #profileContainer = null;

  constructor (profileContainer, filmModel) {
    super();
    this.#profileContainer = profileContainer;
    this.#filmModel = filmModel;
  }

  init = () => {
    this.#filmsWatchedCount = this.#getWatchedFilmsCount(this.#filmModel.films);
    this.#profileName = this.#getProfileName(this.#filmsWatchedCount)[0];
    const prevProfileComponent = this.#profileComponent;
    this.#filmModel.addObserver(this.#handleModelEvent);

    this.#profileComponent = new ProfileView(this.#profileName);

    if (prevProfileComponent === null) {
      render(this.#profileComponent, this.#profileContainer);
      return;
    }

    replace(this.#profileComponent, prevProfileComponent);
    remove(prevProfileComponent);
  };

  #getWatchedFilmsCount = (films) => films.filter((film) => film.userDetails.alreadyWatched).length;

  #getProfileName = (length) => Object.entries(profileMap)
    .filter(([, value]) => length >= value[0] && length <= value[1])
    .flat();

  #handleModelEvent = () => {
    this.init();
  };
}
