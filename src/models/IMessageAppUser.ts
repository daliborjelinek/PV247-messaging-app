export interface IMessageAppUser {
  readonly id: Uuid;
  readonly email: string;
  readonly userName?: string;
  readonly name?: string;
  readonly pictureUrl?: string;
}

export interface IMessageAppUserWithPassword extends IMessageAppUser {
  password: string;
}
