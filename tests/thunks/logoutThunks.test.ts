import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as AuthenticationService from '../../src/service/authenticationService';
import {MESSAGE_APP_LOG_OUT} from '../../src/constants/actionTypes';
import {logout} from '../../src/actions/logoutActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test('Log out', () => {
  // @ts-ignore
  AuthenticationService.logOut = jest.fn();

  const store = mockStore({});

  const expectedActions = [
    { type: MESSAGE_APP_LOG_OUT },
  ];

  return store.dispatch(logout()).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});
