import {INVITE_USERS_DIALOG_ACTIONS, INVITE_USERS_DIALOG_HIDE, INVITE_USERS_DIALOG_SHOW} from '../constants/actionTypes';

export function isInviteUsersDialogOpenReducer(prevState = false, action: Action<INVITE_USERS_DIALOG_ACTIONS>): boolean {
  switch (action.type) {
    case INVITE_USERS_DIALOG_SHOW:
      return true;
    case INVITE_USERS_DIALOG_HIDE:
      return false;
    default:
      return prevState;
  }
}
