import {IMessageAppChannels, IMessageAppState} from '../models/IMessageAppState';
import {createSelector} from 'reselect';
import * as Immutable from 'immutable';

const getChannels = (state: IMessageAppState): IMessageAppChannels => state.channels;
const getLoggedUserEmail = (state: IMessageAppState): Uuid => state.loggedUser!.email;

/**
 * Selectors which filters those channels, which should be visible for logged user.
 * Those are the ones user created or was invited in.
 */
export const getChannelIdsForLoggedUser = createSelector(
  [ getChannels, getLoggedUserEmail ],
  (channels, loggedUserEmail): Immutable.List<Uuid> => (
    channels.byId.filter((channel) => channel.userEmails.contains(loggedUserEmail))
                 .toList()
                 .map((channel) => channel.id))

);
