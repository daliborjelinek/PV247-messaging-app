import * as React from 'react';
import * as Immutable from 'immutable';
import {MessageContainer} from '../containers/MessageContainer';
import './MessageList.less';
export interface IMessageListStateProps {
  readonly messageIds: Immutable.List<Uuid>;
}

type IProps = IMessageListStateProps;

export class MessageList extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    return (
      <div className={'MessageList'}>
        {this.props.messageIds.map((messageId) => {
          return <MessageContainer id={messageId} key={messageId}/>;
        })}
      </div>
    );
  }
}
