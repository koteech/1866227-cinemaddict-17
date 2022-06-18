import Observable from '../framework/observable.js';
import {FilterType} from '../const.js';


export default class FilterModel extends Observable {
  #filter = FilterType.ALL;

  get filmFilter() {
    return this.#filter;
  }

  setFilmFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}

