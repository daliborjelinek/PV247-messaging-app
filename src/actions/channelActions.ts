import {CHANNEL_ADD_FAILED, CHANNEL_ADD_FINISHED, CHANNEL_ADD_STARTED, CURRENT_CHANNEL_CHANGE_FINISHED, CURRENT_CHANNEL_CHANGE_STARTED} from '../constants/actionTypes';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import {Dispatch} from 'redux';
import * as MessageAppRepository from '../repository/messageAppRepository';

// CHANGING CHANNEL
export const currentChannelChangeStarted = (): Action<CURRENT_CHANNEL_CHANGE_STARTED> => ({
  type: CURRENT_CHANNEL_CHANGE_STARTED,
});

export const currentChannelChangeFinished = (activeChannel: IMessageAppChannel): Action<CURRENT_CHANNEL_CHANGE_FINISHED> => ({
  type: CURRENT_CHANNEL_CHANGE_FINISHED,
  payload: {
    id: activeChannel.id,
  },
});


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
