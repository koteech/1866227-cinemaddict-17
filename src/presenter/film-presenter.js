import FilmSectionView from '../view/film-section-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class FilmPresenter {

  init = (filmContainer) => {

    render(new FilterView(), filmContainer);
    render(new SortView(), filmContainer);
    render(new FilmSectionView(), filmContainer);



  };
}


