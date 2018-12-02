import {IMessageAppChannels, IMessageAppState, IMessageAppUsers} from '../models/IMessageAppState';
import {createSelector} from 'reselect';
import * as Immutable from 'immutable';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {IMessageAppChannel} from '../models/IMessageAppChannel';

const getChannels = (state: IMessageAppState): IMessageAppChannels => state.channels;
const getLoggedUserEmail = (state: IMessageAppState): Uuid => state.loggedUser!.email;
const getUsers = (state: IMessageAppState): IMessageAppUsers => state.users;
const getCurrentChannel = (state: IMessageAppState): IMessageAppChannel => state.channels.byId.get(state.currentChannelId!)!;

/**
 * Selector which filters those channels, which should be visible for logged user.
 * Those are the ones user created or was invited in.
 */
export const getChannelIdsForLoggedUser = createSelector(
  [ getChannels, getLoggedUserEmail ],
  (channels, loggedUserEmail): Immutable.List<Uuid> => (
    channels.byId.filter((channel) => channel.userEmails.contains(loggedUserEmail))
                 .toList()
                 .map((channel) => channel.id))

);

/**
 * Select list of users which can be invited into the channel.
 */
export const getUsersForInvitationList = createSelector(
  [ getUsers, getCurrentChannel ],
  (users, channel): Immutable.List<IMessageAppUser> => (
    users.byEmail.filter((user) => !channel.userEmails.contains(user.email))
                 .toList()
  )
);
