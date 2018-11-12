import * as React from 'react';
// Font awesome
import {library as faIconLibrary} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBold, faEraser, faFile, faFileImage, faFont, faItalic,
        faLink, faListOl, faListUl, faSmile, faUnderline} from '@fortawesome/free-solid-svg-icons';

// Add imported icons to library
faIconLibrary.add(faBold, faItalic, faUnderline, faFont, faEraser, faListOl,
                  faListUl, faLink, faFile, faFileImage, faSmile);

import './MessageEditor.less';
import {ChangeEvent} from 'react';

export interface IMessageEditorDispatchProps {
  addMessage(messageText: string): void;
}

export interface IMessageEditorStateProps {
  channelSelected: boolean;
}

type IProps = IMessageEditorDispatchProps & IMessageEditorStateProps;
type IState = { messageText: string };


/**
 * Class which represents message editor. Text area is focused after page is loaded.
 */
export class MessageEditor extends React.PureComponent<IProps, IState> {

  // used to set width when component is mounted
  private readonly messageEditorDiv: React.RefObject<HTMLDivElement>;

  // used to set focus when component is mounted
  private readonly  messageEditorTextArea: React.RefObject<HTMLTextAreaElement>;

  /**
   * Stores text into the state when text is changed.
   * @param e change event
   */
  private onTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const text = e.target.value;
    this.setState(() => {
      return { messageText: text };
    });
  };

  /**
   * Saves messages into Redux store and database/local storage.
   */
  private onSave = () => {
    if (this.state.messageText === '') {
      return;
    }
    this.props.addMessage(this.state.messageText);
    this.messageEditorTextArea.current!.value = '';
  };

  constructor(props: IProps) {
    super(props);
    this.messageEditorDiv = React.createRef();
    this.messageEditorTextArea = React.createRef();
    this.state = {
      messageText: '',
    };
  }

  /**
   * When component is mounted it starts to listen on window resize.
   * After window resizing, component must be resized too.
   */
  componentDidMount() {
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e));
    if (!this.props.channelSelected) {
      return;
    }
    this.messageEditorTextArea!.current!.focus();
    this.resize();
  }

  /**
   * Focus textarea and resize MessageEditor if any channel is selected = message editor is visible.
   */
  componentDidUpdate() {
    if (!this.props.channelSelected) {
      return;
    }
    this.messageEditorTextArea!.current!.focus();
    this.resize();
  }

  /**
   * When enter key is pressed, textarea is focused and messageText is not empty,
   * message will be submitted.
   * @param e
   */
  private onKeyDown(e: KeyboardEvent) {
    if (document.activeElement.className !== 'MessageEditor__textArea') {
      return;
    }
    if (!e.ctrlKey || e.key !== 'Enter') {
      return;
    }
    this.onSave();
    this.messageEditorTextArea.current!.value = '';
  }

  /**
   * Resize width of MessageEditor. Width cannot be set automatically,
   * because MessageEditor has fixed position.
   * Final width is computed as window width - message list width.
   */
  private resize() {
    const windowWidth = window.innerWidth;
    const channelList = document.getElementsByClassName('ChannelList')[0] as HTMLDivElement;
    if (channelList == null) {
      return;
    }
    const channelListWidth = channelList.offsetWidth;
    this.messageEditorDiv!.current!.style.width = windowWidth - channelListWidth + 'px';
  }

  public render(): JSX.Element | null {
    if (!this.props.channelSelected) {
      return null;
    }

    return (
      <div className={'MessageEditor'} ref={this.messageEditorDiv}>
        <div className={'MessageEditor__operationPane'}>
          <FontAwesomeIcon icon={'bold'} size={'lg'}/>
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
          <textarea className={'MessageEditor__textArea'}
                    ref={this.messageEditorTextArea}
                    onChange={this.onTextChange}/>
          <button type={'submit'} className={'btn btn-primary'}
                  onClick={this.onSave}>Send</button>
        </div>
      </div>
    );
  }
}
