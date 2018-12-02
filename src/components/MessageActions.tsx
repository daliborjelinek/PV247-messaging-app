import * as React from 'react';
import '../styles/components/MessageActions.less';
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
export class MessageActions extends React.PureComponent<IProps> {

  public render() {
    return (
      <div className={'MessageActions'}>
        {this.props.isMyMessage ?
          <MessageActionsEditingContainer messageId={this.props.messageId} /> :
          <MessageActionsRatingContainer messageId={this.props.messageId} />
        }
        <div className={'MessageActions__rating badge badge-pill'}>{this.props.rating}</div>
      </div>
    );
  }
}
