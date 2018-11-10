import * as React from 'react';
import './ChannelItem.less';
import {IMessageAppChannel} from '../models/IMessageAppChannel';

export interface IChannelItemOwnProps {
  readonly id: Uuid;
}

export interface IChannelItemStateProps {
  readonly channelItem: IMessageAppChannel;
  readonly isSelected: boolean;
}

export interface IChannelItemDispatchProps {
  onChannelSelected(channelId: Uuid): void;
}

type IProps = IChannelItemOwnProps & IChannelItemStateProps & IChannelItemDispatchProps;

export class ChannelItem extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    const channelItemClassName = this.props.isSelected ? 'ChannelItem ChannelItem--selected' : 'ChannelItem';

    return (
      <div className={channelItemClassName}>
        <span className="ChannelItem__name">{this.props.channelItem.name}</span>
        <span className="ChannelItem__countOfNewMessages badge badge-pill">{this.props.channelItem.countOfNewMessages}</span>
      </div>
    );
  }
}
