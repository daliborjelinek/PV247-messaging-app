import * as Immutable from 'immutable';
import {GET, PUT, getUserUrl} from '../utils/requestUtils';
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
  // const picture = getPictureUrl(serverResponseUser.customData.picture);

  return {
    email: serverResponseUser.email,
    userName: serverResponseUser.customData.userName,
    picture: serverResponseUser.customData.picture,
    password: serverResponseUser.customData.password
  };
}




export async function updateUser(user: IMessageAppUser): Promise<IMessageAppUser> {

    const response = await PUT<any>(getUserUrl() + '/' + user.email, {customData: user});
    console.log(response.data);
    return response.data;
}
