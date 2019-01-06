import * as React from 'react';
import {ChangeEvent, MouseEvent, SyntheticEvent} from 'react';
import '../styles/components/MessageEditor.less';
import {AtomicBlockUtils, ContentState, convertToRaw, DraftHandleValue, EditorState, Modifier, RawDraftContentState, RichUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin, {defaultSuggestionsFilter} from 'draft-js-mention-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import * as Immutable from 'immutable';
import '../styles/Draft.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {colorStyleMap, decorators, getMentions, positionSuggestions} from '../utils/messageEditorUtils';
// Font awesome
import {library as faIconLibrary} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBold, faEraser, faFile, faFileImage, faFont, faImage, faItalic, faLink, faListOl, faListUl, faSmile, faUnderline} from '@fortawesome/free-solid-svg-icons';
import {TextSizeDropDown} from './rich_text/TextSizeDropDown';
import {BasicColorPicker, ColorPickerColor} from './rich_text/BasicColorPicker';
import {CreateLink} from './rich_text/CreateLink';
import * as fileService from '../service/fileService';


// Add imported icons to library
faIconLibrary.add(faBold, faItalic, faUnderline, faFont, faEraser, faListOl,
                  faListUl, faLink, faFile, faFileImage, faSmile, faImage);

export interface IMessageEditorDispatchProps {
  addMessage(rawContentState: RawDraftContentState): void;
}

export interface IMessageEditorStateProps {
  currentChannelId: Uuid | null;
  usersInChannel: Immutable.List<IMessageAppUser>;
}

type IProps = IMessageEditorDispatchProps & IMessageEditorStateProps;
type IState = {
  editorState: EditorState,
  suggestions: Mention[];
  focusedBlockType: string;
  currentColor: ColorPickerColor;
};

export let imagePlugin: any;

/**
 * Class which represents message editor. Text area is focused after page is loaded.
 */
export class MessageEditor extends React.PureComponent<IProps, IState> {
  // draft.js plugins does not have support for TypeScript :(
  private possibleMentions: Mention[];
  private fileInputRef = React.createRef<HTMLInputElement>();

  private editor: Editor | null;
  private readonly mentionPlugin: any;
  private readonly emojiPlugin: any;

  /**********************************************************
   * EVENTS
   *********************************************************/
  /**
   * Saves messages into Redux store and database/local storage.
   */
  private onSave = () => {
    this.props.addMessage(convertToRaw(this.state.editorState.getCurrentContent()));
    const emptyState = EditorState.push(this.state.editorState, ContentState.createFromText(''),
      'remove-range');
    this.setState(prevState => ({ ...prevState,
      editorState: emptyState,
      focusedBlockType: '' }), () => setTimeout(this.focus(), 0));
  };

  /**
   * Function should be called every time when content of the message editor is changed.
   * @param editorState
   */
  private onChange = (editorState: EditorState) => {
    this.setState((prevState) => ({...prevState, editorState}));
    this.updateActionToolbar(editorState);
  };

  /**
   * Set focus to editor.
   */
  private focus = () => {
    if (this.editor) {
      this.editor.focus();
    }
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

  private preventDefault = (e: SyntheticEvent<any>) => {
    e.preventDefault();
  };


  // EDITOR ACTIONS - INLINE STYLES
  private onBoldClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };

  private onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  };

  private onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  };

  // https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/color/color.html
  private onChangeTextColor = (toggledColor: ColorPickerColor) => {
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color);
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state!, color!);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }
    this.onChange(nextEditorState);
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

  // LINK
  private onSubmitLink = (link: string) => {
    if (link === '') {
      return this.removeLink();
    }
    const {editorState} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: link}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.onChange(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    setTimeout(this.focus, 0);
  };

  private removeLink() {
    const {editorState} = this.state;
    this.onChange(RichUtils.toggleLink(editorState, editorState.getSelection(), null));
  }

  // EDITOR ACTIONS - BLOCK TYPES
  private toggleFontSize = (fontSize: string) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, fontSize));
  };

  private toggleUl = () => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
  };

  private toggleOl = () => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'));
  };

  // MENTION PLUGIN ACTIONS
  // @ts-ignore
  onSearchChange = (e: any) => {
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
      currentColor: 'BLACK',
    };
    this.possibleMentions = [];
    this.mentionPlugin = createMentionPlugin({
      mentionPrefix: '@',
      positionSuggestions,
    });
    this.emojiPlugin = createEmojiPlugin();
    imagePlugin = createImagePlugin();
  }

  /**
   * When component is mounted, text area should be focused. Component starts to listen to
   *   key-down events. When Ctrl + Enter is clicked, content of text area is send to server (if not empty).
   */
  componentDidMount() {
    document.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e));
    if (this.props.currentChannelId == null) {
      return;
    }
    // FOCUS ON EDITOR
    this.focus();
  }

  /**
   * Focus textarea if any channel is selected = message editor is visible.
   */
  componentDidUpdate(prevProps: Readonly<IProps>): void {
    if (this.props.currentChannelId != null && prevProps.currentChannelId !== this.props.currentChannelId) {
      const suggestions = getMentions(this.props.usersInChannel);
      this.possibleMentions = suggestions;
      this.setState(prevState => ({...prevState, suggestions}));
    }
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

    // select current color
    const colors = Object.keys(colorStyleMap);
    const currentStyle = editorState.getCurrentInlineStyle();
    const currentColor = currentStyle.filter(value => value != null && colors.indexOf(value) !== -1).first();
    const selectedColor = currentColor || 'BLACK';
    this.setState(prevState => ({...prevState, currentColor: selectedColor as ColorPickerColor}));
  }

  /**********************************************************
   * RENDERING
   *********************************************************/
  public render(): JSX.Element | null {
    if (!this.props.currentChannelId == null) {
      return null;
    }

    const { MentionSuggestions } = this.mentionPlugin;
    const { EmojiSelect } = this.emojiPlugin;
    const plugins = [this.mentionPlugin, imagePlugin, this.emojiPlugin];

    return (
      <div className={'MessageEditor'}>

        {/* Operation panel */}
        <div className={'MessageEditor__operationPane'}>
          <EmojiSelect />
          <span onMouseDown={this.preventDefault} onClick={this.onBoldClick}>
            <FontAwesomeIcon icon={'bold'} size={'lg'} />
          </span>
          <span onMouseDown={this.preventDefault} onClick={this.onItalicClick}>
            <FontAwesomeIcon icon={'italic'} size={'lg'}/>
          </span>
          <span onMouseDown={this.preventDefault} onClick={this.onUnderlineClick}>
            <FontAwesomeIcon icon={'underline'} size={'lg'}/>
          </span>
          <TextSizeDropDown onChange={this.toggleFontSize} focusedBlockType={this.state.focusedBlockType}/>
          <BasicColorPicker onColorChange={this.onChangeTextColor} currentColor={this.state.currentColor}/>
          <span onClick={this.onRemoveInlineStyles}>
            <FontAwesomeIcon icon={'eraser'} size={'lg'}/>
          </span>
          <span onClick={() => this.fileInputRef.current!.click()}><FontAwesomeIcon icon={'image'} size={'lg'}/></span>
          <span onClick={this.toggleOl}>
            <FontAwesomeIcon icon={'list-ol'} size={'lg'} />
          </span>
          <span onClick={this.toggleUl}>
            <FontAwesomeIcon icon={'list-ul'} size={'lg'}/>
          </span>
          <CreateLink editorState={this.state.editorState} onSubmitUrl={this.onSubmitLink}/>
        </div>

        {/* Editor */}
        <div className={'MessageEditor__textAreaWrapper'} onClick={this.focus}>
          <Editor editorState={this.state.editorState}
                  onChange={this.onChange}
                  placeholder={'Press Ctrl + Enter to send the message'}
                  plugins={plugins}
                  handleKeyCommand={this.handleKeyCommand}
                  customStyleMap={colorStyleMap}
                  decorators={decorators}
                  ref={(ref) => this.editor = ref}/>
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
          />
          <button type={'submit'}
                  className={'btn btn-primary MessageEditor__sendButton'}
                  onClick={this.onSave}
                  onMouseDown={this.preventDefault}>
            Send
          </button>
        </div>
        <input type="file" accept="image/*" onChange={this.onFileChange} id="file" ref={this.fileInputRef} style={{display: 'none'}}/>
      </div>
    );
  }
}
