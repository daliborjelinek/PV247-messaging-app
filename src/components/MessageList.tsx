import * as React from 'react';
import * as  PropTypes from 'prop-types';
import {IMessage, Message} from './Message';

export interface IMessageList {
  messages: IMessage[];
}

export class MessageList extends React.PureComponent<IMessageList> {

  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      ...Message.propTypes
    })).isRequired,
  };

  public render(): JSX.Element {
    return (
      <div className={'MessageList'}>
        {this.props.messages.map((message) => {
          return <Message id={message.id} text={message.text} date={message.date}
                   author={message.author} rating={message.rating} key={message.id}/>;
        })}
      </div>
    );
  }
}
