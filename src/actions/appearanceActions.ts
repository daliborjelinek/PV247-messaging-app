import {INVITE_USERS_DIALOG_HIDE, INVITE_USERS_DIALOG_SHOW} from '../constants/actionTypes';

export const showInviteUsersToChannelDialog = (): Action<INVITE_USERS_DIALOG_SHOW> => ({
  type: INVITE_USERS_DIALOG_SHOW,
});

export const hideInviteUsersToChannelDialog = (): Action<INVITE_USERS_DIALOG_HIDE> => ({
  type: INVITE_USERS_DIALOG_HIDE,
});
