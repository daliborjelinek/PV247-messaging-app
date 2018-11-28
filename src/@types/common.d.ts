type Uuid = string;

type Action<T> = {
  type: T;
  payload?: any;
};

type AuthToken = {
  token: string;
  expiration: Date;
};

type Credentials = {
  email: string;
  password: string;
};
