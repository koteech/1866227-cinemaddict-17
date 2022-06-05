import AbstractView from '../framework/view/abstract-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class StatisticPresenter extends AbstractView {
  #filmModel = null;
  #statisticComponent = null;
  #statisticContainer = null;

  constructor (statisticContainer, filmModel) {
    super();
    this.#statisticContainer = statisticContainer;
    this.#filmModel = filmModel;
  }

  init = () => {
    const films = this.#filmModel.films;
    const filmCount = films.length;
    const prevStatisticComponent = this.#statisticComponent;
    this.#filmModel.addObserver(this.#handleModelEvent);

    this.#statisticComponent = new FooterStatisticsView(filmCount);

    if (prevStatisticComponent === null) {
      render(this.#statisticComponent, this.#statisticContainer);
      return;
    }

    replace(this.#statisticComponent, prevStatisticComponent);
    remove(prevStatisticComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
