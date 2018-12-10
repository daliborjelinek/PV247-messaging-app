import {USER_PROFILE_SHOW_DIALOG, USER_PROFILE_HIDE_DIALOG, USER_PROFILE_UPDATE_STARTED} from '../constants/actionTypes';
import {Dispatch} from 'redux';
import * as userService from '../service/userService';
import {IMessageAppState} from '../models/IMessageAppState';


export const showDialog = (): Action<USER_PROFILE_SHOW_DIALOG> => ({
    type: USER_PROFILE_SHOW_DIALOG,
});

export const hideDialog = (): Action<USER_PROFILE_HIDE_DIALOG> => ({
    type: USER_PROFILE_HIDE_DIALOG,
});

export const updateProfileStarted = (): Action<USER_PROFILE_UPDATE_STARTED> => ({
  type: USER_PROFILE_UPDATE_STARTED,
});

export const updateProfile = (userName: string, picture: string): any => {
    return async (dispatch: Dispatch, getState: () => IMessageAppState): Promise<void> => {
      dispatch(updateProfileStarted());
      await userService.updateUser(getState().loggedUser!.email, userName, picture);
    };
};




