import {
  MESSAGE_APP_LOADING_FINISHED,
  MESSAGE_APP_LOADING_STARTED, MESSAGE_LOADING_FINISHED, MESSAGE_LOADING_STARTED
} from '../constants/actionTypes';

export function channelLoadingReducer(prevState = false, action: Action<any>): boolean {
  switch (action.type) {
    case MESSAGE_APP_LOADING_STARTED:
    case MESSAGE_LOADING_STARTED:
      console.log('funguje to true');
      return true;
    case MESSAGE_APP_LOADING_FINISHED:
    case MESSAGE_LOADING_FINISHED:
      console.log('funguje to false');
      return false;
    default:
      return prevState;
  }
}
