import * as React from 'react';
import './ChannelItem.less';
import {IMessageAppChannel} from '../models/IMessageAppChannel';

export interface IChannelItemOwnProps {
  readonly id: Uuid;
}

export interface IChannelItemStateProps {
  readonly channelItem: IMessageAppChannel;
}

type IProps = IChannelItemOwnProps & IChannelItemStateProps;

export class ChannelItem extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    return (
      <div className="ChannelItem">
        <span className="ChannelItem__name">{this.props.channelItem.name}</span>
        <span className="ChannelItem__countOfNewMessages badge badge-pill">{this.props.channelItem.countOfNewMessages}</span>
      </div>
    );
  }
}
