import * as React from 'react';
import './ChatWindow.less';
import {MessageListContainer} from '../containers/MessageListContainer';
import {ChannelHeaderContainer} from '../containers/ChannelHeaderContainer';
import {MessageEditorContainer} from '../containers/MessageEditorContainer';

export class ChatWindow extends React.PureComponent {

  public render(): JSX.Element {
    return (
      <div className={'ChatWindow'}>
        <ChannelHeaderContainer />
        <MessageListContainer />
        <MessageEditorContainer />
      </div>
    );
  }

}
