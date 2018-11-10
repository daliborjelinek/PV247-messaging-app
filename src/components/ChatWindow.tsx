import * as React from 'react';
import {MessageEditor} from './MessageEditor';
import './ChatWindow.less';
import {MessageListContainer} from '../containers/MessageListContainer';
import {ChannelHeaderContainer} from '../containers/ChannelHeaderContainer';

export class ChatWindow extends React.PureComponent {

  public render(): JSX.Element {
    return (
      <div className={'ChatWindow'}>
        <ChannelHeaderContainer />
        <MessageListContainer />
        <MessageEditor/>
      </div>
    );
  }

}
