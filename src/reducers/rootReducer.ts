import {IMessageAppState} from '../models/IMessageAppState';
import {isLoggedInReducer} from './isLoggedInReducer';
import {loggedUserReducer} from './loggedUserReducer';
import {channelsReducer} from './channelsReducer';
import {messagesReducer} from './messagesReducer';
import {currentChannelIdReducer} from './currentChannelReducer';
import {usersReducer} from './usersReducer';
import {isUserDialogOpenReducer} from './isUserDialogOpenReducer';
import {isChannelNameEdititingModeReducer} from './isChannelNameEdtitingModeReducer';
import {isInviteUsersDialogOpenReducer} from './isInviteUsersDialogOpenReducer';
import {loginPageErrorsReducer} from './loginPageErrorsReducer';
import {alertsReducer, isAlertBarVisibleReducer} from './alertReducers';
import {updateMessagesTimeoutReducer} from './updateMessagesTimeoutReducer';
import {channelLoadingReducer} from './channelLoadingReducer';

export const rootReducer = (prevState = {} as IMessageAppState, action: Action<any>): IMessageAppState => ({
  isLoggedIn: isLoggedInReducer(prevState.isLoggedIn, action),
  loggedUser: loggedUserReducer(prevState.loggedUser, action),
  channels: channelsReducer(prevState.channels, action),
  messages: messagesReducer(prevState.messages, action),
  currentChannelId: currentChannelIdReducer(prevState.currentChannelId, action),
  users: usersReducer(prevState.users, action),
  isUserDialogOpen: isUserDialogOpenReducer(prevState.isUserDialogOpen, action),
  isChannelNameEditingMode: isChannelNameEdititingModeReducer(prevState.isChannelNameEditingMode, action),
  isInviteUsersDialogOpen: isInviteUsersDialogOpenReducer(prevState.isInviteUsersDialogOpen, action),
  loginPageError: loginPageErrorsReducer(prevState.loginPageError, action),
  alerts: alertsReducer(prevState.alerts, action),
  isAlertBarVisible: isAlertBarVisibleReducer(prevState.isAlertBarVisible, action),
  updateMessagesTimeout: updateMessagesTimeoutReducer(prevState.updateMessagesTimeout, action),
  channelLoading: channelLoadingReducer(prevState.channelLoading, action),
});
