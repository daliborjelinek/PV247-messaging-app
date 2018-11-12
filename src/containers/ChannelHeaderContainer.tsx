import {IMessageAppState} from '../models/IMessageAppState';
import {ChannelHeader, IChannelHeaderDispatchProps, IChannelHeaderStateProps} from '../components/ChannelHeader';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {deleteChannel, editingChannelNameModeFinished, editingChannelNameModeStarted, renameChannel} from '../actions/channelActions';


const mapStateToProps = (state: IMessageAppState): IChannelHeaderStateProps => {
  const channel = state.currentChannelId == null ? null : state.channels.byId.get(state.currentChannelId)!;
  const isChannelNameEditingMode = state.currentChannelId == null ? false : state.isChannelNameEditingMode;

  return { channel, isChannelNameEditingMode };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeChannelName: (id: Uuid, newName: string) => dispatch(renameChannel(id, newName)),
    removeChannel: (id: Uuid) => dispatch(deleteChannel(id)),
    activateChannelNameEditingMode: () => dispatch(editingChannelNameModeStarted()),
    deactivateChannelNameEditingMode: () => dispatch(editingChannelNameModeFinished()),
  };
};

// TODO mapDispatchToProps for renaming and deleting channel

export const ChannelHeaderContainer = connect<IChannelHeaderStateProps, IChannelHeaderDispatchProps>(mapStateToProps, mapDispatchToProps)(ChannelHeader);
