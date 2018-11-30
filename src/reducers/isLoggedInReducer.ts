import {
  LOGGING_ACTIONS,
  MESSAGE_APP_LOG_OUT,
  MESSAGE_APP_LOGGING_AUTO_FAILED,
  MESSAGE_APP_LOGGING_AUTO_STARTED,
  MESSAGE_APP_LOGGING_AUTO_SUCCESS,
  MESSAGE_APP_LOGGING_FAILED,
  MESSAGE_APP_LOGGING_STARTED,
  MESSAGE_APP_LOGGING_SUCCESS
} from '../constants/actionTypes';

export function isLoggedInReducer(prevState = false, action: Action<LOGGING_ACTIONS>): boolean {
  switch (action.type) {
    case MESSAGE_APP_LOGGING_STARTED:
    case MESSAGE_APP_LOGGING_AUTO_STARTED:
      return false;
    case MESSAGE_APP_LOGGING_FAILED:
    case MESSAGE_APP_LOGGING_AUTO_FAILED:
      return false;
    case MESSAGE_APP_LOGGING_SUCCESS:
    case MESSAGE_APP_LOGGING_AUTO_SUCCESS:
      return true;
    case MESSAGE_APP_LOG_OUT:
      return false;
    default:
      return prevState;
  }
}
