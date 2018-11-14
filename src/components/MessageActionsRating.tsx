import * as React from 'react';
import './MessageActions.less';

/**
 * Message rating - up-voting and down-voting. This action is used for messages, where
 *   author is not the logged user.
 */
export function MessageActionsRating() {
  return (
    <div className={'MessageActions__actionIcons'}>
      <span className={'glyphicon glyphicon-plus'} />
      <span className={'glyphicon glyphicon-minus'} />
    </div>
  );
}
