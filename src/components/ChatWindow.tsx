import * as React from 'react';
import * as  PropTypes from 'prop-types';
import {MessageList} from './MessageList';
import {ChannelHeader, IChannelHeader} from './ChannelHeader';
import {IMessage, Message} from './Message';
import {MessageEditor} from './MessageEditor';

export interface IContent {
  messages: IMessage[];
  selectedChannel: IChannelHeader;
}

export class ChatWindow extends React.PureComponent<IContent> {

  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      ...Message.propTypes
    })),
    selectedChannel: PropTypes.shape({...ChannelHeader.propTypes}),
  };

  public render(): JSX.Element {
    return (
      <div className={'ChatWindow content'}>
        <ChannelHeader title={this.props.selectedChannel.title}
                       numberOfUsers={this.props.selectedChannel.numberOfUsers}
                       currentChannelId={this.props.selectedChannel.currentChannelId}/>
        <MessageList messages={this.props.messages}/>
        <MessageEditor/>
      </div>
    );
  }

}
