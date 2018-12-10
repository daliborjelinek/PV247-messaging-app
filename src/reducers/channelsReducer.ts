import * as Immutable from 'immutable';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import {
  CHANNEL_ADD_FINISHED,
  CHANNEL_DELETE_FINISHED,
  CHANNEL_RENAME_FINISHED,
  MESSAGE_APP_CHANNELS_ACTIONS,
  MESSAGE_APP_LOADING_FINISHED, CHANNEL_REORDER_FINISHED, CHANNEL_INVITE_USER_FINISHED,
} from '../constants/actionTypes';
import {combineReducers} from 'redux';


const byId = (prevState = Immutable.Map<Uuid, IMessageAppChannel>(),
              action: Action<MESSAGE_APP_CHANNELS_ACTIONS>): Immutable.Map<Uuid, IMessageAppChannel> => {
  switch (action.type) {
    case MESSAGE_APP_LOADING_FINISHED:
      return Immutable.Map(action.payload.channels.map((item: IMessageAppChannel) => [item.id, item]));
    case  CHANNEL_ADD_FINISHED:
      return prevState.set(action.payload.channel.id, action.payload.channel);
    case CHANNEL_RENAME_FINISHED:
      const { id, name } = action.payload;
      const updatedItem = { ...prevState.get(id)!, name};
      return prevState.set(id, updatedItem);
    case CHANNEL_DELETE_FINISHED:
      return prevState.delete(action.payload.id);
    case CHANNEL_INVITE_USER_FINISHED:
      const {channelId, email} = action.payload;
      const userEmails = prevState.get(channelId)!.userEmails.push(email);
      const updatedChannel: IMessageAppChannel = { ...prevState.get(channelId)!, userEmails};
      return prevState.set(channelId, updatedChannel);
    default:
      return prevState;
  }
};

const allIds = (prevState = Immutable.List<Uuid>(),
                action: Action<MESSAGE_APP_CHANNELS_ACTIONS>): Immutable.List<Uuid> => {
  switch (action.type) {
    case MESSAGE_APP_LOADING_FINISHED:
      return Immutable.List(action.payload.channels.map((item: IMessageAppChannel) => item.id));
    case CHANNEL_ADD_FINISHED:
      return prevState.push(action.payload.channel.id);
    case CHANNEL_DELETE_FINISHED:
      return prevState.filter((id) => id !== action.payload.id);
    case CHANNEL_REORDER_FINISHED:
      return action.payload.reorderedChannelIds;
    default:
      return prevState;
  }
};

export const channelsReducer = combineReducers({
  allIds,
  byId,
});
