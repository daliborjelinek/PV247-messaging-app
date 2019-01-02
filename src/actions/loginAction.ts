import {Dispatch} from 'redux';
import {
  AUTHENTICATION_CLEAN_ERROR_MSG,
  MESSAGE_APP_LOGGING_AUTO_FAILED,
  MESSAGE_APP_LOGGING_AUTO_STARTED,
  MESSAGE_APP_LOGGING_AUTO_SUCCESS,
  MESSAGE_APP_LOGGING_FAILED,
  MESSAGE_APP_LOGGING_STARTED,
  MESSAGE_APP_LOGGING_SUCCESS
} from '../constants/actionTypes';
import * as authenticationService from '../service/authenticationService';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {LOGIN_ERROR} from '../constants/errors';

// MANUAL LOG IN
const authenticationStarted = (): Action<MESSAGE_APP_LOGGING_STARTED> => ({
  type: MESSAGE_APP_LOGGING_STARTED,
});

const authenticationFailed = (error: LOGIN_ERROR): Action<MESSAGE_APP_LOGGING_FAILED> => ({
  type: MESSAGE_APP_LOGGING_FAILED,
  payload: {
    error,
  }
});

const authenticationSuccess = (loggedUser: IMessageAppUser): Action<MESSAGE_APP_LOGGING_SUCCESS> => ({
  type: MESSAGE_APP_LOGGING_SUCCESS,
  payload: {
    loggedUser,
  },
});

export const logIn = (email: string, password: string): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(authenticationStarted());
    const authenticationResult = await authenticationService.authenticate({email, password});
    console.log(authenticationResult);
    // error during authentication
    if (typeof authenticationResult === 'string') {
      dispatch(authenticationFailed(authenticationResult));
      return;
    }
    dispatch(authenticationSuccess(authenticationResult));
  };
};

// AUTO LOG IN - from local storage
const loginAutoStarted = (): Action<MESSAGE_APP_LOGGING_AUTO_STARTED> => ({
  type: MESSAGE_APP_LOGGING_AUTO_STARTED,
});

const loginAutoFailed = (): Action<MESSAGE_APP_LOGGING_AUTO_FAILED> => ({
  type: MESSAGE_APP_LOGGING_AUTO_FAILED,
});

const loginAutoSucces = (loggedUser: IMessageAppUser): Action<MESSAGE_APP_LOGGING_AUTO_SUCCESS> => ({
  type: MESSAGE_APP_LOGGING_AUTO_SUCCESS,
  payload: {
    loggedUser,
  }
});

export const autoLogin = (): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(loginAutoStarted());
    const loggedUser = authenticationService.getLoggedUser();
    if (loggedUser == null) {
      dispatch(loginAutoFailed());
    } else {
      dispatch(loginAutoSucces(loggedUser));
    }
  };
};

// CLEAR ERROR MESSAGW
export const clearAuthenticationErrorMessage = (): Action<AUTHENTICATION_CLEAN_ERROR_MSG> => ({
  type: AUTHENTICATION_CLEAN_ERROR_MSG,
});
