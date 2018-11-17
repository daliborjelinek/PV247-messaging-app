import * as Immutable from 'immutable';
import {IMessageAppMessage} from './IMessageAppMessage';
import {IMessageAppChannel} from './IMessageAppChannel';
import {IMessageAppUser} from './IMessageAppUser';

export interface IMessageAppMessages {
  allIds: Immutable.List<Uuid>;
  byId: Immutable.Map<Uuid, IMessageAppMessage>;
}

export interface IMessageAppChannels {
  allIds: Immutable.List<Uuid>;
  byId: Immutable.Map<Uuid, IMessageAppChannel>;
}

export interface IMessageAppUsers {
  allIds: Immutable.List<Uuid>;
  byId: Immutable.Map<Uuid, IMessageAppUser>;
}

export interface IMessageAppState {
  messages: IMessageAppMessages;
  channels: IMessageAppChannels;
  users: IMessageAppUsers;
  // isLoading: boolean;
  isLoggedIn: boolean;
  loggedUser: IMessageAppUser | null;
  currentChannelId: Uuid | null;
  isUserDialogOpen: boolean;
  isChannelNameEditingMode: boolean;
}
