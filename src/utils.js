import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const createDataIds = (size) => Array.from({length: size}, (item, index) => index + 1);

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const generateDate = () => {
  const daysGap = getRandomInteger(-1, -1825);

  return dayjs().add(daysGap, 'day').toDate();
};

export {getRandomInteger, createDataIds, getRandomArrayElement, generateDate};
