export type ReplaceType<Type, FromType, ToType> =
  Type extends FromType
    ? ToType
    : Type extends object
      ? ReplaceTypes<Type, FromType, ToType>
      : Type;

export type ReplaceTypes<ObjType extends object, FromType, ToType> = {
  [KeyType in keyof ObjType]: ReplaceType<ObjType[KeyType], FromType, ToType>;
};
