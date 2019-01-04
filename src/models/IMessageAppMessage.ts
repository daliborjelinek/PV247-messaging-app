import {RatingPolarity} from '../enums/RatingPolarity';
import {RawDraftContentState} from 'draft-js';

export interface  IMessageAppMessage {
  readonly id: Uuid;
  readonly value: RawDraftContentState;
  readonly createdAt: Date;
  readonly createdBy: Uuid;
  readonly updatedAt?: Date;
  readonly updatedBy?: Uuid;
  readonly rating: number;
  readonly usersWhoRatedMessage: UsersWhoRatedMessageMap;
}

export interface UsersWhoRatedMessageMap {
  [email: string]: RatingPolarity;
}
