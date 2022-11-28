// https://stackoverflow.com/questions/72190916/replace-a-specific-type-with-another-type-in-a-nested-object-typescript

export type ReplaceType<Type, FromType, ToType> =
  Type extends FromType
    ? ToType
    : Type extends object
      ? ReplaceTypes<Type, FromType, ToType>
      : Type;

export type ReplaceTypes<ObjType extends object, FromType, ToType> = {
  [KeyType in keyof ObjType]: ReplaceType<ObjType[KeyType], FromType, ToType>;
};

export type DateToNumber<T extends object> = ReplaceTypes<T, Date, number>;
