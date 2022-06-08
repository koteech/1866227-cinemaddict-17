import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const createFilterItemTemplate = (filter, currentFilter) => `
  <a id="${filter.type}" href="#${filter.name}" class="main-navigation__item${filter.type === currentFilter ? ' main-navigation__item--active' : ''}">
  ${filter.type !== FilterType.ALL ?
    `${filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}
    <span class="main-navigation__item-count">${filter.count}</span>`
    : 'All movies'}
  </a>`;

const createFilterTemplate = (filters, currentFilter) => `<nav class="main-navigation">
  ${filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join(' ')}
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

