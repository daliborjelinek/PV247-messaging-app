import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {deleteMessage} from '../actions/messageActions';
import {IMessageActionsEditingDispatchProps, MessageActionsEditing} from '../components/MessageActionsEditing';


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    deleteMessage: (messageId: Uuid) => dispatch(deleteMessage(messageId)),
  };
};

export const MessageActionsEditingContainer = connect<void, IMessageActionsEditingDispatchProps>(
  null, mapDispatchToProps)(MessageActionsEditing);
