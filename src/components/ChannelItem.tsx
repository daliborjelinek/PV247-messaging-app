import * as React from 'react';
import * as  PropTypes from 'prop-types';

export interface IChannelItem {
  name: string;
  countOfNewMessages: number;
}

export class ChannelItem extends React.PureComponent<IChannelItem> {
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
