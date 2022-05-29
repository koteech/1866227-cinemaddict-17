export const SECTION_EXTRA_TYPE = 'extra';

export const SectionSettings = {
  ALL: {
    TITLE: 'All movies. Upcoming',
  },
  TOP_RATED: {
    TITLE: 'Top rated',
    TYPE: SECTION_EXTRA_TYPE,
  },
  MOST_COMMENTED: {
    TITLE: 'Most commented',
    TYPE: SECTION_EXTRA_TYPE,
  },
};

export const SortType = {
  DEFAULT: 'default',
  BY_DATE: 'by-date',
  BY_RATING: 'by-rating',
};

export const UserAction = {
  UPDATE_TASK: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};
