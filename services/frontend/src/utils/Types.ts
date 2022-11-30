export type RequiredNotNull<T> = {
  [P in keyof T]: NonNullable<T[P]>
};
