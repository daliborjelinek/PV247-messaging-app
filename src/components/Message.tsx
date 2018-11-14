import * as React from 'react';
import './Message.less';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {MessageActions} from './MessageActions';

export interface IMessageOwnProps {
  readonly id: Uuid;
}

export interface IMessageStateProps {
  readonly message: IMessageAppMessage;
  readonly messageAuthor: IMessageAppUser;
  readonly isMyMessage: boolean;
}

type IProps = IMessageOwnProps & IMessageStateProps;

export class Message extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    const isMyMessage = this.props.isMyMessage;
    const messageRating = this.props.message.rating;
    const messageId = this.props.message.id;

    return (
      <div className={'Message'}>
        <div className={'Message__img_wrapper'}>
          <div className={'Message__author_img'}
               style={{backgroundImage: `url('${this.props.messageAuthor.pictureUrl}')`}} />
        </div>
        <div className={'Message_content'}>
          <span className={'Message__author'}>{this.props.messageAuthor.name}</span>
          <span className={'Message__date'}>{this.props.message.date}</span>
          <div className={'Message__text'}>{this.props.message.text}</div>
        </div>
        <MessageActions rating={messageRating} isMyMessage={isMyMessage} messageId={messageId}/>
      </div>
    );
  }
}
