export type Nullable<T> = T | null;
export type Undetectable<T> = T | undefined;
export type TimeoutType = ReturnType<typeof setTimeout> | undefined | NodeJS.Timer