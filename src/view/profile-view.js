import AbstractView from '../framework/view/abstract-view.js';

const createProfileTemplate = (profileName) => `<section class="header__profile profile">
<p class="profile__rating">${profileName.charAt(0).toUpperCase() + profileName.slice(1)}</p>
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;

export default class ProfileView extends AbstractView {
  #profileName = null;

  constructor(profileName) {
    super();
    this.#profileName = profileName;
  }

  get template() {
    return createProfileTemplate(this.#profileName);
  }
}
