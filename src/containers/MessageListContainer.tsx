import {IMessageAppState} from '../models/IMessageAppState';
import {IMessageListDispatchProps, IMessageListStateProps, MessageList} from '../components/MessageList';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {updateMessagesInChannel} from '../actions/messageActions';

const mapStateToProps = (state: IMessageAppState): IMessageListStateProps => {
  return {
    messageIds: state.messages.allIds,
    channelId: state.currentChannelId,
    updateMessagesTimeout: state.updateMessagesTimeout,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IMessageListDispatchProps => {
  return {
    updateMessages: (channelId: Uuid): void => dispatch(updateMessagesInChannel(channelId)),
  };
};

export const MessageListContainer = connect<IMessageListStateProps, IMessageListDispatchProps>(mapStateToProps,
  mapDispatchToProps)(MessageList);
