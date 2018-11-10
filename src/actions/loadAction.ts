import * as Immutable from 'immutable';
import {MESSAGE_APP_LOADING_FINISHED, MESSAGE_APP_LOADING_STARTED} from '../constants/actionTypes';
import {Dispatch} from 'redux';
import * as MessageAppRepository from '../repository/messageAppRepository';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {currentChannelChangeFinished} from './channelActions';

const loadingStarted = (): Action<MESSAGE_APP_LOADING_STARTED> => ({
  type: MESSAGE_APP_LOADING_STARTED,
});

const loadingFinished = (channels: Immutable.List<IMessageAppChannel> = Immutable.List(),
                         messages: Immutable.List<IMessageAppMessage> = Immutable.List(),
                         users: Immutable.List<IMessageAppUser> = Immutable.List()): Action<MESSAGE_APP_LOADING_FINISHED> => ({
  type: MESSAGE_APP_LOADING_FINISHED,
  payload: {
    channels,
    messages,
    users,
  }
});

export const loadApp = (): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(loadingStarted());
    const channels = await MessageAppRepository.loadChannels();
    // loading messages and users is not necessary
    if (channels == null || channels.isEmpty()) {
      // TODO components should show message if no channel is created yet
      dispatch(loadingFinished());
      return;
    }
    // at least one channel exists
    const activeChannel = channels.get(0)!;
    const messagesForActiveChannel = MessageAppRepository.loadMessagesForChannel(activeChannel.id);
    const users = MessageAppRepository.loadUsers();
    Promise.all([messagesForActiveChannel, users]).then((values) => {
      dispatch(loadingFinished(channels, values[0], values[1]));
      // after loading is finished, change active channel to the first one
      dispatch(currentChannelChangeFinished(activeChannel));
    });
  };
};

