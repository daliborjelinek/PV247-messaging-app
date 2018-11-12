import {IMessageAppState} from '../models/IMessageAppState';
import {isLoggedInReducer} from './isLoggedInReducer';
import {loggedUserReducer} from './loggedUserReducer';
import {channelsReducer} from './channelsReducer';
import {messagesReducer} from './messagesReducer';
import {currentChannelIdReducer} from './currentChannelReducer';
import {usersReducer} from './usersReducers';
import {isUserDialogOpen} from './isUserDialogOpen';

// TODO create reducers for remaining state attributes
export const rootReducer = (prevState = {} as IMessageAppState, action: Action<any>): IMessageAppState => ({
  isLoggedIn: isLoggedInReducer(prevState.isLoggedIn, action),
  loggedUser: loggedUserReducer(prevState.loggedUser, action),
  channels: channelsReducer(prevState.channels, action),
  messages: messagesReducer(prevState.messages, action),
  currentChannelId: currentChannelIdReducer(prevState.currentChannelId, action),
  users: usersReducer(prevState.users, action),
  isUserDialogOpen: isUserDialogOpen(prevState.isUserDialogOpen, action),
});
