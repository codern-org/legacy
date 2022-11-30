import { ReplaceTypes } from '@codern/internal';

type BigIntToNumber<T extends object> = ReplaceTypes<T, bigint, number>;

export const convertBigIntToNumber = <T extends object>(object: T): BigIntToNumber<T> => {

  Object.keys(object).forEach((key) => {
    const value = object[key as keyof T];

    if (value instanceof BigInt) {
      // eslint-disable-next-line no-param-reassign
      object[key as keyof T] = (Number(value) as T[keyof T]);
      return;
    }

    if ((typeof value === 'object') && (value !== null)) {
      convertBigIntToNumber(value);
    }
  });

  return object as BigIntToNumber<T>;
};
