import {createElement} from '../render.js';
//import FilmListView from '../view/film-list-view.js';

// const ALL_MOVIES_LENGTH = 5;
// const TOP_RATED_LENGTH = 2;
// const MOST_COMMENTED_LENGTH = 2;
// const IS_EXTRA = true;

const createFilmSectionTemplate = () => `<section class="films">
<section id="all-movies" class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  <div class="films-list__container">
    <p class="films-list__empty">There are no movies in our database</p>
  </div>

  <button class="films-list__show-more">Show more</button>
</section>

<section id="top-rated" class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container">

  </div>
</section>

<section id="most-commented" class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container">

  </div>
</section>
</section>`;

export default class FilmSectionView1 {
  getTemplate() {
    return createFilmSectionTemplate();
  }

  // updateElement () {
  //   const element = createElement(this.getTemplate());
  //   render(new FilmListView('All movies. Upcoming', ALL_MOVIES_LENGTH), element);
  //   render(new FilmListView('Top rated', TOP_RATED_LENGTH, IS_EXTRA), element);
  //   render(new FilmListView('Most commented', MOST_COMMENTED_LENGTH, IS_EXTRA), element);
  //   return element;
  // }

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
