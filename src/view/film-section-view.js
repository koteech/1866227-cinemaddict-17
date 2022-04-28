import {createElement, render} from '../render.js';
import FilmListView from '../view/film-list-view.js';

const ALL_MOVIES_LENGTH = 5;
const TOP_RATED_LENGTH = 2;
const MOST_COMMENTED_LENGTH = 2;
const IS_EXTRA = true;

const createFilmSectionTemplate = () => '<section class="films"></section>';

export default class FilmSectionView1 {
  getTemplate() {
    return createFilmSectionTemplate();
  }

  updateElement () {
    const element = createElement(this.getTemplate());
    render(new FilmListView('All movies. Upcoming', ALL_MOVIES_LENGTH), element);
    render(new FilmListView('Top rated', TOP_RATED_LENGTH, IS_EXTRA), element);
    render(new FilmListView('Most commented', MOST_COMMENTED_LENGTH, IS_EXTRA), element);
    return element;
  }

  getElement() {
    if (!this.element) {
      this.element = this.updateElement();
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
