import {getRandomInteger, createDataIds, getRandomArrayElement, generateDate} from '../utils.js';

const TITLE = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const GENRES = [
  'Action',
  'Drama',
  'Comedy',
  'Fantasy',
  'Romance',
  'Criminal',
];

const generateFilm = (id, comments) => ({
  id: id,
  comments: Array.from({length: getRandomInteger(0, 5)}, () => getRandomArrayElement(comments.map((comment) => comment.id))),
  filmInfo: {
    title: getRandomArrayElement(TITLE),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: getRandomInteger(10, 100) / 10,
    poster: 'images/posters/blue-blazes.jpg',
    ageRating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano'
    ],
    actors: [
      'Morgan Freeman'
    ],
    release: {
      date: generateDate(),
      releaseCountry: 'Finland'
    },
    runtime: getRandomInteger(1, 100),
    genre: Array.from({length: getRandomInteger(1, 3)}, () => getRandomArrayElement(GENRES)),
    description: getRandomArrayElement(DESCRIPTIONS)
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: generateDate(),
    favorite: false
  }
});

export const generateFilms = (size, comments = []) => createDataIds(size).map((id) => generateFilm(id, comments));

