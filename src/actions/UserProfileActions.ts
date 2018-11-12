import {USER_PROFILE_SHOW_DIALOG, USER_PROFILE_HIDE_DIALOG} from '../constants/actionTypes';

export const showDialog = (): Action<USER_PROFILE_SHOW_DIALOG> => {
  return{
    type: 'USER_PROFILE_SHOW_DIALOG',
  };
};

export const hideDialog = (): Action<USER_PROFILE_HIDE_DIALOG> => {
  return{
    type: 'USER_PROFILE_HIDE_DIALOG',
  };
};




