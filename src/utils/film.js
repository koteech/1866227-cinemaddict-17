import dayjs from 'dayjs';

const getWeightForNull = (A, B) => {
  if (A === null && B === null) {
    return 0;
  }

  if (A === null) {
    return 1;
  }

  if (B === null) {
    return -1;
  }
};

const sortFilmByDate = (filmA, filmB) => {
  const weight = getWeightForNull(filmA.filmInfo.release.date, filmB.filmInfo.release.date);
  return weight ?? dayjs(filmA.filmInfo.release.date).diff(dayjs(filmB.filmInfo.release.date));
};

const sortFilmByRating = (filmA, filmB) => {
  const weight = getWeightForNull(filmA.filmInfo.totalRating, filmB.filmInfo.totalRating);
  return weight ?? filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
};

export {sortFilmByDate, sortFilmByRating};
