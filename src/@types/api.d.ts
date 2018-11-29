import {UsersWhoRatedMessageMap} from '../models/IMessageAppMessage';

export type ServerResponseUser = {
  readonly email: string;
  readonly customData: {
    readonly id: Uuid;
    readonly password: string;
    readonly userName?: string;
    readonly name?: string;
  };
};

export type ServerResponseChannel = {
  readonly id: Uuid;
  readonly name: string;
  readonly customData: {
    readonly countOfNewMessages: number;
    readonly userIds: Uuid[];
  };
};

export type ServerRequestChannel = {
  name: string;
  customData: {
    countOfNewMessages: number;
    userIds: Uuid[];
  };
};

export type ServerResponseMessage = {
  readonly id: Uuid;
  readonly value: string;
  readonly createdAt: Date;
  readonly createdBy: Uuid;
  readonly updatedAt?: Date;
  readonly updatedBy?: Uuid;
  readonly customData: {
    readonly rating: number;
    readonly usersWhoRatedMessage: UsersWhoRatedMessageMap;
  };
};
