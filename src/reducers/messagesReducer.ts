import * as Immutable from 'immutable';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {MESSAGE_APP_MESSAGES_ACTIONS} from '../constants/actionTypes';
import {combineReducers} from 'redux';

export const byId = (prevState = Immutable.Map<Uuid, IMessageAppMessage>(),
                     action: Action<MESSAGE_APP_MESSAGES_ACTIONS>): Immutable.Map<Uuid, IMessageAppMessage> => {
  switch (action.type) {
    case 'MESSAGE_APP_LOADING_FINISHED':
    case 'MESSAGE_LOADING_FINISHED':
      return Immutable.Map(action.payload.messages.map((message: IMessageAppMessage) => [message.id, message]));
    case 'MESSAGE_ADD_FINISHED':
      const newMessage: IMessageAppMessage = action.payload.message;
      return prevState.set(newMessage.id, newMessage);
    case 'MESSAGE_DELETE_FINISHED':
      return prevState.delete(action.payload.id);
    default:
      return prevState;
  }
};

export const allIds = (prevState = Immutable.List<Uuid>(),
                       action: Action<MESSAGE_APP_MESSAGES_ACTIONS>): Immutable.List<Uuid> => {
  switch (action.type) {
    case 'MESSAGE_APP_LOADING_FINISHED':
    case 'MESSAGE_LOADING_FINISHED':
      return Immutable.List(action.payload.messages.map((message: IMessageAppMessage) => message.id));
    case 'MESSAGE_ADD_FINISHED':
      return prevState.push(action.payload.message.id);
    case 'MESSAGE_DELETE_FINISHED':
      return prevState.filter((id: Uuid) => id !== action.payload.id);
    default:
      return prevState;
  }
};

export const messagesReducer = combineReducers({
  byId,
  allIds,
});
