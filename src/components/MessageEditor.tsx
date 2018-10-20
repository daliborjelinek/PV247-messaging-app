import * as React from 'react';
// Font awesome
import {library as faIconLibrary} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBold, faEraser, faFile, faFileImage, faFont, faItalic,
        faLink, faListOl, faListUl, faSmile, faUnderline} from '@fortawesome/free-solid-svg-icons';

// Add imported icons to library
faIconLibrary.add(faBold, faItalic, faUnderline, faFont, faEraser, faListOl,
                  faListUl, faLink, faFile, faFileImage, faSmile);


export class MessageEditor extends React.PureComponent {
  private readonly messageEditorDiv: React.RefObject<HTMLDivElement>;

  constructor(props: {}) {
    super(props);
    this.messageEditorDiv = React.createRef();
  }

  /**
   * When component is mounted it starts to listen on window resize.
   * After window resizing, component must be resized too.
   */
  componentDidMount() {
    window.addEventListener('resize', () => this.resize());
    this.resize();
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

  public render(): JSX.Element {
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
          <textarea className={'MessageEditor__textArea'}/>
          <button type={'submit'} className={'btn btn-primary'}>Send</button>
        </div>
      </div>
    );
  }
}
