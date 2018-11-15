import {RatingPolarity} from '../enums/RatingPolarity';

export interface  IMessageAppMessage {
  readonly id: Uuid;
  readonly text: string;
  readonly date: string;
  readonly authorId: Uuid;
  readonly rating: number;
  readonly channelId: Uuid;
  // TODO could be immutable map, but it would make working with local storage difficult
  readonly usersWhoRatedMessage: UsersWhoRatedMessageMap;
}

export interface UsersWhoRatedMessageMap {
  [id: string]: RatingPolarity;
}
