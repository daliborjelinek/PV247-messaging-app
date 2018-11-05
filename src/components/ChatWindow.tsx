import * as React from 'react';
import * as  PropTypes from 'prop-types';
import {MessageList} from './MessageList';
import {ChannelHeader, IChannelHeaderProps} from './ChannelHeader';
import {IMessageProps, Message} from './Message';
import {MessageEditor} from './MessageEditor';
import './ChatWindow.less';

export interface IChatWindowProps {
  readonly messages: IMessageProps[];
  readonly selectedChannel: IChannelHeaderProps;
}

export class ChatWindow extends React.PureComponent<IChatWindowProps> {

  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      ...Message.propTypes
    })),
    selectedChannel: PropTypes.shape({...ChannelHeader.propTypes}),
  };

  public render(): JSX.Element {
    return (
      <div className={'ChatWindow'}>
        <ChannelHeader title={this.props.selectedChannel.title}
                       numberOfUsers={this.props.selectedChannel.numberOfUsers}
                       currentChannelId={this.props.selectedChannel.currentChannelId}/>
        <MessageList messages={this.props.messages}/>
        <MessageEditor/>
      </div>
    );
  }

}
