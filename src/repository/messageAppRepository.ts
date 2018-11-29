import {IMessageAppUser} from '../models/IMessageAppUser';

const LOCAL_STORAGE_AUTH_TOKEN_KEY = 'AUTH_TOKEN';
const LOCAL_STORAGE_LOGGED_USER_KEY = 'LOGGED_uSER';

/*************************************************
 * AUTHENTICATION
 ************************************************/
/**
 * Returns auth token from LocalStorage or null, when Token is not in LocalStorage, is expired
 *    or will expire in the next minute.
 */
export function getAuthToken(): null | AuthToken {
  const authTokenStr = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
  if (authTokenStr == null) {
    return null;
  }

  const authToken: AuthToken = JSON.parse(authTokenStr);
  const millisecondsToMinutes = 60000;
  const dateNextMinute = new Date(new Date().getTime() + millisecondsToMinutes);
  // return null when expired or when it will expire in the next minute
  if (authToken.expiration < dateNextMinute) {
    return null;
  }

  return authToken;
}

/**
 * Saves authentication token into the local storage.
 * @param token authentication token
 */
export function saveAuthToken(token: AuthToken): void {
  localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, JSON.stringify(token));
}

/**
 * Remove auth token from local storage. Used when user is logged out.
 */
export function removeAuthToken(): void {
  localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
}

/**
 * Returns logged user.
 */
export function getLoggedUser(): IMessageAppUser | null {
  const loggedUser = localStorage.getItem(LOCAL_STORAGE_LOGGED_USER_KEY);
  return loggedUser == null ? null : JSON.parse(loggedUser);
}

/**
 * Saves logged user into local storage. It allows auto log in functionality.
 * @param user logged user
 */
export function saveLoggedUser(user: IMessageAppUser): void {
  localStorage.setItem(LOCAL_STORAGE_LOGGED_USER_KEY, JSON.stringify(user));
}

/**
 * Us for log out.
 */
export function removeLoggedUser() {
  localStorage.removeItem(LOCAL_STORAGE_LOGGED_USER_KEY);
}

/*************************************************
 * CHANNEL
 ************************************************/
const LAST_ACTIVE_CHANNEL_ID_KEY = 'LAST_ACTIVE_CHANNEL_ID';

/**
 * Returns last active channel id. Can return null if no channel has been ever used
 *   or someone deleted data from local storage.
 */
export function getLastActiveChannelId(): Uuid | null {
  return localStorage.getItem(LAST_ACTIVE_CHANNEL_ID_KEY);
}
