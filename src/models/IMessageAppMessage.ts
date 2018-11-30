import {RatingPolarity} from '../enums/RatingPolarity';

export interface  IMessageAppMessage {
  readonly id: Uuid;
  readonly value: string;
  readonly createdAt: Date;
  readonly createdBy: Uuid;
  readonly updatedAt?: Date;
  readonly updatedBy?: Uuid;
  readonly rating: number;
  readonly usersWhoRatedMessage: UsersWhoRatedMessageMap;
}

export interface UsersWhoRatedMessageMap {
  [id: string]: RatingPolarity;
}
