import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const createFilterItemTemplate = (filmFilter, currentFilter) => `
  <a id="${filmFilter.type}" href="#${filmFilter.name}" class="main-navigation__item${filmFilter.type === currentFilter ? ' main-navigation__item--active' : ''}">
  ${filmFilter.type !== FilterType.ALL ?
    `${filmFilter.name.charAt(0).toUpperCase() + filmFilter.name.slice(1)}
    <span class="main-navigation__item-count">${filmFilter.count}</span>`
    : 'All movies'}
  </a>`;

const createFilterTemplate = (filters, currentFilter) => `<nav class="main-navigation">
  ${filters.map((filmFilter) => createFilterItemTemplate(filmFilter, currentFilter)).join(' ')}
</nav>`;


export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.querySelectorAll('.main-navigation__item').forEach((element) => element.addEventListener('click', this.#FilterTypeChangeHandler)) ;
  };

  #FilterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.currentTarget.id);
  };
}

