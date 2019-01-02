import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {IMessageEditorDispatchProps, IMessageEditorStateProps} from '../components/MessageEditor';
import {addMessage} from '../actions/messageActions';
import {IMessageAppState} from '../models/IMessageAppState';
import {MessageRichTextEditor} from '../components/MessageRichTextEditor';


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

export const MessageEditorContainer = connect<IMessageEditorStateProps, IMessageEditorDispatchProps>(mapStateToProps,
  mapDispatchToProps)(MessageRichTextEditor);
