export type Cache<T> = {
  data: T | null;
  fetchedAt: number;
};
