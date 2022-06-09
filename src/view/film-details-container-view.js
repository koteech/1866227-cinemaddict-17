import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsContainerTemplate = () => `<section class="film-details">
</section>`;

export default class FilmDetailsContainerView extends AbstractView {
  get template() {
    return createFilmDetailsContainerTemplate();
  }
}
