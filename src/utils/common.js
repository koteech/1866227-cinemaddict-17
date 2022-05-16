import {nanoid} from 'nanoid';

const updateItem = (items, update) => {
  const index = items.find((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

const getHashCode = (string) => string.split('')
  .reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

const getCheckedAttribute = (flag) => flag ? 'checked' : '';

const addComponentId = (films) => films
  .map((film) => ({
    ...film,
    componentId: `${nanoid()}-${film.id}`,
  }));

export {
  updateItem,
  getHashCode,
  getCheckedAttribute,
  addComponentId
};
