type Uuid = string;

type Action<T, S = any> = {
  type: T;
  payload?: S;
};

type AuthToken = {
  token: string;
  expiration: Date;
};

type Credentials = {
  email: string;
  password: string;
};

type ActiveChannelForUserMap = {
  [email: string]: Uuid;
};
