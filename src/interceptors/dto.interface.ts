export interface DtoInterface<T> {
  new (...args: T[]): {};
}
