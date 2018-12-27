import * as messageAppRepository from '../repository/messageAppRepository';
import axios, {AxiosPromise, AxiosRequestConfig} from 'axios';

const APP_ID = 'ace1cd27-4c7a-4ef3-b415-b753159fc7a4';
const BASE_URL = `https://pv247messaging.azurewebsites.net/api/v2/`;

/*************************************************
 * GETTING URLS
 ************************************************/
export function getBaseUrl(): string {
  return `${BASE_URL}${APP_ID}/`;
}

export function getBaseAppUrl(): string {
  return `${BASE_URL}app/${APP_ID}/`;
}

export function getUserUrl(): string {
  return `${getBaseUrl()}user`;
}

export function getChannelUrl(): string {
  return `${getBaseAppUrl()}channel`;
}

export function getMessageUrl(channelId: Uuid): string {
  return `${getChannelUrl()}/${channelId}/message`;
}

export function getFileUrl(): string {
  return `${BASE_URL}file`;
}

export function getFileLinkUrl(fileId: Uuid): string {
  return `${getFileUrl()}/${fileId}/download-link`;
}

/*************************************************
 * SENDING REQUESTS WITH AUTHENTICATION TOKEN
 ************************************************/
export function GET<T>(url: string): AxiosPromise<T> {
  return getConfigWithBearerToken()
    .then((config) => axios.get<T>(url, config));
}

export function POST<T>(url: string, data: any): AxiosPromise<T> {
  return getConfigWithBearerToken()
    .then((config) => axios.post<T>(url, data, config));
}

export function PUT<T>(url: string, data: any): AxiosPromise<T> {
  return getConfigWithBearerToken()
    .then((config) => axios.put<T>(url, data, config));
}

export function DELETE<T>(url: string): AxiosPromise<T> {
  return getConfigWithBearerToken()
    .then((config) => axios.delete(url, config));
}

/**
 * Get auth token for the app. If e-mail is set, it is used to make a request call.
 * Otherwise, e-mail of logged user is used.
 *
 * @param email e-mail which should be used for making the request, if not
 *   specified, e-mail of logged user is used
 */
export async function getAuthToken(email?: string): Promise<string | null> {
  const authToken = messageAppRepository.getAuthToken();
  if (authToken) {
    return authToken.token;
  }

  if (email == null) {
    const loggedUser = messageAppRepository.getLoggedUser();
    if (loggedUser == null) {
      throw Error('E-mail was not specified and no user is signed in');
    }
    email = loggedUser.email;
  }

  // it's necessary to get new token from server
  return axios.post<AuthToken>(`${BASE_URL}auth`, {email})
    .then((response) => {
      messageAppRepository.saveAuthToken(response.data);
      return response.data.token;
    })
    .catch(() => {
      return null;
    });
}

/**
 * Return config for axios requests. Add bearer token authentication to header.
 */
async function getConfigWithBearerToken(): Promise<AxiosRequestConfig> {
  const token = await getAuthToken();

  return {
    headers: {Authorization: 'bearer ' + token},
  };
}
