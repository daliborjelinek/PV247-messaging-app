import * as Immutable from 'immutable';
import {IMessageAppUser} from '../models/IMessageAppUser';

/**
 * Returns list of users in mention format.
 * @param users
 */
export function getMentions(users: Immutable.List<IMessageAppUser>): Mention[] {
  const mentions: Mention[] = [];
  users.forEach((user) => {
    mentions.push({name: user.userName, avatar: user.picture});
  });
  return mentions;
}
