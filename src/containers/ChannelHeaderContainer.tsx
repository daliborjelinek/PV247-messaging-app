import {IMessageAppState} from '../models/IMessageAppState';
import {ChannelHeader, IChannelHeaderDispatchProps, IChannelHeaderStateProps} from '../components/ChannelHeader';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {deleteChannel, renameChannel} from '../actions/channelActions';


const mapStateToProps = (state: IMessageAppState): IChannelHeaderStateProps => {
  if (state.currentChannelId == null) {
    return { channel: null };
  }
  return {
    channel: state.channels.byId.get(state.currentChannelId)!,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeChannelName: (id: Uuid, newName: string) => dispatch(renameChannel(id, newName)),
    removeChannel: (id: Uuid) => dispatch(deleteChannel(id)),
  };
};

// TODO mapDispatchToProps for renaming and deleting channel

export const ChannelHeaderContainer = connect<IChannelHeaderStateProps, IChannelHeaderDispatchProps>(mapStateToProps, mapDispatchToProps)(ChannelHeader);
