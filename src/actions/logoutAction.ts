import {MESSAGE_APP_LOG_OUT} from '../constants/actionTypes';

export const logoutAction = (): Action<MESSAGE_APP_LOG_OUT> => ({
  type: MESSAGE_APP_LOG_OUT,
});
