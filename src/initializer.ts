export type Initializer<T extends object> = {
  [K in keyof T]?: T[K] extends Function ? never : T[K]
};