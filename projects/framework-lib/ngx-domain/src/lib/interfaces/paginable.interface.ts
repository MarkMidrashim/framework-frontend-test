export interface IPaginableAPIModel<T> {
  hasNext: boolean;
  items: T[];
}
