import * as React from 'react';
import * as  PropTypes from 'prop-types';
import {ChannelItem, IChannelItem} from './ChannelItem';

export interface IChannelList {
  channels: IChannelItem[];
}

export class ChannelList extends React.PureComponent<IChannelList> {

  static propTypes = {
    channels: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      countOfNewMessages: PropTypes.number.isRequired,
    })),
  };

  public render(): JSX.Element {
    return (
      <div className={'sidebar ChannelList'}>
        <h3>Channels</h3>
        {this.props.channels && this.props.channels.map((channel, index) => {
          return (<ChannelItem name={channel.name}
                               countOfNewMessages={channel.countOfNewMessages}
                               key={index}/>);
        })}
        <button type="button" className="btn btn-secondary btn-sm btn-block">New channel</button>
      </div>
    );
  }
}
