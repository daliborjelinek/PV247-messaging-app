import {USER_PROFILE_SHOW_DIALOG, USER_PROFILE_HIDE_DIALOG, USER_PROFILE_UPDATE_STARTED, USER_PROFILE_UPDATE_FINISHED} from '../constants/actionTypes';
import {Dispatch} from 'redux';
import * as userService from '../service/userService';
import * as fileService from '../service/fileService';
import {IMessageAppState} from '../models/IMessageAppState';
import {saveLoggedUser} from '../repository/messageAppRepository';
import {IMessageAppUser} from '../models/IMessageAppUser';

export const showDialog = (): Action<USER_PROFILE_SHOW_DIALOG> => ({
    type: USER_PROFILE_SHOW_DIALOG,
});

export const hideDialog = (): Action<USER_PROFILE_HIDE_DIALOG> => ({
    type: USER_PROFILE_HIDE_DIALOG,
});

export const updateProfileStarted = (): Action<USER_PROFILE_UPDATE_STARTED> => ({
  type: USER_PROFILE_UPDATE_STARTED,
});

export const updateProfileFinished = (user: IMessageAppUser): Action<USER_PROFILE_UPDATE_FINISHED> => ({
  type: USER_PROFILE_UPDATE_FINISHED,
  payload: user,
});

export const updateProfile = (newUserName: string, picture: File): any => {
    return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
      dispatch(updateProfileStarted());
      const newUser = {
        ...getState().loggedUser!,
        userName: newUserName,
      };
      if (picture != null) {
        const fileResponse = await fileService.storeFileToServer(picture);
        const fileLinkResponse = await fileService.getStoredFileURL(fileResponse[0].id);
        newUser.picture = fileLinkResponse.fileUri;

      }
      saveLoggedUser(newUser);
      await userService.updateUser(newUser);
      dispatch(updateProfileFinished(newUser));
    };
};




