import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {IMessageEditorDispatchProps, IMessageEditorStateProps, MessageEditor} from '../components/MessageEditor';
import {addMessage} from '../actions/messageActions';
import {IMessageAppState} from '../models/IMessageAppState';


export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addMessage: (text: string) => dispatch(addMessage(text)),
  };
};

export const mapStateToProps = (state: IMessageAppState): IMessageEditorStateProps => {
  return {
    channelSelected: state.currentChannelId != null,
  };
};

export const MessageEditorContainer = connect<IMessageEditorStateProps, IMessageEditorDispatchProps>(mapStateToProps, mapDispatchToProps)(MessageEditor);
