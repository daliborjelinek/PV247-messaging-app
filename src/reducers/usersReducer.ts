import * as Immutable from 'immutable';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {
  MESSAGE_APP_LOADING_FINISHED,
  MESSAGE_APP_USERS_ACTIONS, USER_PROFILE_UPDATE_FINISHED,
} from '../constants/actionTypes';
import {combineReducers} from 'redux';

const byEmail = (prevState = Immutable.Map<Uuid, IMessageAppUser>(),
                 action: Action<MESSAGE_APP_USERS_ACTIONS | USER_PROFILE_UPDATE_FINISHED>): Immutable.Map<Uuid, IMessageAppUser> => {
  switch (action.type) {
    case MESSAGE_APP_LOADING_FINISHED:
      return Immutable.Map(action.payload.users.map((user: IMessageAppUser) => [user.email, user]));
    case USER_PROFILE_UPDATE_FINISHED: {
      return prevState.set(action.payload.email, action.payload);
    }
    default:
      return prevState;
  }
};

const allEmails = (prevState = Immutable.List<Uuid>(),
                   action: Action<MESSAGE_APP_USERS_ACTIONS>): Immutable.List<Uuid> => {
  switch (action.type) {
    case MESSAGE_APP_LOADING_FINISHED:
      return Immutable.List(action.payload.users.map((user: IMessageAppUser) => user.email));
    default:
      return prevState;
  }
};

export const usersReducer = combineReducers({
  byEmail,
  allEmails,
});
