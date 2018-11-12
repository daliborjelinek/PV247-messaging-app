// LOG IN
export const MESSAGE_APP_LOGGING_STARTED = 'MESSAGE_APP_LOGGING_STARTED';
export type MESSAGE_APP_LOGGING_STARTED = 'MESSAGE_APP_LOGGING_STARTED';
export const MESSAGE_APP_LOGGING_FAILED = 'MESSAGE_APP_LOGGING_FAILED';
export type MESSAGE_APP_LOGGING_FAILED = 'MESSAGE_APP_LOGGING_FAILED';
export const MESSAGE_APP_LOGGING_SUCCESS = 'MESSAGE_APP_LOGGING_SUCCESS';
export type MESSAGE_APP_LOGGING_SUCCESS = 'MESSAGE_APP_LOGGING_SUCCESS';
export const MESSAGE_APP_LOGGING_AUTO_STARTED = 'MESSAGE_APP_LOGGING_AUTO_STARTED';
export type MESSAGE_APP_LOGGING_AUTO_STARTED = 'MESSAGE_APP_LOGGING_AUTO_STARTED';
export const MESSAGE_APP_LOGGING_AUTO_SUCCESS = 'MESSAGE_APP_LOGGING_AUTO_SUCCESS';
export type MESSAGE_APP_LOGGING_AUTO_SUCCESS = 'MESSAGE_APP_LOGGING_AUTO_SUCCESS';
export const MESSAGE_APP_LOGGING_AUTO_FAILED = 'MESSAGE_APP_LOGGING_AUTO_FAILED';
export type MESSAGE_APP_LOGGING_AUTO_FAILED = 'MESSAGE_APP_LOGGING_AUTO_FAILED';

// LOG OUT
export const MESSAGE_APP_LOG_OUT = 'MESSAGE_APP_LOG_OUT';
export type MESSAGE_APP_LOG_OUT = 'MESSAGE_APP_LOG_OUT';

export type LOGGING_ACTIONS = MESSAGE_APP_LOGGING_STARTED | MESSAGE_APP_LOGGING_FAILED |
  MESSAGE_APP_LOGGING_SUCCESS | MESSAGE_APP_LOG_OUT | MESSAGE_APP_LOGGING_AUTO_STARTED |
  MESSAGE_APP_LOGGING_AUTO_SUCCESS | MESSAGE_APP_LOGGING_AUTO_FAILED;

// LOADING
export const MESSAGE_APP_LOADING_STARTED = 'MESSAGE_APP_LOADING_STARTED';
export type MESSAGE_APP_LOADING_STARTED = 'MESSAGE_APP_LOADING_STARTED';
export const MESSAGE_APP_LOADING_FINISHED = 'MESSAGE_APP_LOADING_FINISHED';
export type MESSAGE_APP_LOADING_FINISHED = 'MESSAGE_APP_LOADING_FINISHED';

// CHANNELS
export const CURRENT_CHANNEL_CHANGE_STARTED = 'CURRENT_CHANNEL_CHANGE_STARTED';
export type CURRENT_CHANNEL_CHANGE_STARTED = 'CURRENT_CHANNEL_CHANGE_STARTED';
export const CURRENT_CHANNEL_CHANGE_FINISHED = 'CURRENT_CHANNEL_CHANGE_FINISHED';
export type CURRENT_CHANNEL_CHANGE_FINISHED = 'CURRENT_CHANNEL_CHANGE_FINISHED';
export const CHANNEL_ADD_STARTED = 'CHANNEL_ADD_STARTED';
export type CHANNEL_ADD_STARTED = 'CHANNEL_ADD_STARTED';
export const CHANNEL_ADD_FAILED = 'CHANNEL_ADD_FAILED';
export type CHANNEL_ADD_FAILED = 'CHANNEL_ADD_FAILED';
export const CHANNEL_ADD_FINISHED = 'CHANNEL_ADD_FINISHED';
export type CHANNEL_ADD_FINISHED = 'CHANNEL_ADD_FINISHED';
export const CHANNEL_RENAME_STARTED = 'CHANNEL_RENAME_STARTED';
export type CHANNEL_RENAME_STARTED = 'CHANNEL_RENAME_STARTED';
export const CHANNEL_RENAME_FINISHED = 'CHANNEL_RENAME_FINISHED';
export type CHANNEL_RENAME_FINISHED = 'CHANNEL_RENAME_FINISHED';
export const CHANNEL_DELETE_STARTED = 'CHANNEL_DELETE_STARTED';
export type CHANNEL_DELETE_STARTED = 'CHANNEL_DELETE_STARTED';
export const CHANNEL_DELETE_FINISHED = 'CHANNEL_DELETE_FINISHED';
export type CHANNEL_DELETE_FINISHED = 'CHANNEL_DELETE_FINISHED';

// TODO create action types for creating, deleting, editing channels,...
export type MESSAGE_APP_CHANNELS_ACTIONS = MESSAGE_APP_LOADING_FINISHED | CURRENT_CHANNEL_CHANGE_STARTED |
  CURRENT_CHANNEL_CHANGE_FINISHED | CHANNEL_ADD_STARTED | CHANNEL_ADD_FINISHED | CHANNEL_ADD_FAILED |
  CHANNEL_RENAME_STARTED | CHANNEL_RENAME_FINISHED | CHANNEL_DELETE_STARTED | CHANNEL_DELETE_FINISHED;

// MESSAGES
// TODO create action types for creating, deleting, editing messages,...
export const MESSAGE_LOADING_STARTED = 'MESSAGE_LOADING_STARTED';
export type MESSAGE_LOADING_STARTED = 'MESSAGE_LOADING_STARTED';
export const MESSAGE_LOADING_FINISHED = 'MESSAGE_LOADING_FINISHED';
export type MESSAGE_LOADING_FINISHED = 'MESSAGE_LOADING_FINISHED';
export const MESSAGE_ADD_STARTED = 'MESSAGE_ADD_STARTED';
export type MESSAGE_ADD_STARTED = 'MESSAGE_ADD_STARTED';
export const MESSAGE_ADD_FINISHED = 'MESSAGE_ADD_FINISHED';
export type MESSAGE_ADD_FINISHED = 'MESSAGE_ADD_FINISHED';
export const MESSAGE_DELETE_STARTED = 'MESSAGE_DELETE_STARTED';
export type MESSAGE_DELETE_STARTED = 'MESSAGE_DELETE_STARTED';
export const MESSAGE_DELETE_FINISHED = 'MESSAGE_DELETE_FINISHED';
export type MESSAGE_DELETE_FINISHED = 'MESSAGE_DELETE_FINISHED';


export type MESSAGE_APP_MESSAGES_ACTIONS = MESSAGE_APP_LOADING_FINISHED | CURRENT_CHANNEL_CHANGE_FINISHED |
  MESSAGE_LOADING_STARTED | MESSAGE_LOADING_FINISHED | MESSAGE_ADD_STARTED | MESSAGE_ADD_FINISHED |
  MESSAGE_DELETE_STARTED | MESSAGE_DELETE_FINISHED;

// USERS
export type MESSAGE_APP_USERS_ACTIONS = MESSAGE_APP_LOADING_FINISHED;

// USER PROFILE
export const USER_PROFILE_SHOW_DIALOG = 'USER_PROFILE_SHOW_DIALOG';
export type USER_PROFILE_SHOW_DIALOG = 'USER_PROFILE_SHOW_DIALOG';
export const USER_PROFILE_HIDE_DIALOG = 'USER_PROFILE_HIDE_DIALOG';
export type USER_PROFILE_HIDE_DIALOG = 'USER_PROFILE_HIDE_DIALOG';



