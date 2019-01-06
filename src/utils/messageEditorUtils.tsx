import * as Immutable from 'immutable';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {ContentBlock, ContentState} from 'draft-js';
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
function getRelativeParent(element: HTMLElement | null): HTMLElement | null {
  if (!element) {
    return null;
  }

  const position = window.getComputedStyle(element).getPropertyValue('position');
  if (position !== 'static') {
    return element;
  }

  return getRelativeParent(element.parentElement);
}

export function positionSuggestions(_ref: any) {
  const decoratorRect = _ref.decoratorRect,
    popover = _ref.popover,
    state = _ref.state,
    props = _ref.props;

  const relativeParent = getRelativeParent(popover.parentElement);
  const relativeRect: any = {};

  if (relativeParent) {
    relativeRect.scrollLeft = relativeParent.scrollLeft;
    relativeRect.scrollTop = relativeParent.scrollTop;

    const relativeParentRect = relativeParent.getBoundingClientRect();
    relativeRect.left = decoratorRect.left - relativeParentRect.left;
    relativeRect.top = decoratorRect.bottom - relativeParentRect.top;
  } else {
    relativeRect.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    relativeRect.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    relativeRect.top = decoratorRect.bottom;
    relativeRect.left = decoratorRect.left;
  }

  const left = relativeRect.left + relativeRect.scrollLeft;
  const top = relativeRect.top + relativeRect.scrollTop;

  let transform = '';
  let transition = '';
  if (state.isActive) {
    if (props.suggestions.length > 0) {
      transform = 'scale(1)';
      transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
    } else {
      transform = 'scale(0)';
      transition = 'all 0.35s cubic-bezier(.3,1,.2,1)';
    }
  }

  return {
    left: left + 40 + 'px',
    top: top - top - 20 + 'px',
    transform,
    transformOrigin: '1em 0%',
    transition,
  };
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
