import {UsersWhoRatedMessageMap} from '../models/IMessageAppMessage';

export type ServerResponseUser = {
  readonly email: string;
  readonly customData: {
    readonly password: string;
    readonly userName?: string;
    readonly name?: string;
    readonly picture?: any;
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

export type ServerRequestMessage = {
  value: string;
  createdAt: Date;
  createdBy: Uuid;
  updatedAt?: Date;
  updatedBy?: Uuid;
  customData: {
     rating: number;
     usersWhoRatedMessage: UsersWhoRatedMessageMap;
  };
};
