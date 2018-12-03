import {LOGIN_ERROR} from '../constants/errors';
import {
  AUTHENTICATION_CLEAN_ERROR_MSG,
  MESSAGE_APP_LOADING_STARTED,
  MESSAGE_APP_LOGGING_FAILED
} from '../constants/actionTypes';

export const loginPageErrorsReducer = (prevState: LOGIN_ERROR | null = null,
                                       action:  Action<MESSAGE_APP_LOGGING_FAILED | MESSAGE_APP_LOADING_STARTED |
                                         AUTHENTICATION_CLEAN_ERROR_MSG>) => {
  switch (action.type) {
    case MESSAGE_APP_LOGGING_FAILED:
      return action.payload.error;
    case MESSAGE_APP_LOADING_STARTED:
    case AUTHENTICATION_CLEAN_ERROR_MSG:
      return null;
    default:
      return prevState;
  }
};
