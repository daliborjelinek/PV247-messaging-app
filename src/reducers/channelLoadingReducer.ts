import {
  MESSAGE_APP_LOADING_FINISHED,
  MESSAGE_APP_LOADING_STARTED, MESSAGE_LOADING_FINISHED, MESSAGE_LOADING_STARTED
} from '../constants/actionTypes';

export function channelLoadingReducer(prevState = false, action: Action<any>): boolean {
  switch (action.type) {
    case MESSAGE_APP_LOADING_STARTED:
    case MESSAGE_LOADING_STARTED:
      return true;
    case MESSAGE_APP_LOADING_FINISHED:
    case MESSAGE_LOADING_FINISHED:
      return false;
    default:
      return prevState;
  }
}
