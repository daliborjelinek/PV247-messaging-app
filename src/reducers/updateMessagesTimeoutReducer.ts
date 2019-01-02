import {
  INCREASE_MESSAGES_UPDATE_TIMEOUT,
  RESTORE_MESSAGES_UPDATE_TIMEOUT,
  UPDATE_MESSAGES_TIMOUT
} from '../constants/actionTypes';

const UPDATE_MESSAGES_TIMOUT_MIN = 10;
const UPDATE_MESSAGES_TIMEOUT_MAX = 80;

export const updateMessagesTimeoutReducer = (prevState: number = UPDATE_MESSAGES_TIMOUT_MIN, action: Action<UPDATE_MESSAGES_TIMOUT>) => {
  switch (action.type) {
    case RESTORE_MESSAGES_UPDATE_TIMEOUT:
      return UPDATE_MESSAGES_TIMOUT_MIN;
    case INCREASE_MESSAGES_UPDATE_TIMEOUT: {
      if (prevState == null) {
        return UPDATE_MESSAGES_TIMOUT_MIN;
      }
      const newValue = prevState * 2;
      return newValue > UPDATE_MESSAGES_TIMEOUT_MAX ? UPDATE_MESSAGES_TIMEOUT_MAX : newValue;
    }
    default:
      return prevState;
  }
};
