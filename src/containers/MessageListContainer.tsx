import {IMessageAppState} from '../models/IMessageAppState';
import {IMessageListStateProps, MessageList} from '../components/MessageList';
import {connect} from 'react-redux';

const mapStateToProps = (state: IMessageAppState): IMessageListStateProps => {
  return {
    messageIds: state.messages.allIds,
  };
};

export const MessageListContainer = connect<IMessageListStateProps, void>(mapStateToProps)(MessageList);
