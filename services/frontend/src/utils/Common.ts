export const classNames = (...classes: (string | false | null | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const numberWithCommas = (number: number) => {
  return new Intl.NumberFormat('en-US').format(number);
};
