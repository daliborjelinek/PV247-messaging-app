export interface IMessageAppUser {
  readonly email: string;
  readonly userName: string;
  readonly password: string;
  readonly picture?: string;
}

export interface IMessageAppUserWithPassword extends IMessageAppUser {
  password: string;
}
