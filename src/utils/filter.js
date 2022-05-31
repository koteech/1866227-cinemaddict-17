import {FilterType} from '../const.js';

export const filter = {
  [FilterType.ALL]: (arr) => arr,
  [FilterType.WATCH_LIST]: (arr) => arr.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (arr) => arr.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (arr) => arr.filter((film) => film.userDetails.favorite),
};
