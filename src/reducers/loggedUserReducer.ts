import {MESSAGE_APP_LOG_OUT, MESSAGE_APP_LOGGING_SUCCESS} from '../constants/actionTypes';
import {IMessageAppUser} from '../models/IMessageAppUser';

export function loggedUserReducer(prevState: IMessageAppUser | null = null,
                                  action: Action<MESSAGE_APP_LOGGING_SUCCESS | MESSAGE_APP_LOG_OUT>): IMessageAppUser | null {
  switch (action.type) {
    case 'MESSAGE_APP_LOGGING_SUCCESS':
      console.table(action.payload.loggedUser);
      return {... action.payload.loggedUser};
    case 'MESSAGE_APP_LOG_OUT':
      return null;
    default:
      return prevState;
  }
}
