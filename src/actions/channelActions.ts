import {
  CHANNEL_ADD_FINISHED,
  CHANNEL_ADD_STARTED,
  CHANNEL_DELETE_FAILED,
  CHANNEL_DELETE_FINISHED,
  CHANNEL_DELETE_STARTED,
  CHANNEL_INVITE_USER_FINISHED,
  CHANNEL_INVITE_USER_STARTED,
  CHANNEL_RENAME_FINISHED,
  CHANNEL_RENAME_STARTED,
  CHANNEL_REORDER_FINISHED,
  CHANNEL_REORDER_STARTED,
  CURRENT_CHANNEL_CHANGE_FINISHED,
  CURRENT_CHANNEL_CHANGE_STARTED,
  EDITING_CHANNEL_NAME_MODE_FINISHED,
  EDITING_CHANNEL_NAME_MODE_STARTED
} from '../constants/actionTypes';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import {Dispatch} from 'redux';
import {IMessageAppState} from '../models/IMessageAppState';
import {hideMessagesForDeletedChannel, loadMessagesForChannel, restoreMessageActualizationTimeout} from './messageActions';
import * as ChannelService from '../service/channelService';
import * as Immutable from 'immutable';

// CHANGING CHANNEL
const currentChannelChangeStarted = (): Action<CURRENT_CHANNEL_CHANGE_STARTED> => ({
  type: CURRENT_CHANNEL_CHANGE_STARTED,
});

export const currentChannelChangeFinished = (activeChannel: IMessageAppChannel): Action<CURRENT_CHANNEL_CHANGE_FINISHED> => ({
  type: CURRENT_CHANNEL_CHANGE_FINISHED,
  payload: {
    id: activeChannel.id,
  },
});

export const onChannelSelected = (channelId: Uuid): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    dispatch(currentChannelChangeStarted());
    const selectedChannel = getState().channels.byId.get(channelId)!;
    ChannelService.setLastActiveChannelId(channelId, getState().loggedUser!.email);
    // render messages for given channel
    await dispatch(loadMessagesForChannel(channelId));
    dispatch(currentChannelChangeFinished(selectedChannel));
    dispatch(restoreMessageActualizationTimeout());
  };
};


// ADDING NEW CHANNEL
const channelAddStarted = (): Action<CHANNEL_ADD_STARTED> => ({
  type: CHANNEL_ADD_STARTED,
});

const channelAddFinished = (channel: IMessageAppChannel): Action<CHANNEL_ADD_FINISHED> => ({
  type: CHANNEL_ADD_FINISHED,
  payload: {
    channel,
  }
});

export const addChannel = (name: string): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    dispatch(channelAddStarted());
    const newChannel = await ChannelService.createChannel(name, getState().channels.allIds.size,
      getState().loggedUser!.email);
    dispatch(channelAddFinished(newChannel));
  };
};


// RENAMING CHANNEL
const channelRenameStarted = (): Action<CHANNEL_RENAME_STARTED> => ({
  type: CHANNEL_RENAME_STARTED,
});

const channelRenameFinished = (id: Uuid, name: string): Action<CHANNEL_RENAME_FINISHED> => ({
  type: CHANNEL_RENAME_FINISHED,
  payload: {
    id,
    name,
  }
});

export const renameChannel = (id: Uuid, name: string): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    dispatch(channelRenameStarted());
    const channel = getState().channels.byId.get(id)!;
    await ChannelService.changeChannelName(channel, name);
    dispatch(channelRenameFinished(id, name));
    dispatch(editingChannelNameModeFinished());
  };
};

// EDITING CHANNEL NAME MODE
export const editingChannelNameModeStarted = (): Action<EDITING_CHANNEL_NAME_MODE_STARTED> => ({
  type: EDITING_CHANNEL_NAME_MODE_STARTED,
});

export const editingChannelNameModeFinished = (): Action<EDITING_CHANNEL_NAME_MODE_FINISHED> => ({
  type: EDITING_CHANNEL_NAME_MODE_FINISHED,
});

// DELETING CHANNEL
const channelDeleteStarted = (): Action<CHANNEL_DELETE_STARTED> => ({
  type: CHANNEL_DELETE_STARTED,
});

const channelDeleteFinished = (id: Uuid): Action<CHANNEL_DELETE_FINISHED> => ({
  type: CHANNEL_DELETE_FINISHED,
  payload: {
    id,
  }
});

const channelDeleteFailed = (): Action<CHANNEL_DELETE_FAILED> => ({
  type: CHANNEL_DELETE_FAILED,
  payload: {
    message: 'Channel cannot be deleted. Only person who created the channel can remove it',
  }
});

export const deleteChannel = (id: Uuid): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    dispatch(channelDeleteStarted());
    const channel = getState().channels.byId.get(id)!;
    if (getState().loggedUser!.email !== channel.createdBy) {
      dispatch(channelDeleteFailed());
      return;
    }
    await ChannelService.deleteChannel(id);
    dispatch(channelDeleteFinished(id));
    dispatch(hideMessagesForDeletedChannel());
  };
};

// REORDERING CHANNELS
const reorderChannelStarted = (): Action<CHANNEL_REORDER_STARTED> => ({
  type: CHANNEL_REORDER_STARTED,
});

const reorderChannelFinished = (reorderedChannelIds: Immutable.List<Uuid>): Action<CHANNEL_REORDER_FINISHED> => ({
  type: CHANNEL_REORDER_FINISHED,
  payload: {
    reorderedChannelIds,
  }
});

export const reorderChannels = (reorderedChannelIds: Immutable.List<Uuid>): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    dispatch(reorderChannelStarted());
    ChannelService.reorderChannels(reorderedChannelIds, getState().channels);
    dispatch(reorderChannelFinished(reorderedChannelIds));
  };
};

// ADDING USER TO CHANNEL
const addUserToChannelStarted = (): Action<CHANNEL_INVITE_USER_STARTED> => ({
  type: CHANNEL_INVITE_USER_STARTED,
});

const addUserToChannelFinished = (email: string, channelId: Uuid): Action<CHANNEL_INVITE_USER_FINISHED> => ({
  type: CHANNEL_INVITE_USER_FINISHED,
  payload: {
    email,
    channelId,
  }
});

export const addUserToActiveChannel = (email: string): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    dispatch(addUserToChannelStarted());
    const channel = getState().channels.byId.get(getState().currentChannelId!)!;
    ChannelService.addUserToChannel(email, channel);
    dispatch(addUserToChannelFinished(email, getState().currentChannelId!));
  };
};
