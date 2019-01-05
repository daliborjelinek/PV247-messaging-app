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

/**
 * Method which should display suggestions correctly.
 */
export const positionSuggestions = (data: any) => {
  let transform;
  let transition;

  if (data.state.isActive) {
    if (data.props.suggestions.length > 0) {
      transform = 'scale(1)';
      transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
    } else {
      transform = 'scale(0)';
      transition = 'all 0.35s cubic-bezier(.3,1,.2,1)';
    }
  }
  return {
    transform,
    transition,
    left: 35 + 'px',
    bottom: 100 + 'px',
  };
};


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
