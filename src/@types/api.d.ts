type ServerResponseUser = {
  readonly email: string;
  readonly customData: {
    readonly id: Uuid;
    readonly password: string;
    readonly userName?: string;
    readonly name?: string;
  }
};
