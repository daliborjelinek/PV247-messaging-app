import * as React from 'react';
import * as  PropTypes from 'prop-types';
import {ChannelItem, IChannelItemProps} from './ChannelItem';
import './ChannelList.less';

export interface IChannelListProps {
  readonly channels: IChannelItemProps[];
}

export class ChannelList extends React.PureComponent<IChannelListProps> {

  static propTypes = {
    channels: PropTypes.arrayOf(PropTypes.shape({
      ...ChannelItem.propTypes
    })),
  };

  public render(): JSX.Element {
    return (
      <div className={'ChannelList'}>
        <h3 className={'ChannelList__title'}>Channels</h3>
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
