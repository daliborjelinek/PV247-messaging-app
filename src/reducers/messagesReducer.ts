import * as Immutable from 'immutable';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {
  ACTUALIZE_MESSAGES_IN_CHANNEL_FINISHED,
  HIDE_MESSAGES_FOR_DELETED_CHANNEL,
  MESSAGE_ADD_FINISHED,
  MESSAGE_APP_LOADING_FINISHED,
  MESSAGE_APP_MESSAGES_ACTIONS,
  MESSAGE_DECREMENT_RATING,
  MESSAGE_DELETE_FINISHED,
  MESSAGE_INCREMENT_RATING,
  MESSAGE_LOADING_FINISHED,
} from '../constants/actionTypes';
import {combineReducers} from 'redux';
import {RatingPolarity} from '../enums/RatingPolarity';

export const byId = (prevState = Immutable.Map<Uuid, IMessageAppMessage>(),
                     action: Action<MESSAGE_APP_MESSAGES_ACTIONS>): Immutable.Map<Uuid, IMessageAppMessage> => {
  switch (action.type) {
    case MESSAGE_APP_LOADING_FINISHED:
    case MESSAGE_LOADING_FINISHED:
      return Immutable.Map(action.payload.messages.map((message: IMessageAppMessage) => [message.id, message]));
    case MESSAGE_ADD_FINISHED: {
      const newMessage: IMessageAppMessage = action.payload.message;
      return prevState.set(newMessage.id, newMessage);
    }
    case ACTUALIZE_MESSAGES_IN_CHANNEL_FINISHED: {
      const newMessagesMap: Immutable.Map<Uuid, IMessageAppMessage> = Immutable.Map(action.payload.newMessages.map(
        (message: IMessageAppMessage) => [message.id, message])
      );
      return prevState.merge(newMessagesMap);
    }
    case MESSAGE_DELETE_FINISHED:
      return prevState.delete(action.payload.id);
    case MESSAGE_INCREMENT_RATING: {
      const {id, userId} = action.payload;
      const changedMessageIncrement = _changeMessageRating(RatingPolarity.POSITIVE, userId, prevState.get(id)!);
      return prevState.set(action.payload.id, changedMessageIncrement);
    }
    case MESSAGE_DECREMENT_RATING: {
      const {id, userId} = action.payload;
      const changedMessageDecrement = _changeMessageRating(RatingPolarity.NEGATIVE, userId, prevState.get(id)!);
      return prevState.set(action.payload.id, changedMessageDecrement);
    }
    case HIDE_MESSAGES_FOR_DELETED_CHANNEL:
      return Immutable.Map();
    default:
      return prevState;
  }
};

export const allIds = (prevState = Immutable.List<Uuid>(),
                       action: Action<MESSAGE_APP_MESSAGES_ACTIONS>): Immutable.List<Uuid> => {
  switch (action.type) {
    case MESSAGE_APP_LOADING_FINISHED:
    case MESSAGE_LOADING_FINISHED:
      return Immutable.List(action.payload.messages.map((message: IMessageAppMessage) => message.id));
    case ACTUALIZE_MESSAGES_IN_CHANNEL_FINISHED:
      const newMessagesIds: Immutable.List<Uuid> = action.payload.newMessages.map((message: IMessageAppMessage) => message.id);
      return prevState.merge(newMessagesIds);
    case MESSAGE_ADD_FINISHED:
      return prevState.push(action.payload.message.id);
    case MESSAGE_DELETE_FINISHED:
      return prevState.filter((id: Uuid) => id !== action.payload.id);
    case HIDE_MESSAGES_FOR_DELETED_CHANNEL:
      return Immutable.List();
    default:
      return prevState;
  }
};

export const messagesReducer = combineReducers({
  byId,
  allIds,
});

/**
 * Helper function which return message with changed rating and added user into users,
 *   who rated the message.
 *
 * @param ratingPolarity positive or negative
 * @param userId
 * @param originalMessage
 * @private
 */
function _changeMessageRating(ratingPolarity: RatingPolarity,
                              userId: Uuid,
                              originalMessage: IMessageAppMessage): IMessageAppMessage {
  const usersWhoRatedMessage = originalMessage.usersWhoRatedMessage;
  usersWhoRatedMessage[userId] = ratingPolarity;
  const rating = ratingPolarity === RatingPolarity.POSITIVE ?
                                    originalMessage.rating + 1 : originalMessage.rating - 1;
  return {...originalMessage, usersWhoRatedMessage, rating};
}
