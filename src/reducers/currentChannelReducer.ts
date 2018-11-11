import {MESSAGE_APP_CHANNELS_ACTIONS} from '../constants/actionTypes';


export const currentChannelIdReducer = (prevState: null | Uuid = null,
                                        action: Action<MESSAGE_APP_CHANNELS_ACTIONS>): null | Uuid => {
  switch (action.type) {
    case 'CURRENT_CHANNEL_CHANGE_STARTED':
      return prevState;
    case 'CURRENT_CHANNEL_CHANGE_FINISHED':
      return action.payload.id;
    case 'CHANNEL_DELETE_FINISHED':
      return null;
    default:
      return prevState;
  }
};
