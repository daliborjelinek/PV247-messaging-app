import {
  CHANNEL_ADD_FAILED,
  CHANNEL_ADD_FINISHED,
  CHANNEL_ADD_STARTED,
  CHANNEL_DELETE_FINISHED,
  CHANNEL_DELETE_STARTED,
  CHANNEL_RENAME_FINISHED,
  CHANNEL_RENAME_STARTED,
  CURRENT_CHANNEL_CHANGE_FINISHED,
  CURRENT_CHANNEL_CHANGE_STARTED
} from '../constants/actionTypes';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import {Dispatch} from 'redux';
import * as MessageAppRepository from '../repository/messageAppRepository';
import {IMessageAppState} from '../models/IMessageAppState';
import {loadMessagesForChannel} from './messageActions';

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
    dispatch(currentChannelChangeFinished(selectedChannel));

    // render messages for given channel
    dispatch(loadMessagesForChannel(channelId));
  };
};


// ADDING NEW CHANNEL
const channelAddStarted = (): Action<CHANNEL_ADD_STARTED> => ({
  type: CHANNEL_ADD_STARTED,
});

const channelAddFailed = (): Action<CHANNEL_ADD_FAILED> => ({
  type: CHANNEL_ADD_FAILED,
});

const channelAddFinished = (channel: IMessageAppChannel): Action<CHANNEL_ADD_FINISHED> => ({
  type: CHANNEL_ADD_FINISHED,
  payload: {
    channel,
  }
});

export const addChannel = (name: string): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(channelAddStarted());
    if (name === '') {
      dispatch(channelAddFailed());
      return;
    }
    const newChannel = await MessageAppRepository.addChannel(name);
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
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(channelRenameStarted());
    // TODO change name in repository
    dispatch(channelRenameFinished(id, name));
  };
};

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

export const deleteChannel = (id: Uuid): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(channelDeleteStarted());
    await MessageAppRepository.deleteChannel(id);
    dispatch(channelDeleteFinished(id));
    // TODO delete messages from selected channel
  };
};
