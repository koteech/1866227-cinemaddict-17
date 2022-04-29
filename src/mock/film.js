import {getRandomInteger, createDataIds, getRandomArrayElement, generateDate} from '../utils.js';

const TITLE = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
];

const DESCRIPTIONS = [
  'Жизнь и репутация Питера Паркера оказываются под угрозой, поскольку Мистерио раскрыл всему миру тайну личности Человека-паука.',
  'После двух лет поисков правосудия на улицах Готэма для своих сограждан Бэтмен становится олицетворением беспощадного возмездия. ',
  'Уверенная в себе 13-летняя Мэй Ли разрывается между тем, чтобы оставаться прилежной и послушной маминой дочкой.',
  '1909 г. Два отважных исследователя отправляются на поиски следов датской экспедиции, участники которой исследовали Гренландию.',
  'Служба в армии с детства была мечтой Джеймса Рида, а зеленый берет — предметом гордости. ',
  'Действие разворачивается в детском лагере «Красный сокол».',
  'Ветеран Уилл Шарп отчаянно нуждается в деньгах, чтобы спасти смертельно больную жену.',
  'Ноа после череды неудачных свиданий отчаивается найти подходящего партнера с помощью приложение для знакомств.',
  'В постапокалиптическом мире шесть солдат, выполняющих секретную миссию, должны перевезти особый груз через замерзший архипелаг.',
  'История жизни и приключений легендарного советского боксера Валерия Попенченко, чемпиона СССР.',
  'Питер и Эмма никогда не были знакомы, но их мгновенно связывает одна вещь...',
];

const GENRES = [
  'Action',
  'Drama',
  'Comedy',
  'Fantasy',
  'Romance',
  'Criminal',
];

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const generateFilm = (id, comments) => ({
  id: id,
  comments: Array.from({length: getRandomInteger(0, comments.length)}, () => getRandomArrayElement(comments.map((comment) => comment.id))),
  filmInfo: {
    title: getRandomArrayElement(TITLE),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: getRandomInteger(10, 100) / 10,
    poster: `images/posters/${getRandomArrayElement(POSTERS)}`,
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
    watchlist: Boolean(getRandomInteger(0,1)),
    alreadyWatched: Boolean(getRandomInteger(0,1)),
    watchingDate: generateDate(),
    favorite: Boolean(getRandomInteger(0,1))
  }
});

export const generateFilms = (size, comments = []) => createDataIds(size).map((id) => generateFilm(id, comments));

