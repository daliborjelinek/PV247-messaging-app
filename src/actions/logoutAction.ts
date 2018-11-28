import {MESSAGE_APP_LOG_OUT} from '../constants/actionTypes';
import {Dispatch} from 'redux';
import * as authenticationService from '../service/authenticationService';


export const logoutAction = (): Action<MESSAGE_APP_LOG_OUT> => ({
  type: MESSAGE_APP_LOG_OUT,
});

export const logout = (): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    authenticationService.logOut();
    dispatch(logoutAction());
  };
};
