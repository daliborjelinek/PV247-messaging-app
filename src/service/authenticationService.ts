import axios from 'axios';
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
      return LOGIN_USER_ALREADY_REGISTERED as LOGIN_USER_ALREADY_REGISTERED;
    }
    // save user to local storage
    messageAppRepository.saveLoggedUser(registerResult);
    // return registered user
    return registerResult;
  }

  // existing e-mail - log in or register user - e-mail was probably used in another app
  let authenticationResult = await loadUser(credentials);
  if (authenticationResult === LOGIN_EMAIL_DOES_NOT_EXIST) {
    const registerUserResult = await registerUser(credentials);
    if (registerUserResult === LOGIN_USER_ALREADY_REGISTERED) {
      messageAppRepository.removeAuthToken();
      return LOGIN_USER_ALREADY_REGISTERED;
    }
    authenticationResult = registerUserResult;
  }

  // bad password
  if (!checkPassword(credentials, authenticationResult.password)) {
    messageAppRepository.removeAuthToken();
    return LOGIN_BAD_PASSWORD as LOGIN_BAD_PASSWORD;
  }

  const {password, ...user} = authenticationResult;
  messageAppRepository.saveLoggedUser(user);
  // return logged user
  return user;
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
      return {email: response.data.email, ...userData};
    })
    .catch(() => LOGIN_EMAIL_DOES_NOT_EXIST as LOGIN_EMAIL_DOES_NOT_EXIST);
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
async function registerUser(credentials: Credentials): Promise<IMessageAppUserWithPassword | LOGIN_USER_ALREADY_REGISTERED> {
  return axios.post<ServerResponseUser>(getUserUrl(), {
    email: credentials.email,
    customData: {password: credentials.password}
  })
    .then((response) => {
      return {
        email: response.data.email,
        password: response.data.customData.password,
      };
    })
    .catch(() => LOGIN_USER_ALREADY_REGISTERED as LOGIN_USER_ALREADY_REGISTERED);
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
