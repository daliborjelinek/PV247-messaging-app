import * as React from 'react';
import '../styles/components/Message.less';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {MessageActions} from './MessageActions';
import {convertFromRaw, EditorState} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import {mentionPlugin} from './MessageEditor';
import {imagePlugin} from './MessageEditor';
import 'draft-js-mention-plugin/lib/plugin.css';

export interface IMessageOwnProps {
  readonly id: Uuid;
}

export interface IMessageStateProps {
  readonly message: IMessageAppMessage;
  readonly messageAuthor: IMessageAppUser;
  readonly isMyMessage: boolean;
}

type IProps = IMessageOwnProps & IMessageStateProps;
type IState = {editorState: EditorState};

export class Message extends React.PureComponent<IProps, IState> {

  // even though Editor is read only, on change handler must be set
  // otherwise, mentions would not work - https://github.com/draft-js-plugins/draft-js-plugins/issues/530
  private onChange = (editorState: EditorState) => {
    this.setState((prevState) => ({...prevState, editorState}));
  };

  constructor(props: IProps) {
    super(props);
    const rawData = this.props.message.value;
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(rawData)),
    };
  }

  public render(): JSX.Element {
    const isMyMessage = this.props.isMyMessage;
    const messageRating = this.props.message.rating;
    const messageId = this.props.message.id;
    const pictureUrl = this.props.messageAuthor.picture;

    const plugins = [mentionPlugin, imagePlugin];

    return (
      <div className={'Message'}>
        <div className={'Message__img_wrapper'}>
          <div className={'Message__author_img'}
               style={{backgroundImage: `url(${pictureUrl}`}} />
        </div>
        <div className={'Message_content'}>
          <span className={'Message__author'}>{this.props.messageAuthor && this.props.messageAuthor.userName}</span>
          <span className={'Message__date'}>{this.props.message.createdAt.toLocaleString()}</span>
          <Editor editorState={this.state.editorState} readOnly plugins={plugins}
                  onChange={this.onChange}/>
        </div>
        <MessageActions rating={messageRating} isMyMessage={isMyMessage} messageId={messageId}/>
      </div>
    );
  }
}
