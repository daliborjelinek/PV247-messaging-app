import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {IMessageRateDispatchProps, MessageRate} from '../components/MessageRate';
import {deleteMessage} from '../actions/messageActions';


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    deleteMessage: (messageId: Uuid) => dispatch(deleteMessage(messageId)),
  };
};

export const MessageRateContainer = connect<void, IMessageRateDispatchProps>(null, mapDispatchToProps)(MessageRate);
