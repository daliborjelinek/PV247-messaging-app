import * as React from 'react';
import * as Immutable from 'immutable';
import {MessageContainer} from '../containers/MessageContainer';
import '../styles/components/MessageList.less';

export interface IMessageListStateProps {
  readonly messageIds: Immutable.List<Uuid>;
  // time in seconds from last message update cycle to next one
  readonly updateMessagesTimeout: number;
  readonly channelId: Uuid | null;
}

export interface IMessageListDispatchProps {
  updateMessages(channelId: Uuid): void;
}

type IProps = IMessageListStateProps & IMessageListDispatchProps;

/**
 * Message list components displays messages and takes care about automatic message update.
 */
export class MessageList extends React.PureComponent<IProps> {

  private nextUpdateTimer: number | null = null;

  componentDidMount(): void {
    this.startUpdatingMessages();
  }

  // it is possible, that channel was changed - in that case start updating
  componentDidUpdate(prevProps: Readonly<IProps>): void {
    if (prevProps.channelId !== this.props.channelId) {
      this.startUpdatingMessages();
    }
  }

  /**
   * Checks if updating messages should be started. If it should, it calls method
   *   which takes care of automatic updating
   */
  private startUpdatingMessages(): void {
    const updatingNotStartedYet = this.nextUpdateTimer == null;
    if (updatingNotStartedYet && this.isChannelSelected()) {
      this.updateMessagesAndScheduleNextUpdate();
    }
  }

  /**
   * Updates messages and schedule next update if actualizing messages should be continued.
   */
  private updateMessagesAndScheduleNextUpdate(): void {
    // updating is stopped or no channel is selected
    if (!this.isChannelSelected()) {
      this.clearTimeout();
      return;
    }

    // channel must be set because we got here
    this.props.updateMessages(this.props.channelId!);


    // @ts-ignore
    this.nextUpdateTimer = setTimeout(() => {
      this.updateMessagesAndScheduleNextUpdate();
    }, this.props.updateMessagesTimeout * 1000);
  }

  // HELPER METHODS
  private isChannelSelected(): boolean {
    return this.props.channelId != null;
  }

  private clearTimeout(): void {
    if (this.nextUpdateTimer != null) {
      clearTimeout(this.nextUpdateTimer);
    }
  }

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
