import * as Immutable from 'immutable';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import {MESSAGE_APP_CHANNELS_ACTIONS} from '../constants/actionTypes';
import {combineReducers} from 'redux';


const byId = (prevState = Immutable.Map<Uuid, IMessageAppChannel>(),
              action: Action<MESSAGE_APP_CHANNELS_ACTIONS>): Immutable.Map<Uuid, IMessageAppChannel> => {
  switch (action.type) {
    case 'MESSAGE_APP_LOADING_FINISHED':
      return Immutable.Map(action.payload.channels.map((item: IMessageAppChannel) => [item.id, item]));
    case  'CHANNEL_ADD_FINISHED':
      return prevState.set(action.payload.channel.id, action.payload.channel);
    default:
      return prevState;
  }
};

const allIds = (prevState = Immutable.List<Uuid>(),
                action: Action<MESSAGE_APP_CHANNELS_ACTIONS>): Immutable.List<Uuid> => {
  switch (action.type) {
    case 'MESSAGE_APP_LOADING_FINISHED':
      return Immutable.List(action.payload.channels.map((item: IMessageAppChannel) => item.id));
    case 'CHANNEL_ADD_FINISHED':
      return prevState.push(action.payload.channel.id);
    default:
      return prevState;
  }
};

export const channelsReducer = combineReducers({
  allIds,
  byId,
});
