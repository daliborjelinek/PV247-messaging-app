import * as React from 'react';
import * as  PropTypes from 'prop-types';
import './ChannelItem.less';

export interface IChannelItemProps {
  readonly name: string;
  readonly countOfNewMessages: number;
}

export class ChannelItem extends React.PureComponent<IChannelItemProps> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    countOfNewMessages: PropTypes.number.isRequired,
  };

  public render(): JSX.Element {
    return (
      <div className="ChannelItem">
        <span className="ChannelItem__name">{this.props.name}</span>
        <span className="ChannelItem__countOfNewMessages badge badge-pill">{this.props.countOfNewMessages}</span>
      </div>
    );
  }
}
