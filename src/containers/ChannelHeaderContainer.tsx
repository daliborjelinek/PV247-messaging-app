import {IMessageAppState} from '../models/IMessageAppState';
import {ChannelHeader, IChannelHeaderDispatchProps, IChannelHeaderStateProps} from '../components/ChannelHeader';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {deleteChannel, editingChannelNameModeFinished, editingChannelNameModeStarted, renameChannel} from '../actions/channelActions';
import {showInviteUsersToChannelDialog} from '../actions/appearanceActions';


const mapStateToProps = (state: IMessageAppState): IChannelHeaderStateProps => {
  const channel = state.currentChannelId == null ? null : state.channels.byId.get(state.currentChannelId)!;
  const isChannelNameEditingMode = state.currentChannelId == null ? false : state.isChannelNameEditingMode;

  return { channel, isChannelNameEditingMode };
};

const mapDispatchToProps = (dispatch: Dispatch): IChannelHeaderDispatchProps => {
  return {
    changeChannelName: (id: Uuid, newName: string) => dispatch(renameChannel(id, newName)),
    removeChannel: (id: Uuid) => dispatch(deleteChannel(id)),
    activateChannelNameEditingMode: () => dispatch(editingChannelNameModeStarted()),
    deactivateChannelNameEditingMode: () => dispatch(editingChannelNameModeFinished()),
    showInviteUsersDialog: () => dispatch(showInviteUsersToChannelDialog()),
  };
};

export const ChannelHeaderContainer = connect<IChannelHeaderStateProps, IChannelHeaderDispatchProps>(mapStateToProps,
  mapDispatchToProps)(ChannelHeader);
