import {IMessageAppState} from '../models/IMessageAppState';
import {ChannelList, IChannelListDispatchProps, IChannelListStateProps} from '../components/ChannelList';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {addChannel, reorderChannels} from '../actions/channelActions';
import * as Immutable from 'immutable';
import {getChannelIdsForLoggedUser} from '../selectors/messageAppSelectors';

const mapStateToProps = (state: IMessageAppState): IChannelListStateProps => {
  return {
    channelIds: getChannelIdsForLoggedUser(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addChannel: (name: string) => dispatch(addChannel(name)),
    reorderChannels: (reorderedChannelIds: Immutable.List<Uuid>) => dispatch(reorderChannels(reorderedChannelIds)),
  };
};

export const ChannelListContainer = connect<IChannelListStateProps, IChannelListDispatchProps>(mapStateToProps, mapDispatchToProps)(ChannelList);
