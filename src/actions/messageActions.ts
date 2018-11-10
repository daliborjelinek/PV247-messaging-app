import * as Immutable from 'immutable';
import {MESSAGE_LOADING_FINISHED, MESSAGE_LOADING_STARTED} from '../constants/actionTypes';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {Dispatch} from 'redux';
import * as MessageAppRepository from '../repository/messageAppRepository';


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
