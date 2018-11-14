import * as React from 'react';
import './MessageActions.less';

export interface IMessageActionsEditingOwnProps {
  messageId: Uuid;
}

export interface IMessageActionsEditingDispatchProps {
  deleteMessage(id: Uuid): void;
}

type IProps = IMessageActionsEditingOwnProps & IMessageActionsEditingDispatchProps;

/**
 * Actions over messages, when message author is logged user. Right now, app supports only delete messege function.
 *
 * @param props
 * @constructor
 */
export function MessageActionsEditing(props: IProps) {
  return (
    <div className={'MessageActions__actionIcons'}>
          <span className={'glyphicon glyphicon-trash'}
                onClick={() => props.deleteMessage(props.messageId)} />
    </div>
  );
}
