export interface IResponse<T = undefined | any> {
  message: string;
  data: T;
}
