import {IMessageAppChannels, IMessageAppMessages, IMessageAppState, IMessageAppUsers} from '../models/IMessageAppState';
import {createSelector} from 'reselect';
import * as Immutable from 'immutable';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {IMessageAppChannel} from '../models/IMessageAppChannel';

const getChannels = (state: IMessageAppState): IMessageAppChannels => state.channels;
const getChannelIds = (state: IMessageAppState): Immutable.List<Uuid> => state.channels.allIds;
const getLoggedUserEmail = (state: IMessageAppState): Uuid => state.loggedUser!.email;
const getUsers = (state: IMessageAppState): IMessageAppUsers => state.users;
const getCurrentChannel = (state: IMessageAppState): IMessageAppChannel | undefined =>  {
  if (state.currentChannelId == null) {
    return undefined;
  }
  return state.channels.byId.get(state.currentChannelId);
};
const getMessages = (state: IMessageAppState): IMessageAppMessages => state.messages;

/**
 * Selector which filters those channels, which should be visible for logged user.
 * Those are the ones user created or was invited in.
 */
export const getChannelIdsForLoggedUser = createSelector(
  [ getChannels, getChannelIds, getLoggedUserEmail ],
  (channels, channelIds, loggedUserEmail): Immutable.List<Uuid> => {
      const filteredChannels = channels.byId.filter((channel) => channel.userEmails.contains(loggedUserEmail));
      // ordering must be preserved
      return channelIds.filter((channelId) => filteredChannels.has(channelId));
  }
);

/**
 * Select list of users which can be invited into the channel.
 */
export const getUsersForInvitation = createSelector(
  [ getUsers, getCurrentChannel ],
  (users, channel): Immutable.List<IMessageAppUser> => {
    if (channel == null) {
      return Immutable.List();
    }
    return users.byEmail.filter((user) => !channel.userEmails.contains(user.email))
      .toList();
  }
);

export const getUsersForMention = createSelector(
  [ getUsers, getCurrentChannel, getLoggedUserEmail ],
  (users, channel, loggedUserEmail): Immutable.List<IMessageAppUser> => {
    if (channel == null) {
      return Immutable.List();
    }
    return users.byEmail.filter((user) => channel.userEmails.contains(user.email))
                        .filter((user) => user.email !== loggedUserEmail)
                        .toList();
  }
);

/**
 * Returns information when last displayed message was created.
 */
export const getCreationTimeOfLastDisplayedMessage = createSelector(
  [ getMessages ],
  (messages): Date | null => {
    if (messages.allIds.size === 0) {
      return null;
    }

    const lastMessageId: Uuid = messages.allIds.last();
    return messages.byId.get(lastMessageId)!.createdAt;
  }
);
