import * as React from 'react';
import '../styles/components/ChatWindow.less';
import {MessageListContainer} from '../containers/MessageListContainer';
import {ChannelHeaderContainer} from '../containers/ChannelHeaderContainer';
import {MessageEditorContainer} from '../containers/MessageEditorContainer';
import {Spinner} from './Spinner';

export interface IChatWindowStateProps {
  readonly channelLoading: boolean;
}

export class ChatWindow extends React.PureComponent<IChatWindowStateProps> {

  public render(): JSX.Element {
    let spinnerClass = '';
    let messageListClass = '';
    if (this.props.channelLoading) {
      spinnerClass = '';
      messageListClass = 'hide';
    }
    else {
      spinnerClass = 'hide';
      messageListClass = '';
    }
    return (
      <div>
        <div className={'ChatWindow ' + messageListClass}>
          <ChannelHeaderContainer/>
          <MessageListContainer />
          <MessageEditorContainer />
        </div>
        <div className={'spinner__wrapper ' + spinnerClass}>
          <Spinner/>
        </div>
      </div>
    );
    }

}
