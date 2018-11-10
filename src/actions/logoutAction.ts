import {MESSAGE_APP_LOG_OUT} from '../constants/actionTypes';
import {Dispatch} from 'redux';
import {AUTO_LOGIN_USER_KEY} from './loginAction';

export const logoutAction = (): Action<MESSAGE_APP_LOG_OUT> => ({
  type: MESSAGE_APP_LOG_OUT,
});

export const logout = (): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    if (localStorage.getItem(AUTO_LOGIN_USER_KEY) != null) {
      localStorage.removeItem(AUTO_LOGIN_USER_KEY);
    }
    dispatch(logoutAction());
  };
};
