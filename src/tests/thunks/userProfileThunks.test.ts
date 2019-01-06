import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as UserService from '../../service/userService';
import {USER_PROFILE_UPDATE_FINISHED, USER_PROFILE_UPDATE_STARTED} from '../../constants/actionTypes';
import {IMessageAppUser} from '../../models/IMessageAppUser';
import {updateProfile} from '../../actions/userProfileActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const user: IMessageAppUser = {email: 'anon@anon.cz', picture: 'blank', userName: 'anon', password: 'anon'};
const updatedUser: IMessageAppUser = {email: 'anon@anon.cz', picture: 'blank', userName: 'josef', password: 'anon'};

test('Update profile info', () => {
  // @ts-ignore
  UserService.updateUser = jest.fn(() => (Promise.resolve(user)));

  const store = mockStore({loggedUser: user});

  const expectedActions = [
    { type: USER_PROFILE_UPDATE_STARTED },
    { type: USER_PROFILE_UPDATE_FINISHED, payload: updatedUser }
  ];

  return store.dispatch(updateProfile('josef', null)).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});
