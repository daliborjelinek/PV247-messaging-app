import * as messageAppRepository from '../repository/messageAppRepository';
import axios from 'axios';

const APP_ID = 'e1579836-9997-4a22-833a-5120a43f42b6';
const BASE_URL = `https://pv247messaging.azurewebsites.net/api/v2/`;


export function getBaseUrl(): string {
  return `${BASE_URL}${APP_ID}/`;
}

export function getBaseAppUrl(): string {
  return `${BASE_URL}app/${APP_ID}/`;
}

export function getUserUrl(): string {
  return `${getBaseUrl()}user`;
}

export function getAuthToken(email: string): Promise<string | null> {
  const authToken = messageAppRepository.getAuthToken();
  if (authToken) {
    return Promise.resolve(authToken.token);
  }

  // it's necessary to get new token from server
  return axios.post<AuthToken>(`${BASE_URL}auth`, {email})
    .then((response) => {
      messageAppRepository.saveAuthToken(response.data);
      return Promise.resolve(response.data.token);
    })
    .catch(() => {
      return Promise.resolve(null);
    });
}
