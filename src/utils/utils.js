import dayjs from 'dayjs';

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


export {getHumanDate, getTimeFromMins, getDateForComment};
