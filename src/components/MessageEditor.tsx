import * as React from 'react';
import '../styles/components/MessageEditor.less';
import {convertToRaw, DraftHandleValue, EditorState, Modifier, RawDraftContentState, RichUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, {defaultSuggestionsFilter} from 'draft-js-mention-plugin';
import * as Immutable from 'immutable';
import '../styles/Draft.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {getMentions} from '../utils/messageEditorUtils';
// Font awesome
import {library as faIconLibrary} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBold, faEraser, faFile, faFileImage, faFont, faItalic, faLink, faListOl, faListUl, faSmile, faUnderline} from '@fortawesome/free-solid-svg-icons';
import {TextSizeDropDown} from './rich_text/TextSizeDropDown';

// Add imported icons to library
faIconLibrary.add(faBold, faItalic, faUnderline, faFont, faEraser, faListOl,
                  faListUl, faLink, faFile, faFileImage, faSmile);

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
  focusedBlockType: string;
};

export let mentionPlugin: any;

/**
 * Class which represents message editor. Text area is focused after page is loaded.
 */
export class MessageEditor extends React.PureComponent<IProps, IState> {
  // draft.js plugins does not have support for TypeScript :(
  private possibleMentions: Mention[];

  /**********************************************************
   * EVENTS
   *********************************************************/
  /**
   * Saves messages into Redux store and database/local storage.
   */
  private onSave = () => {
    this.props.addMessage(convertToRaw(this.state.editorState.getCurrentContent()));
  };

  private onChange = (editorState: EditorState) => {
    this.setState((prevState) => ({...prevState, editorState}));
    this.updateActionToolbar(editorState);
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

  // EDITOR ACTIONS - INLINE STYLES
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

  // EDITOR ACTIONS - BLOCK TYPES
  private toggleFontSize = (fontSize: string) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, fontSize));
  };

  // MENTION PLUGIN ACTIONS
  // @ts-ignore
  onSearchChange = (e: any) => {
    console.log(e);
    this.setState(prevState => ({
      ...prevState, suggestions: defaultSuggestionsFilter<Mention>(e.value, this.possibleMentions),
    }));
  };

  /**********************************************************
   * LIFE CYCLE METHODS
   *********************************************************/
  constructor(props: IProps) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      suggestions: [],
      focusedBlockType: '',
    };
    this.possibleMentions = [];
    mentionPlugin = createMentionPlugin({
      mentionPrefix: '@',
    });
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

  /**********************************************************
   * PRIVATE METHODS
   *********************************************************/
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

  /**
   * Some items must be updated, when cursor position is changed.
   */
  private updateActionToolbar(editorState: EditorState) {
    // select correct block type based on focused block
    const currentContent = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const focusedBlockKey = selectionState.getFocusKey();
    const currentBlock = currentContent.getBlockForKey(focusedBlockKey);
    this.setState(prevState => ({...prevState, focusedBlockType: currentBlock.getType()}));
  }

  /**********************************************************
   * RENDERING
   *********************************************************/
  public render(): JSX.Element | null {
    if (!this.props.channelSelected) {
      return null;
    }

    const { MentionSuggestions } = mentionPlugin;
    const plugins = [mentionPlugin];

    return (
      <div className={'MessageEditor'}>
        <div className={'MessageEditor__operationPane'}>
          <span onClick={this.onBoldClick}><FontAwesomeIcon icon={'bold'} size={'lg'} /></span>
          <span onClick={this.onItalicClick}><FontAwesomeIcon icon={'italic'} size={'lg'}/></span>
          <span onClick={this.onUnderlineClick}><FontAwesomeIcon icon={'underline'} size={'lg'}/></span>
          <TextSizeDropDown onChange={this.toggleFontSize} focusedBlockType={this.state.focusedBlockType}/>
          <span className={'glyphicon glyphicon-text-color'} />
          <span onClick={this.onRemoveInlineStyles}><FontAwesomeIcon icon={'eraser'} size={'lg'}/></span>
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
      </div>
    );
  }
}
