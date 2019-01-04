import * as React from 'react';
import '../styles/components/MessageEditor.less';
import {Editor, EditorState, RichUtils, DraftHandleValue} from 'draft-js';
// Font awesome
import {library as faIconLibrary} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBold, faEraser, faFile, faFileImage, faFont, faItalic, faLink, faListOl, faListUl, faSmile, faUnderline} from '@fortawesome/free-solid-svg-icons';
import '../styles/Draft.css';

// Add imported icons to library
faIconLibrary.add(faBold, faItalic, faUnderline, faFont, faEraser, faListOl,
                  faListUl, faLink, faFile, faFileImage, faSmile);

export interface IMessageEditorDispatchProps {
  addMessage(messageText: string): void;
}

export interface IMessageEditorStateProps {
  channelSelected: boolean;
}

type IProps = IMessageEditorDispatchProps & IMessageEditorStateProps;
type IState = { editorState: EditorState};


/**
 * Class which represents message editor. Text area is focused after page is loaded.
 */
export class MessageEditor extends React.PureComponent<IProps, IState> {

  /**
   * Saves messages into Redux store and database/local storage.
   */
  private onSave = () => {
    console.log('Text save');
  };

  private onChange = (editorState: EditorState) => {
    this.setState((prevState) => ({...prevState, editorState}));
  };

  /**
   * Default Draft.js command handling. Allows using shortcuts(Ctrl + B, Ctrl + I,...).
   * @param command
   * @param editorState
   */
  private handleKeyCommand = (command: string, editorState: EditorState): DraftHandleValue => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      this.onChange(newEditorState);
      return 'handled';
    }
    return 'not-handled';
  };

  // EDITOR ACTIONS
  private onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };

  // CONSTRUCTOR
  constructor(props: IProps) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  /**
   * When component is mounted, text area should be focused. Component starts to listen to
   *   key-down events. When Ctrl + Enter is clicked, content of text area is send to server (if not empty).
   */
  componentDidMount() {
    document.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e));
    if (!this.props.channelSelected) {
      return;
    }
    // FOCUS ON EDITOR
  }

  /**
   * Focus textarea and resize MessageEditor if any channel is selected = message editor is visible.
   */
  componentDidUpdate() {
    if (!this.props.channelSelected) {
      return;
    }
    // FOCUS ON EDITOR
  }

  /**
   * When ctrl + enter key is pressed, textarea is focused and messageText is not empty,
   * message will be submitted.
   * @param e
   */
  private onKeyDown(e: KeyboardEvent) {
    console.log(e);
    /*if (document.activeElement.className !== 'MessageEditor__textArea') {
      return;
    }
    if (!e.ctrlKey || e.key !== 'Enter') {
      return;
    }
    this.onSave();
    this.messageEditorTextArea.current!.value = '';*/
  }

  public render(): JSX.Element | null {
    if (!this.props.channelSelected) {
      return null;
    }

    return (
      <div className={'MessageEditor'}>
        <div className={'MessageEditor__operationPane'}>
          <span onClick={this.onBoldClick}><FontAwesomeIcon icon={'bold'} size={'lg'} /></span>
          <FontAwesomeIcon icon={'italic'} size={'lg'}/>
          <FontAwesomeIcon icon={'underline'} size={'lg'}/>
          <span className={'glyphicon glyphicon-text-size'} />
          <span className={'glyphicon glyphicon-text-color'} />
          <FontAwesomeIcon icon={'eraser'} size={'lg'}/>
          <FontAwesomeIcon icon={'list-ol'} size={'lg'} />
          <FontAwesomeIcon icon={'list-ul'} size={'lg'}/>
          <FontAwesomeIcon icon={'link'} size={'lg'}/>
          <FontAwesomeIcon icon={'file-image'} size={'lg'}/>
          <FontAwesomeIcon icon={'file'} size={'lg'}/>
          <FontAwesomeIcon icon={'smile'} size={'lg'}/>
        </div>
        <div className={'MessageEditor__textAreaWrapper'}>
          <Editor editorState={this.state.editorState}
                  onChange={this.onChange}
                  placeholder={'Press Ctrl + Enter to send the message'}
                  handleKeyCommand={this.handleKeyCommand}/>
          <button type={'submit'} className={'btn btn-primary MessageEditor__sendButton'}
                  onClick={this.onSave}>Send</button>
        </div>
      </div>
    );
  }
}
