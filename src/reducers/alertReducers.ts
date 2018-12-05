import * as Immutable from 'immutable';
import {
  ALERT_ACTIONS,
  CHANNEL_DELETE_FAILED, MESSAGE_APP_CLEAR_ALERTS
} from '../constants/actionTypes';

export const isAlertBarVisibleReducer = (prevState = false, action: Action<ALERT_ACTIONS>): boolean => {
  switch (action.type) {
    case CHANNEL_DELETE_FAILED:
      return true;
    case MESSAGE_APP_CLEAR_ALERTS:
      return false;
    default:
      return prevState;
  }
};

export const alertsReducer = (prevState = Immutable.List<string>(), action: Action<ALERT_ACTIONS>): Immutable.List<string> => {
  switch (action.type) {
    case CHANNEL_DELETE_FAILED:
      return prevState.push(action.payload.message);
    case MESSAGE_APP_CLEAR_ALERTS:
      return Immutable.List();
    default:
      return prevState;
  }
};
