import {LOGGING_ACTIONS} from '../constants/actionTypes';

export function isLoggedInReducer(prevState = false, action: Action<LOGGING_ACTIONS>): boolean {
  switch (action.type) {
    case 'MESSAGE_APP_LOGGING_STARTED':
      return false;
    case 'MESSAGE_APP_LOGGING_FAILED':
      return false;
    case 'MESSAGE_APP_LOGGING_SUCCESS':
      return true;
    case 'MESSAGE_APP_LOG_OUT':
      return false;
    default:
      return prevState;
  }
}
