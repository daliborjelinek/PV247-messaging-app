import * as Immutable from 'immutable';

export interface IMessageAppChannel {
  readonly id: Uuid;
  readonly name: string;
  readonly countOfNewMessages: number;
  readonly userIds: Immutable.List<Uuid>;
  // TODO uncomment, if necessary
  // readonly messageIds: Immutable.List<Uuid>;
}