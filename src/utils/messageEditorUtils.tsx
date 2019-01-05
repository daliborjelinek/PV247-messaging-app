import * as Immutable from 'immutable';
import {IMessageAppUser} from '../models/IMessageAppUser';
import { ContentBlock, ContentState } from 'draft-js';
import {Link} from '../components/rich_text/Link';

// MENTIONS
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

// COLOR PICKER
export const colorStyleMap = {
  BLACK: {
    color: 'black',
  },
  RED: {
    color: 'red',
  },
  GREEN: {
    color: 'green',
  },
  BLUE: {
    color: 'blue',
  },
  YELLOW: {
    color: 'yellow',
  },
  BROWN: {
    color: 'brown',
  },
};

export function findLinkEntities(contentBlock: ContentBlock, callback: any, contentState: ContentState): void {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

// DECORATORS
export const decorators = [
  {
    strategy: findLinkEntities,
    component: Link,
  }
];
