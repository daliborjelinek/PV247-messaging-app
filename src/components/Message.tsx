import * as React from 'react';
import '../styles/components/Message.less';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {MessageActions} from './MessageActions';
import {convertFromRaw, EditorState} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import {imagePlugin} from './MessageEditor';
import {colorStyleMap, decorators, positionSuggestions} from '../utils/messageEditorUtils';
import createMentionPlugin from 'draft-js-mention-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';


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

  private readonly mentionPlugin: any;
  private readonly emojiPlugin: any;

  // even though Editor is read only, on change handler must be set
  // otherwise, mentions would not work - https://github.com/draft-js-plugins/draft-js-plugins/issues/530
  private onChange = (editorState: EditorState) => {
    this.setState((prevState) => ({...prevState, editorState}));
  };

  constructor(props: IProps) {
    super(props);
    const rawData = this.props.message.value;
    this.mentionPlugin = createMentionPlugin({
      mentionPrefix: '@',
      positionSuggestions,
    });
    this.emojiPlugin = createEmojiPlugin();
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(rawData)),
    };
  }

  // noinspection JSMethodCanBeStatic
  private getDateTimeString(date: Date): string {
    const dateStr = date.toLocaleString();
    return dateStr.slice(0, 10) + ' ' + dateStr.slice(11, 19);
  }

  public render(): JSX.Element {
    const isMyMessage = this.props.isMyMessage;
    const messageRating = this.props.message.rating;
    const messageId = this.props.message.id;
    const pictureUrl = this.props.messageAuthor.picture;
    const dateTimeStr = this.getDateTimeString(this.props.message.createdAt);

    const plugins = [this.mentionPlugin, imagePlugin, this.emojiPlugin];

    return (
      <div className={'Message'}>
        <div className={'Message__img_wrapper'}>
          <div className={'Message__author_img'}
               style={{backgroundImage: `url(${pictureUrl}`}} />
        </div>
        <div className={'Message_content'}>
          <span className={'Message__author'}>{this.props.messageAuthor && this.props.messageAuthor.userName}</span>
          <span className={'Message__date'}>{dateTimeStr}</span>
          <Editor editorState={this.state.editorState}
                  readOnly
                  plugins={plugins}
                  decorators={decorators}
                  customStyleMap={colorStyleMap}
                  onChange={this.onChange}/>
        </div>
        <MessageActions rating={messageRating} isMyMessage={isMyMessage} messageId={messageId}/>
      </div>
    );
  }
}
