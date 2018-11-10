import {CURRENT_CHANNEL_CHANGE_FINISHED, CURRENT_CHANNEL_CHANGE_STARTED} from '../constants/actionTypes';
import {IMessageAppChannel} from '../models/IMessageAppChannel';


export const currentChannelChangeStarted = (): Action<CURRENT_CHANNEL_CHANGE_STARTED> => ({
  type: CURRENT_CHANNEL_CHANGE_STARTED,
});

export const currentChannelChangeFinished = (activeChannel: IMessageAppChannel): Action<CURRENT_CHANNEL_CHANGE_FINISHED> => ({
  type: CURRENT_CHANNEL_CHANGE_FINISHED,
  payload: {
    id: activeChannel.id,
  },
});
