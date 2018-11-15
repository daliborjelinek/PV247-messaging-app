import * as React from 'react';
import './MessageActions.less';
import {MessageActionsEditingContainer} from '../containers/MessageActionsEditingContainer';
import {MessageActionsRatingContainer} from '../containers/MessageActionsRatingContainer';

export interface IMessageRateOwnProps {
  isMyMessage: boolean;
  rating: number;
  messageId: Uuid;
}

type IProps = IMessageRateOwnProps;

/**
 * Message actions. If logged user is message author, message can be deleted. If logged user is not the message author,
 *   message can be rated.
 * @param props
 */
export function MessageActions(props: IProps) {
  return (
    <div className={'MessageActions'}>
      {props.isMyMessage ?
        <MessageActionsEditingContainer messageId={props.messageId} /> :
        <MessageActionsRatingContainer messageId={props.messageId} />
      }
      <div className={'MessageActions__rating badge badge-pill'}>{props.rating}</div>
    </div>
  );
}
