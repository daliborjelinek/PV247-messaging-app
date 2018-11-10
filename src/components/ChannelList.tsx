import * as React from 'react';
import * as Immutable from 'immutable';
import './ChannelList.less';
import {ChannelItemContainer} from '../containers/ChannelItemContainer';

export interface IChannelListStateProps {
  readonly channelIds: Immutable.List<Uuid>;
}

type IProps = IChannelListStateProps;

export class ChannelList extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    return (
      <div className={'ChannelList'}>
        <h3 className={'ChannelList__title'}>Channels</h3>
        {this.props.channelIds && this.props.channelIds.map((channelId) => {
          return (<ChannelItemContainer id={channelId}
                                        key={channelId}/>);
        })}
        <button type="button" className="btn btn-secondary btn-sm btn-block">New channel</button>
      </div>
    );
  }
}
