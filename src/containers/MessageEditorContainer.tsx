import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {IMessageEditorDispatchProps, IMessageEditorStateProps, MessageEditor} from '../components/MessageEditor';
import {addMessage} from '../actions/messageActions';
import {IMessageAppState} from '../models/IMessageAppState';
import {getUsersForMention} from '../selectors/messageAppSelectors';
import {RawDraftContentState} from 'draft-js';


export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addMessage: (rawContentState: RawDraftContentState) => dispatch(addMessage(rawContentState)),
  };
};

export const mapStateToProps = (state: IMessageAppState): IMessageEditorStateProps => {
  return {
    channelSelected: state.currentChannelId != null,
    usersInChannel: getUsersForMention(state),
  };
};

export const MessageEditorContainer = connect<IMessageEditorStateProps, IMessageEditorDispatchProps>(mapStateToProps,
  mapDispatchToProps)(MessageEditor);
