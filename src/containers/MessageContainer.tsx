import {IMessageAppState} from '../models/IMessageAppState';
import {IMessageOwnProps, IMessageStateProps, Message} from '../components/Message';
import {connect} from 'react-redux';

const mapStateToProps = (state: IMessageAppState, ownProps: IMessageOwnProps): IMessageStateProps => {
  const message = state.messages.byId.get(ownProps.id)!;
  const messageAuthor = state.users.byId.get(message.authorId)!;
  return { message, messageAuthor };
};

export const MessageContainer = connect<IMessageStateProps, void>(mapStateToProps)(Message);
