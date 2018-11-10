type Uuid = string;

type Action<T> = {
  type: T;
  payload?: any;
};
