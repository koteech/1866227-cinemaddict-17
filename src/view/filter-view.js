import {createElement} from '../render.js';

const getFilters = (films) => {
  const filtersMap = {
    watchlist: (arr) => arr.filter((film) => film.userDetails.watchlist).length,
    history: (arr) => arr.filter((film) => film.userDetails.alreadyWatched).length,
    favorites: (arr) => arr.filter((film) => film.userDetails.favorite).length,
  };

  return Object.entries(filtersMap).map(([filterName, countFilms]) => (
    {
      name: filterName,
      count: countFilms(films),
    }
  ));
};

const createFilterItemTemplate = (filter) => `<a href="#${filter.name}" class="main-navigation__item">${filter.name.charAt(0).toUpperCase() + filter.name.slice(1)} <span class="main-navigation__item-count">${filter.count}</span></a>`;

const createFilterTemplate = (filters) => `<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  ${filters.map((filter) => createFilterItemTemplate(filter)).join(' ')}
</nav>`;


export default class FilterView {
  #filters = [];
  #element = null;

  constructor(films) {
    this.#filters = getFilters(films);
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
