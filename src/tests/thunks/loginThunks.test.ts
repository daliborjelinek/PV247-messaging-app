import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {IMessageAppUser} from '../../models/IMessageAppUser';
import * as AuthenticationService from '../../service/authenticationService';
import {MESSAGE_APP_LOGGING_AUTO_FAILED, MESSAGE_APP_LOGGING_AUTO_STARTED, MESSAGE_APP_LOGGING_AUTO_SUCCESS, MESSAGE_APP_LOGGING_FAILED, MESSAGE_APP_LOGGING_STARTED, MESSAGE_APP_LOGGING_SUCCESS} from '../../constants/actionTypes';
import {autoLogin, logIn} from '../../actions/loginActions';
import {LOGIN_BAD_PASSWORD, LOGIN_EMAIL_DOES_NOT_EXIST, LOGIN_USER_ALREADY_REGISTERED} from '../../constants/errors';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const user: IMessageAppUser = {email: 'anon@anon.cz', picture: 'blank', userName: 'anon', password: 'anon'};

test('Log in successfully', () => {
  // @ts-ignore
  AuthenticationService.authenticate = jest.fn(() => (Promise.resolve(user)));

  const store = mockStore({});

  const expectedActions = [
    { type: MESSAGE_APP_LOGGING_STARTED },
    { type: MESSAGE_APP_LOGGING_SUCCESS, payload: {loggedUser: user} },
  ];

  return store.dispatch(logIn('anon@anon.cz', 'anon')).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Log in failed - user already registered', () => {
  // @ts-ignore
  AuthenticationService.authenticate = jest.fn(() => (Promise.resolve(LOGIN_USER_ALREADY_REGISTERED)));

  const store = mockStore({});

  const expectedActions = [
    { type: MESSAGE_APP_LOGGING_STARTED },
    { type: MESSAGE_APP_LOGGING_FAILED, payload: {error: LOGIN_USER_ALREADY_REGISTERED} },
  ];

  return store.dispatch(logIn('anon@anon.cz', 'anon')).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Log in failed - bad password', () => {
  // @ts-ignore
  AuthenticationService.authenticate = jest.fn(() => (Promise.resolve(LOGIN_BAD_PASSWORD)));

  const store = mockStore({});

  const expectedActions = [
    { type: MESSAGE_APP_LOGGING_STARTED },
    { type: MESSAGE_APP_LOGGING_FAILED, payload: {error: LOGIN_BAD_PASSWORD} },
  ];

  return store.dispatch(logIn('anon@anon.cz', 'anon')).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Log in failed - unknown e-mail', () => {
  // @ts-ignore
  AuthenticationService.authenticate = jest.fn(() => (Promise.resolve(LOGIN_EMAIL_DOES_NOT_EXIST)));

  const store = mockStore({});

  const expectedActions = [
    { type: MESSAGE_APP_LOGGING_STARTED },
    { type: MESSAGE_APP_LOGGING_FAILED, payload: {error: LOGIN_EMAIL_DOES_NOT_EXIST} },
  ];

  return store.dispatch(logIn('anon@anon.cz', 'anon')).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Automatic log in - success', () => {
  // @ts-ignore
  AuthenticationService.getLoggedUser = jest.fn(() => (user));

  const store = mockStore({});

  const expectedActions = [
    { type: MESSAGE_APP_LOGGING_AUTO_STARTED },
    { type: MESSAGE_APP_LOGGING_AUTO_SUCCESS, payload: {loggedUser: user} },
  ];

  return store.dispatch(autoLogin()).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Automatic log in - failed', () => {
  // @ts-ignore
  AuthenticationService.getLoggedUser = jest.fn(() => (null));

  const store = mockStore({});

  const expectedActions = [
    { type: MESSAGE_APP_LOGGING_AUTO_STARTED },
    { type: MESSAGE_APP_LOGGING_AUTO_FAILED },
  ];

  return store.dispatch(autoLogin()).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});
