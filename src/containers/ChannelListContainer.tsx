import {IMessageAppState} from '../models/IMessageAppState';
import {ChannelList, IChannelListStateProps} from '../components/ChannelList';
import {connect} from 'react-redux';

const mapStateToProps = (state: IMessageAppState): IChannelListStateProps => {
  return {
    channelIds: state.channels.allIds,
  };
};

export const ChannelListContainer = connect<IChannelListStateProps, void>(mapStateToProps)(ChannelList);
