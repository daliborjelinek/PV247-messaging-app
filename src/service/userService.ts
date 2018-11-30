import * as Immutable from 'immutable';
import {GET, getUserUrl} from '../utils/requestUtils';
import {ServerResponseUser} from '../@types/api';
import {IMessageAppUser} from '../models/IMessageAppUser';


/**
 * Load all users and transform them to the Immutable List.
 */
export async function loadUsers(): Promise<Immutable.List<IMessageAppUser>> {
  const response = await GET<ServerResponseUser[]>(getUserUrl());
  return mapToUsersMap(response.data);
}

// PRIVATE FUNCTION - MAPPING BETWEEN SERVER RESPONSE AND MESSAGE APP MODEL
function mapToUsersMap(serverResponseUsers: ServerResponseUser[]): Immutable.List<IMessageAppUser> {
  if (serverResponseUsers == null || serverResponseUsers.length === 0) {
    return Immutable.List();
  }

  return Immutable.List(serverResponseUsers.map((user) => mapToUser(user)));
}

function mapToUser(serverResponseUser: ServerResponseUser): IMessageAppUser {
  const userName = serverResponseUser.customData.userName == null ? serverResponseUser.email :
    serverResponseUser.customData.userName;
  const name = serverResponseUser.customData.name == null ? userName :
    serverResponseUser.customData.userName;
  const pictureUrl = getPictureUrl(serverResponseUser.customData.picture);
  return {
    email: serverResponseUser.email,
    userName,
    name,
    pictureUrl,
  };
}

function getPictureUrl(picture: any): string {
  if (picture == null) {
    return 'https://image.freepik.com/free-icon/male-user-shadow_318-34042.jpg';
  }

  // TODO return real picture
  return 'https://image.freepik.com/free-icon/male-user-shadow_318-34042.jpg';
}
