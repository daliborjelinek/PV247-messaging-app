import * as Immutable from 'immutable';
import {MESSAGE_APP_LOADING_FINISHED, MESSAGE_APP_LOADING_STARTED} from '../constants/actionTypes';
import {Dispatch} from 'redux';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {currentChannelChangeFinished} from './channelActions';
import * as ChannelService from '../service/channelService';
import * as MessageService from '../service/messageService';
import * as UserService from '../service/userService';
import {IMessageAppState} from '../models/IMessageAppState';

const loadingStarted = (): Action<MESSAGE_APP_LOADING_STARTED> => ({
  type: MESSAGE_APP_LOADING_STARTED,
});

const loadingFinished = (channels: Immutable.List<IMessageAppChannel> = Immutable.List(),
                         messages: Immutable.List<IMessageAppMessage> = Immutable.List(),
                         users: Immutable.List<IMessageAppUser> = Immutable.List()):
                          Action<MESSAGE_APP_LOADING_FINISHED> => ({
  type: MESSAGE_APP_LOADING_FINISHED,
  payload: {
    channels,
    messages,
    users,
  }
});

export const loadApp = (): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    dispatch(loadingStarted());
    const channels = await ChannelService.loadChannels();
    // loading messages and users is not necessary
    if (channels == null || channels.isEmpty()) {
      dispatch(loadingFinished());
      return;
    }

    // check if user is in any of the existing channels
    const loggedUserEmail = getState().loggedUser!.email;
    const channelsForLoggedUser = channels.filter((channel) => channel.userEmails.contains(loggedUserEmail));
    if (channelsForLoggedUser.isEmpty()) {
      dispatch(loadingFinished());
      return;
    }

    // at least one channel exists - load messages and users
    let activeChannel: IMessageAppChannel = channelsForLoggedUser.get(0)!;
    const lastUsedChannelId = ChannelService.getLastActiveChannelId(loggedUserEmail);
    const lastUsedChannel = channelsForLoggedUser.find((channel) => channel.id === lastUsedChannelId);
    if (lastUsedChannel != null) {
      activeChannel = lastUsedChannel;
    }
    const messagesForActiveChannel = MessageService.loadMessagesForChannel(activeChannel.id);
    const users = UserService.loadUsers();
    Promise.all([messagesForActiveChannel, users]).then((values) => {
      dispatch(loadingFinished(channels, values[0], values[1]));
      // after loading is finished, change active channel to the first one
      dispatch(currentChannelChangeFinished(activeChannel));
    });
  };
};

