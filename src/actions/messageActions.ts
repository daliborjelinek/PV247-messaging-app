import * as Immutable from 'immutable';
import {
  MESSAGE_ADD_FINISHED,
  MESSAGE_ADD_STARTED,
  MESSAGE_DECREMENT_RATING,
  MESSAGE_DELETE_FINISHED,
  MESSAGE_DELETE_STARTED,
  MESSAGE_INCREMENT_RATING,
  MESSAGE_LOADING_FINISHED,
  MESSAGE_LOADING_STARTED
} from '../constants/actionTypes';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {Dispatch} from 'redux';
import {IMessageAppState} from '../models/IMessageAppState';
import {RatingPolarity} from '../enums/RatingPolarity';
import * as MessageService from '../service/messageService';

// LOADING MESSAGES
const messageLoadingStarted = (): Action<MESSAGE_LOADING_STARTED> => {
  return {
    type: MESSAGE_LOADING_STARTED,
  };
};

const messageLoadingFinished = (messages: Immutable.List<IMessageAppMessage>): Action<MESSAGE_LOADING_FINISHED> => {
  return {
    type: MESSAGE_LOADING_FINISHED,
    payload: {
      messages,
    }
  };
};

export const loadMessagesForChannel = (channelId: Uuid): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(messageLoadingStarted());
    const messages = await MessageService.loadMessagesForChannel(channelId);
    dispatch(messageLoadingFinished(messages));
  };
};

// ADDING MESSAGE
const messageAddStarted = (): Action<MESSAGE_ADD_STARTED> => {
  return {
    type: MESSAGE_ADD_STARTED,
  };
};

const messageAddFinished = (message: IMessageAppMessage): Action<MESSAGE_ADD_FINISHED> => {
  return {
    type: MESSAGE_ADD_FINISHED,
    payload: {
      message,
    }
  };
};

export const addMessage = (text: string): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    dispatch(messageAddStarted());
    // user must be logged in to write message, that's why I can use exclamation mark
    const authorEmail = getState().loggedUser!.email;
    // if message editor is shown, current channel must be not null
    const channelId = getState().currentChannelId!;
    const newMessage = await  MessageService.createMessage(text, authorEmail, channelId);
    dispatch(messageAddFinished(newMessage));
  };
};

// DELETING MESSAGE
const messageDeleteStarted = (): Action<MESSAGE_DELETE_STARTED> => {
  return {
    type: MESSAGE_DELETE_STARTED,
  };
};

const messageDeleteFinished = (id: Uuid): Action<MESSAGE_DELETE_FINISHED> => {
  return {
    type: MESSAGE_DELETE_FINISHED,
    payload: {
      id,
    }
  };
};

export const deleteMessage = (id: Uuid): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    dispatch(messageDeleteStarted());
    const channelId = getState().currentChannelId!;
    await MessageService.deleteMessage(id, channelId);
    dispatch(messageDeleteFinished(id));
  };
};

// CHANGING RATING
export const messageIncrementRating = (id: Uuid, userId: Uuid): Action<MESSAGE_INCREMENT_RATING> => {
  return {
    type: MESSAGE_INCREMENT_RATING,
    payload: {
      id,
      userId,
    }
  };
};

export const incrementRating = (id: Uuid): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    const message = getState().messages.byId.get(id)!;
    const loggedUserEmail = getState().loggedUser!.email;
    const currentChannelId = getState().currentChannelId!;
    await MessageService.changeMessageRating(message, loggedUserEmail, currentChannelId, RatingPolarity.POSITIVE);
    dispatch(messageIncrementRating(id, getState().loggedUser!.email));
  };
};

export const messageDecrementRating = (id: Uuid, userId: Uuid): Action<MESSAGE_DECREMENT_RATING> => {
  return {
    type: MESSAGE_DECREMENT_RATING,
    payload: {
      id,
      userId,
    }
  };
};

export const decrementRating = (id: Uuid): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    const message = getState().messages.byId.get(id)!;
    const loggedUserEmail = getState().loggedUser!.email;
    const currentChannelId = getState().currentChannelId!;
    await MessageService.changeMessageRating(message, loggedUserEmail, currentChannelId, RatingPolarity.NEGATIVE);
    dispatch(messageDecrementRating(id, getState().loggedUser!.email));
  };
};
