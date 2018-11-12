import * as Immutable from 'immutable';
import {MESSAGE_ADD_FINISHED, MESSAGE_ADD_STARTED, MESSAGE_DELETE_FINISHED, MESSAGE_DELETE_STARTED, MESSAGE_LOADING_FINISHED, MESSAGE_LOADING_STARTED} from '../constants/actionTypes';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {Dispatch} from 'redux';
import * as MessageAppRepository from '../repository/messageAppRepository';
import {IMessageAppState} from '../models/IMessageAppState';

// LOADING MESSAGES
const messageLoadingStarted = (): Action<MESSAGE_LOADING_STARTED> => {
  return {
    type: 'MESSAGE_LOADING_STARTED',
  };
};

const messageLoadingFinished = (messages: Immutable.List<IMessageAppMessage>): Action<MESSAGE_LOADING_FINISHED> => {
  return {
    type: 'MESSAGE_LOADING_FINISHED',
    payload: {
      messages,
    }
  };
};

export const loadMessagesForChannel = (channelId: Uuid): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(messageLoadingStarted());
    const messages = await MessageAppRepository.loadMessagesForChannel(channelId);
    dispatch(messageLoadingFinished(messages));
  };
};

// ADDING MESSAGE
const messageAddStarted = (): Action<MESSAGE_ADD_STARTED> => {
  return {
    type: 'MESSAGE_ADD_STARTED',
  };
};

const messageAddFinished = (message: IMessageAppMessage): Action<MESSAGE_ADD_FINISHED> => {
  return {
    type: 'MESSAGE_ADD_FINISHED',
    payload: {
      message,
    }
  };
};

export const addMessage = (text: string): any => {
  return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
    dispatch(messageAddStarted());
    // user must be logged in to write message, that's why I can use exclamation mark
    const authorId = getState().loggedUser!.id;
    // if message editor is shown, current channel must be not null
    const channelId = getState().currentChannelId!;
    const newMessage = await MessageAppRepository.addMessage(text, authorId, channelId);
    dispatch(messageAddFinished(newMessage));
  };
};

// DELETING MESSAGE

const messageDeleteStarted = (): Action<MESSAGE_DELETE_STARTED> => {
  return {
    type: 'MESSAGE_DELETE_STARTED',
  };
};

const messageDeleteFinished = (id: Uuid): Action<MESSAGE_DELETE_FINISHED> => {
  return {
    type: 'MESSAGE_DELETE_FINISHED',
    payload: {
      id,
    }
  };
};

export const deleteMessage = (id: Uuid): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(messageDeleteStarted());
    await MessageAppRepository.deleteMessage(id);
    dispatch(messageDeleteFinished(id));
  };
};
