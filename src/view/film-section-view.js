import AbstractView from '../framework/view/abstract-view.js';

const createFilmSectionTemplate = () => '<section class="films"></section>';

export default class FilmSectionView extends AbstractView {
  get template() {
    return createFilmSectionTemplate();
  }
}
