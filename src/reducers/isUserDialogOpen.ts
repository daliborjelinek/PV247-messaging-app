import {USER_PROFILE_SHOW_DIALOG, USER_PROFILE_HIDE_DIALOG} from '../constants/actionTypes';

export function isUserDialogOpen(prevState = false, action: Action<USER_PROFILE_SHOW_DIALOG | USER_PROFILE_HIDE_DIALOG>): boolean {
  switch (action.type) {
    case 'USER_PROFILE_SHOW_DIALOG':
      return true;
    case 'USER_PROFILE_HIDE_DIALOG':
      return false;
    default:
      return prevState;
  }
}