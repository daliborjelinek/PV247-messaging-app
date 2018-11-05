import * as React from 'react';
import * as  PropTypes from 'prop-types';
import {MessageRate} from './MessageRate';

export interface IMessageProps {
  readonly message: IMessage;
}

export interface IMessage {
  readonly id: number;
  readonly text: string;
  readonly date: string;
  readonly author: IMessageAuthor;
  readonly rating: number;
}

export interface IMessageAuthor {
  readonly id: number;
  readonly name: string;
  readonly pictureUrl: string;
}

export class Message extends React.PureComponent<IMessageProps> {

  static propTypes = {
    message: PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        pictureUrl: PropTypes.string,
      }),
      rating: PropTypes.number.isRequired,
    })
  };

  public render(): JSX.Element {
    const isMyMessage = Math.random() > 0.5;

    return (
      <div className={'Message'}>
        <div className={'Message__img_wrapper'}>
          <div className={'Message__author_img'}
               style={{backgroundImage: `url('${this.props.message.author.pictureUrl}')`}} />
        </div>
        <div>
          <span className={'Message__author'}>{this.props.message.author.name}</span>
          <span className={'Message__date'}>{this.props.message.date}</span>
          <div className={'Message__text'}>{this.props.message.text}</div>
        </div>
        <MessageRate rating={this.props.message.rating} isMyMessage={isMyMessage}/>
      </div>
    );
  }
}
