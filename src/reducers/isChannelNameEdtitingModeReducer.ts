import {
  CURRENT_CHANNEL_CHANGE_FINISHED,
  EDITING_CHANNEL_NAME_MODE_FINISHED,
  EDITING_CHANNEL_NAME_MODE_STARTED,
  MESSAGE_APP_CHANNELS_ACTIONS,
} from '../constants/actionTypes';


export const isChannelNameEdititingModeReducer = (prevState = false,
                                                  action: Action<MESSAGE_APP_CHANNELS_ACTIONS>): boolean => {
  switch (action.type) {
    case EDITING_CHANNEL_NAME_MODE_STARTED:
      return true;
    case EDITING_CHANNEL_NAME_MODE_FINISHED:
    case CURRENT_CHANNEL_CHANGE_FINISHED:
      return false;
    default:
      return prevState;
  }
};
