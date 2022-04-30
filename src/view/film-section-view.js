import {createElement} from '../render.js';

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
