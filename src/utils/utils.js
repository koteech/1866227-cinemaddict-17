import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const generateDate = () => {
  const daysGap = getRandomInteger(-1, -60);

  return dayjs().add(daysGap, 'day').toDate();
};

const getHumanDate = (date) => dayjs(date).format('DD MMMM YYYY');

const getDateForComment = (date) => {
  const dateInner = dayjs(date);
  const dayDiff = dayjs().diff(dateInner, 'days');

  if (dayDiff <= 1) {
    return 'Today';
  }
  if (dayDiff > 1 && dayDiff <= 30) {
    return `${dayDiff} days ago`;
  }
  if (dayDiff >30) {
    return dayjs(date).format('YYYY/MM/DD HH:MM');
  }

  return dayjs(date).format('YYYY/MM/DD HH:MM');
};


const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return `${hours  }h ${  minutes  }m`;
};


export {getRandomInteger, getRandomArrayElement, generateDate, getHumanDate, getTimeFromMins, getDateForComment};
