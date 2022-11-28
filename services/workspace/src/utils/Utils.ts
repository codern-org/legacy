import { DateToNumber } from 'api-types';

export const convertDateToNumber = <T extends object>(object: T): DateToNumber<T> => {

  Object.keys(object).forEach((key) => {
    const value = object[key as keyof T];

    if (value instanceof Date) {
      // eslint-disable-next-line no-param-reassign
      object[key as keyof T] = (value.getTime() as T[keyof T]);
      return;
    }

    if ((typeof value === 'object') && (value !== null)) {
      convertDateToNumber(value);
    }
  });

  return object as DateToNumber<T>;
};
