import * as React from 'react';
import '../styles/components/MessageEditor.less';
import {convertToRaw, DraftHandleValue, EditorState, RawDraftContentState, RichUtils, Modifier, AtomicBlockUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, {defaultSuggestionsFilter} from 'draft-js-mention-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import * as Immutable from 'immutable';
import '../styles/Draft.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {getMentions} from '../utils/messageEditorUtils';
// Font awesome
import {library as faIconLibrary} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBold, faEraser, faFile, faFileImage, faFont, faImage, faItalic, faLink, faListOl, faListUl, faSmile, faUnderline} from '@fortawesome/free-solid-svg-icons';
import {ChangeEvent} from 'react';
import * as fileService from '../service/fileService';


// Add imported icons to library
faIconLibrary.add(faBold, faItalic, faUnderline, faFont, faEraser, faListOl,
                  faListUl, faLink, faFile, faFileImage, faSmile, faImage);

export interface IMessageEditorDispatchProps {
  addMessage(rawContentState: RawDraftContentState): void;
}

export interface IMessageEditorStateProps {
  channelSelected: boolean;
  usersInChannel: Immutable.List<IMessageAppUser>;
}

type IProps = IMessageEditorDispatchProps & IMessageEditorStateProps;
type IState = {
  editorState: EditorState,
  suggestions: Mention[];
};

export let mentionPlugin: any;
export let imagePlugin: any;

/**
 * Class which represents message editor. Text area is focused after page is loaded.
 */
export class MessageEditor extends React.PureComponent<IProps, IState> {
  // draft.js plugins does not have support for TypeScript :(
  private possibleMentions: Mention[];
  private fileInputRef = React.createRef<HTMLInputElement>();

  /**
   * Saves messages into Redux store and database/local storage.
   */
  private onSave = () => {
    this.props.addMessage(convertToRaw(this.state.editorState.getCurrentContent()));
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

  private onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  };

  private onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  };

  private onRemoveInlineStyles = () => {
    const {editorState} = this.state;
    const styles = ['BOLD', 'ITALIC', 'UNDERLINE'];
    const contentState = editorState.getCurrentContent();
    const contentWithoutStyles = styles.reduce(
      (newContentState, style) =>
        Modifier.removeInlineStyle(
          newContentState,
          editorState.getSelection(),
          style
        ),
      contentState,
    );

    const newEditorState = EditorState.push(
      editorState,
      contentWithoutStyles,
      'change-inline-style'
    );

    this.setState(prevState => ({...prevState, editorState: newEditorState}));
  };

  // MENTION PLUGIN ACTIONS
  // @ts-ignore
  onSearchChange = (e: any) => {

    this.setState(prevState => ({
      ...prevState, suggestions: defaultSuggestionsFilter<Mention>(e.value, this.possibleMentions),
    }));
  };

  // CONSTRUCTOR
  constructor(props: IProps) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      suggestions: [],
    };
    this.possibleMentions = [];
    mentionPlugin = createMentionPlugin({
      mentionPrefix: '@',
    });
    imagePlugin = createImagePlugin();
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
    if (this.possibleMentions.length === 0 && this.props.usersInChannel.size > 0) {
      const suggestions = getMentions(this.props.usersInChannel);
      this.possibleMentions = suggestions;
      this.setState(prevState => ({...prevState, suggestions}));
    }
    // FOCUS ON EDITOR
  }

  /**
   * When ctrl + enter key is pressed, textarea is focused and messageText is not empty,
   * message will be submitted.
   * @param e
   */
  private onKeyDown(e: KeyboardEvent) {
    /*if (document.activeElement.className !== 'MessageEditor__textArea') {
      return;
    }*/
    if (!e.ctrlKey || e.key !== 'Enter') {
      return;
    }
    this.onSave();
    this.setState(prevState => ({...prevState, editorState: EditorState.createEmpty()}));
  }

  private onFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<any> => {
    const fileResponse = await fileService.storeFileToServer(e.target!.files![0]);
    const fileLinkResponse = await fileService.getStoredFileURL(fileResponse[0].id);
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', {src: fileLinkResponse.fileUri});
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity});
    this.setState((prevState) => ({
      ...prevState, editorState: AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    }));
  };

  public render(): JSX.Element | null {
    if (!this.props.channelSelected) {
      return null;
    }

    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin, imagePlugin];

    return (
      <div className={'MessageEditor'}>
        <div className={'MessageEditor__operationPane'}>
          <span onClick={this.onBoldClick}><FontAwesomeIcon icon={'bold'} size={'lg'} /></span>
          <span onClick={this.onItalicClick}><FontAwesomeIcon icon={'italic'} size={'lg'}/></span>
          <span onClick={this.onUnderlineClick}><FontAwesomeIcon icon={'underline'} size={'lg'}/></span>
          <span className={'glyphicon glyphicon-text-size'} />
          <span className={'glyphicon glyphicon-text-color'} />
          <span onClick={this.onRemoveInlineStyles}><FontAwesomeIcon icon={'eraser'} size={'lg'}/></span>
          <span onClick={() => this.fileInputRef.current!.click()}><FontAwesomeIcon icon={'image'} size={'lg'}/></span>
          <FontAwesomeIcon icon={'list-ol'} size={'lg'} />
          <FontAwesomeIcon icon={'list-ul'} size={'lg'}/>
          <FontAwesomeIcon icon={'link'} size={'lg'}/>
          <FontAwesomeIcon icon={'smile'} size={'lg'}/>
        </div>
        <div className={'MessageEditor__textAreaWrapper'}>
          <Editor editorState={this.state.editorState}
                  onChange={this.onChange}
                  placeholder={'Press Ctrl + Enter to send the message'}
                  plugins={plugins}
                  handleKeyCommand={this.handleKeyCommand}/>
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
          />
          <button type={'submit'} className={'btn btn-primary MessageEditor__sendButton'}
                  onClick={this.onSave}>Send</button>
        </div>
        <input type="file" accept="image/*" onChange={this.onFileChange} id="file" ref={this.fileInputRef} style={{display: 'none'}}/>
      </div>
    );
  }
}
