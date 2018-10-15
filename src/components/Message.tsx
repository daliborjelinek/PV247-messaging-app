import * as React from 'react';
import * as  PropTypes from 'prop-types';
import {MessageRate} from './MessageRate';

export interface IMessage {
  id: number;
  text: string;
  date: string;
  author: IMessageAuthor;
  rating: number;
}

export interface IMessageAuthor {
  id: number;
  name: string;
  pictureUrl: string;
}

export class Message extends React.PureComponent<IMessage> {

  static propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pictureUrl: PropTypes.string,
    }),
    rating: PropTypes.number.isRequired,
  };

  public render(): JSX.Element {
    const isMyMessage = Math.random() > 0.5;

    return (
      <div className={'Message'}>
        <div className={'Message__img_wrapper'}>
          <div className={'Message__author_img'}
               style={{backgroundImage: `url('${this.props.author.pictureUrl}')`}} />
        </div>
        <div>
          <span className={'Message__author'}>{this.props.author.name}</span>
          <span className={'Message__date'}>{this.props.date}</span>
          <div className={'Message__text'}>{this.props.text}</div>
        </div>
        <MessageRate rating={this.props.rating} isMyMessage={isMyMessage}/>
      </div>
    );
  }
}
