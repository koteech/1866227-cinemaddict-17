
import {createDataIds, getRandomArrayElement, generateDate} from '../utils.js';

const TEXTS = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];

const AUTHORS = [
  'Tim Merfy',
  'Marry Jain',
  'Top Hardy',
];

const EMOJIS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const generateComment = (id) => ({
  id: id,
  author: getRandomArrayElement(AUTHORS),
  comment: getRandomArrayElement(TEXTS),
  date: generateDate(),
  emotion: `${getRandomArrayElement(EMOJIS)}`,
});

export const generateComments = (size) => createDataIds(size).map((id) => generateComment(id));
