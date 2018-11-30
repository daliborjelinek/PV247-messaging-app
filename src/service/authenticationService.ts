import axios from 'axios';
import * as uuid from 'uuid';
import {getUserUrl, getAuthToken, GET} from '../utils/requestUtils';
import {IMessageAppUser, IMessageAppUserWithPassword} from '../models/IMessageAppUser';
import {LOGIN_BAD_PASSWORD, LOGIN_EMAIL_DOES_NOT_EXIST, LOGIN_ERROR, LOGIN_USER_ALREADY_REGISTERED} from '../constants/errors';
import * as messageAppRepository from '../repository/messageAppRepository';
import {ServerResponseUser} from '../@types/api';

/**
 * Authenticates user. If user is not registered, he will be registered.
 * If user already exist, he will be logged in.
 *
 * @param credentials user credentials
 */
export async function authenticate(credentials: Credentials): Promise<IMessageAppUser | LOGIN_ERROR> {
  const authToken = await getAuthToken(credentials.email);

  // non-existing e-mail -> register new user
  if (authToken == null) {
    const registerResult = await registerUser(credentials);

    if (registerResult === LOGIN_USER_ALREADY_REGISTERED) {
      messageAppRepository.removeAuthToken();
      return Promise.resolve(LOGIN_USER_ALREADY_REGISTERED as LOGIN_USER_ALREADY_REGISTERED);
    }
    // save user to local storage
    messageAppRepository.saveLoggedUser(registerResult);
    // return registered user
    return Promise.resolve(registerResult);
  }

  // existing e-mail - log in
  const loadResult = await loadUser(credentials);
  if (loadResult === LOGIN_EMAIL_DOES_NOT_EXIST) {
    messageAppRepository.removeAuthToken();
    return Promise.resolve(LOGIN_EMAIL_DOES_NOT_EXIST as LOGIN_EMAIL_DOES_NOT_EXIST);
  }

  // bad password
  if (!checkPassword(credentials, loadResult.password)) {
    messageAppRepository.removeAuthToken();
    return Promise.resolve(LOGIN_BAD_PASSWORD as LOGIN_BAD_PASSWORD);
  }

  const {password, ...user} = loadResult;
  messageAppRepository.saveLoggedUser(user);
  // return logged user
  return Promise.resolve(user);
}

/**
 * Try to load existing user from server.
 *
 * @param credentials data from login form
 */
async function loadUser(credentials: Credentials): Promise<IMessageAppUserWithPassword | LOGIN_EMAIL_DOES_NOT_EXIST> {
  const url = `${getUserUrl()}/${credentials.email}`;
  return GET<ServerResponseUser>(url)
    .then((response) => {
      const userData = response.data.customData;
      return Promise.resolve({email: response.data.email, ...userData});
    })
    .catch(() => Promise.resolve(LOGIN_EMAIL_DOES_NOT_EXIST as LOGIN_EMAIL_DOES_NOT_EXIST));
}

/**
 * Checks if password is correct.
 *
 * @param credentials data from login form
 * @param correctPassword correct password
 */
function checkPassword(credentials: Credentials, correctPassword: string): boolean {
  return credentials.password === correctPassword;
}

/**
 * Registers new user with selected e-mail and password.
 *
 * @param credentials data from login form
 */
async function registerUser(credentials: Credentials): Promise<IMessageAppUser | LOGIN_USER_ALREADY_REGISTERED> {
  const id = uuid();
  return axios.post<ServerResponseUser>(getUserUrl(), {
    email: credentials.email,
    customData: {id, password: credentials.password}
  })
    .then((response) => {
      return Promise.resolve({
        id: response.data.customData.id,
        email: response.data.email,
        password: response.data.customData.password,
      });
    })
    .catch(() => Promise.resolve(LOGIN_USER_ALREADY_REGISTERED as LOGIN_USER_ALREADY_REGISTERED));
}

/**
 * Returns logged user if the data about active user are stored in local storage.
 * This allows automatic log in.
 */
export function getLoggedUser(): IMessageAppUser | null {
  return messageAppRepository.getLoggedUser();
}

/**
 * Removes data about logged user from the local storage.
 */
export function logOut(): void {
  messageAppRepository.removeLoggedUser();
  messageAppRepository.removeAuthToken();
}
