import * as Immutable from 'immutable';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {MESSAGE_APP_USERS_ACTIONS} from '../constants/actionTypes';
import {combineReducers} from 'redux';

const byId = (prevState = Immutable.Map<Uuid, IMessageAppUser>(),
              action: Action<MESSAGE_APP_USERS_ACTIONS>): Immutable.Map<Uuid, IMessageAppUser> => {
  switch (action.type) {
    case 'MESSAGE_APP_LOADING_FINISHED':
      return Immutable.Map(action.payload.users.map((user: IMessageAppUser) => [user.id, user]));
    default:
      return prevState;
  }
};

const allIds = (prevState = Immutable.List<Uuid>(),
                action: Action<MESSAGE_APP_USERS_ACTIONS>): Immutable.List<Uuid> => {
  switch (action.type) {
    case 'MESSAGE_APP_LOADING_FINISHED':
      return Immutable.List(action.payload.users.map((user: IMessageAppUser) => user.id));
    default:
      return prevState;
  }
};

export const usersReducer = combineReducers({
  byId,
  allIds,
});