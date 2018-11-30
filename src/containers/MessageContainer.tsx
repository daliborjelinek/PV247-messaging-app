import {IMessageAppState} from '../models/IMessageAppState';
import {IMessageOwnProps, IMessageStateProps, Message} from '../components/Message';
import {connect} from 'react-redux';

const mapStateToProps = (state: IMessageAppState, ownProps: IMessageOwnProps): IMessageStateProps => {
  const message = state.messages.byId.get(ownProps.id)!;
  const messageAuthor = state.users.byEmail.get(message.createdBy)!;
  const isMyMessage = state.loggedUser!.email === message.createdBy;
  return { message, messageAuthor, isMyMessage };
};

export const MessageContainer = connect<IMessageStateProps, void>(mapStateToProps)(Message);
