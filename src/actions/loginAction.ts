import {Dispatch} from 'redux';
import {MESSAGE_APP_LOGGING_FAILED, MESSAGE_APP_LOGGING_STARTED, MESSAGE_APP_LOGGING_SUCCESS} from '../constants/actionTypes';
import delay from 'delay';
import * as MessageAppRepository from '../repository/messageAppRepository';
import {IMessageAppUser} from '../models/IMessageAppUser';


const loggingStarted = (): Action<MESSAGE_APP_LOGGING_STARTED> => ({
  type: MESSAGE_APP_LOGGING_STARTED,
});

const loggingFailed = (): Action<MESSAGE_APP_LOGGING_FAILED> => ({
  type: MESSAGE_APP_LOGGING_FAILED,
});

const loggingSucces = (loggedUser: IMessageAppUser): Action<MESSAGE_APP_LOGGING_SUCCESS> => ({
  type: MESSAGE_APP_LOGGING_SUCCESS,
  payload: {
    loggedUser,
  },
});

export const logIn = (username: string, password: string): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(loggingStarted());
    const loggedUser = await _logIn(username, password);
    if (loggedUser == null) {
      dispatch(loggingFailed());
    } else {
      dispatch(loggingSucces(loggedUser));
    }
  };
};

// TODO create real implementation for logging in
/**
 * Stub method for logging in. Wait 500 ms and then returns user with given username.
 *
 * @param userName userName of user, who is logging in
 * @param password password of user, who is logging in: passwords is ignored right now
 * @private
 */
async function _logIn(userName: string, password: string): Promise<IMessageAppUser | undefined> {
  await delay(500);
  console.log(userName, password);
  return MessageAppRepository.getUserByUsername(userName);
}
