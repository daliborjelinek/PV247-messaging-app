import {IMessageAppState} from '../models/IMessageAppState';
import {ChannelList, IChannelListDispatchProps, IChannelListStateProps} from '../components/ChannelList';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {addChannel} from '../actions/channelActions';

const mapStateToProps = (state: IMessageAppState): IChannelListStateProps => {
  return {
    channelIds: state.channels.allIds,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addChannel: (name: string) => dispatch(addChannel(name)),
  };
};

export const ChannelListContainer = connect<IChannelListStateProps, IChannelListDispatchProps>(mapStateToProps, mapDispatchToProps)(ChannelList);
