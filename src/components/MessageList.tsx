import * as React from 'react';
import * as  PropTypes from 'prop-types';
import {IMessageProps, Message} from './Message';

export interface IMessageListProps {
  readonly messages: IMessageProps[];
}

export class MessageList extends React.PureComponent<IMessageListProps> {

  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      ...Message.propTypes
    })).isRequired,
  };

  public render(): JSX.Element {
    return (
      <div className={'MessageList'}>
        {this.props.messages.map((message) => {
          return <Message message={message.message} key={message.message.id}/>;
        })}
      </div>
    );
  }
}
