import {Dispatch} from 'redux';
import {MESSAGE_APP_LOGGING_AUTO_FAILED, MESSAGE_APP_LOGGING_AUTO_STARTED, MESSAGE_APP_LOGGING_AUTO_SUCCESS, MESSAGE_APP_LOGGING_FAILED, MESSAGE_APP_LOGGING_STARTED, MESSAGE_APP_LOGGING_SUCCESS} from '../constants/actionTypes';
import delay from 'delay';
import * as MessageAppRepository from '../repository/messageAppRepository';
import {IMessageAppUser} from '../models/IMessageAppUser';

// MANUAL LOG IN
const loggingStarted = (): Action<MESSAGE_APP_LOGGING_STARTED> => ({
  type: MESSAGE_APP_LOGGING_STARTED,
});

const loggingFailed = (): Action<MESSAGE_APP_LOGGING_FAILED> => ({
  type: MESSAGE_APP_LOGGING_FAILED,
});

const loggingSuccess = (loggedUser: IMessageAppUser): Action<MESSAGE_APP_LOGGING_SUCCESS> => ({
  type: MESSAGE_APP_LOGGING_SUCCESS,
  payload: {
    loggedUser,
  },
});

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

export const logIn = (username: string, password: string): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(loggingStarted());
    const loggedUser = await _login(username, password);
    if (loggedUser == null) {
      dispatch(loggingFailed());
    } else {
      dispatch(loggingSuccess(loggedUser));
    }
  };
};

export const autoLogin = (): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(loginAutoStarted());
    const loggedUser = _autoLogin();
    if (loggedUser == null) {
      dispatch(loginAutoFailed());
    } else {
      dispatch(loginAutoSucces(loggedUser));
    }
  };
};

////////////////////// PRIVATE FUNCTIONS //////////////////////////
export const AUTO_LOGIN_USER_KEY = 'AUTO_LOGIN_USER';

// TODO create real implementation for log in
/**
 * Stub method for logging in. Wait 500 ms and then returns user with given username.
 *
 * @param userName userName of user, who is logging in
 * @param password password of user, who is logging in: passwords is ignored right now
 * @private
 */
async function _login(userName: string, password: string): Promise<IMessageAppUser | undefined> {
  await delay(100);
  console.log(userName, password);
  const selectedUser = MessageAppRepository.getUserByUsername('Trump');
  // put selected user to local storage
  localStorage.setItem(AUTO_LOGIN_USER_KEY, JSON.stringify(selectedUser));
  return selectedUser;
}

/**
 * Automatic log in based on data in local storage.
 * @private
 */
function _autoLogin(): IMessageAppUser | null {
  const localStorageLoggedUser = localStorage.getItem(AUTO_LOGIN_USER_KEY);
  if (localStorageLoggedUser  == null) {
    return null;
  }
  return JSON.parse(localStorageLoggedUser);
}
