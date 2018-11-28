// LOG IN
export const MESSAGE_APP_LOGGING_STARTED = 'MESSAGE_APP_LOGGING_STARTED';
export type MESSAGE_APP_LOGGING_STARTED = typeof MESSAGE_APP_LOGGING_STARTED;
export const MESSAGE_APP_LOGGING_FAILED = 'MESSAGE_APP_LOGGING_FAILED';
export type MESSAGE_APP_LOGGING_FAILED = typeof MESSAGE_APP_LOGGING_FAILED;
export const MESSAGE_APP_LOGGING_SUCCESS = 'MESSAGE_APP_LOGGING_SUCCESS';
export type MESSAGE_APP_LOGGING_SUCCESS = typeof MESSAGE_APP_LOGGING_SUCCESS;
export const MESSAGE_APP_LOGGING_AUTO_STARTED = 'MESSAGE_APP_LOGGING_AUTO_STARTED';
export type MESSAGE_APP_LOGGING_AUTO_STARTED = typeof MESSAGE_APP_LOGGING_AUTO_STARTED;
export const MESSAGE_APP_LOGGING_AUTO_SUCCESS = 'MESSAGE_APP_LOGGING_AUTO_SUCCESS';
export type MESSAGE_APP_LOGGING_AUTO_SUCCESS = typeof MESSAGE_APP_LOGGING_AUTO_SUCCESS;
export const MESSAGE_APP_LOGGING_AUTO_FAILED = 'MESSAGE_APP_LOGGING_AUTO_FAILED';
export type MESSAGE_APP_LOGGING_AUTO_FAILED = typeof MESSAGE_APP_LOGGING_AUTO_FAILED;

// LOG OUT
export const MESSAGE_APP_LOG_OUT = 'MESSAGE_APP_LOG_OUT';
export type MESSAGE_APP_LOG_OUT = typeof MESSAGE_APP_LOG_OUT;

export type LOGGING_ACTIONS = MESSAGE_APP_LOGGING_STARTED | MESSAGE_APP_LOGGING_FAILED |
  MESSAGE_APP_LOGGING_SUCCESS | MESSAGE_APP_LOG_OUT | MESSAGE_APP_LOGGING_AUTO_STARTED |
  MESSAGE_APP_LOGGING_AUTO_SUCCESS | MESSAGE_APP_LOGGING_AUTO_FAILED;

// LOADING
export const MESSAGE_APP_LOADING_STARTED = 'MESSAGE_APP_LOADING_STARTED';
export type MESSAGE_APP_LOADING_STARTED = typeof MESSAGE_APP_LOADING_STARTED;
export const MESSAGE_APP_LOADING_FINISHED = 'MESSAGE_APP_LOADING_FINISHED';
export type MESSAGE_APP_LOADING_FINISHED = typeof MESSAGE_APP_LOADING_FINISHED;

// CHANNELS
export const CURRENT_CHANNEL_CHANGE_STARTED = 'CURRENT_CHANNEL_CHANGE_STARTED';
export type CURRENT_CHANNEL_CHANGE_STARTED = typeof CURRENT_CHANNEL_CHANGE_STARTED;
export const CURRENT_CHANNEL_CHANGE_FINISHED = 'CURRENT_CHANNEL_CHANGE_FINISHED';
export type CURRENT_CHANNEL_CHANGE_FINISHED = typeof CURRENT_CHANNEL_CHANGE_FINISHED;
export const CHANNEL_ADD_STARTED = 'CHANNEL_ADD_STARTED';
export type CHANNEL_ADD_STARTED = typeof CHANNEL_ADD_STARTED;
export const CHANNEL_ADD_FAILED = 'CHANNEL_ADD_FAILED';
export type CHANNEL_ADD_FAILED = typeof CHANNEL_ADD_FAILED;
export const CHANNEL_ADD_FINISHED = 'CHANNEL_ADD_FINISHED';
export type CHANNEL_ADD_FINISHED = typeof CHANNEL_ADD_FINISHED;
export const CHANNEL_RENAME_STARTED = 'CHANNEL_RENAME_STARTED';
export type CHANNEL_RENAME_STARTED = typeof CHANNEL_RENAME_STARTED;
export const CHANNEL_RENAME_FINISHED = 'CHANNEL_RENAME_FINISHED';
export type CHANNEL_RENAME_FINISHED = typeof CHANNEL_RENAME_FINISHED;
export const CHANNEL_DELETE_STARTED = 'CHANNEL_DELETE_STARTED';
export type CHANNEL_DELETE_STARTED = typeof CHANNEL_DELETE_STARTED;
export const CHANNEL_DELETE_FINISHED = 'CHANNEL_DELETE_FINISHED';
export type CHANNEL_DELETE_FINISHED = typeof CHANNEL_DELETE_FINISHED;
export const EDITING_CHANNEL_NAME_MODE_STARTED = 'EDITING_CHANNEL_NAME_MODE_STARTED';
export type EDITING_CHANNEL_NAME_MODE_STARTED = typeof EDITING_CHANNEL_NAME_MODE_STARTED;
export const EDITING_CHANNEL_NAME_MODE_FINISHED = 'EDITING_CHANNEL_NAME_MODE_FINISHED';
export type EDITING_CHANNEL_NAME_MODE_FINISHED = typeof EDITING_CHANNEL_NAME_MODE_FINISHED;

export type MESSAGE_APP_CHANNELS_ACTIONS = MESSAGE_APP_LOADING_FINISHED | CURRENT_CHANNEL_CHANGE_STARTED |
  CURRENT_CHANNEL_CHANGE_FINISHED | CHANNEL_ADD_STARTED | CHANNEL_ADD_FINISHED | CHANNEL_ADD_FAILED |
  CHANNEL_RENAME_STARTED | CHANNEL_RENAME_FINISHED | CHANNEL_DELETE_STARTED | CHANNEL_DELETE_FINISHED |
  EDITING_CHANNEL_NAME_MODE_STARTED | EDITING_CHANNEL_NAME_MODE_FINISHED;

// MESSAGES
export const MESSAGE_LOADING_STARTED = 'MESSAGE_LOADING_STARTED';
export type MESSAGE_LOADING_STARTED = typeof MESSAGE_LOADING_STARTED;
export const MESSAGE_LOADING_FINISHED = 'MESSAGE_LOADING_FINISHED';
export type MESSAGE_LOADING_FINISHED = typeof MESSAGE_LOADING_FINISHED;
export const MESSAGE_ADD_STARTED = 'MESSAGE_ADD_STARTED';
export type MESSAGE_ADD_STARTED = typeof MESSAGE_ADD_STARTED;
export const MESSAGE_ADD_FINISHED = 'MESSAGE_ADD_FINISHED';
export type MESSAGE_ADD_FINISHED = typeof MESSAGE_ADD_FINISHED;
export const MESSAGE_DELETE_STARTED = 'MESSAGE_DELETE_STARTED';
export type MESSAGE_DELETE_STARTED = typeof MESSAGE_DELETE_STARTED;
export const MESSAGE_DELETE_FINISHED = 'MESSAGE_DELETE_FINISHED';
export type MESSAGE_DELETE_FINISHED = typeof MESSAGE_DELETE_FINISHED;
export const MESSAGE_INCREMENT_RATING = 'MESSAGE_INCREMENT_RATING';
export type MESSAGE_INCREMENT_RATING = typeof MESSAGE_INCREMENT_RATING;
export const MESSAGE_DECREMENT_RATING = 'MESSAGE_DECREMENT_RATING';
export type MESSAGE_DECREMENT_RATING = typeof MESSAGE_DECREMENT_RATING;

export type MESSAGE_APP_MESSAGES_ACTIONS = MESSAGE_APP_LOADING_FINISHED | CURRENT_CHANNEL_CHANGE_FINISHED |
  MESSAGE_LOADING_STARTED | MESSAGE_LOADING_FINISHED | MESSAGE_ADD_STARTED | MESSAGE_ADD_FINISHED |
  MESSAGE_DELETE_STARTED | MESSAGE_DELETE_FINISHED | MESSAGE_INCREMENT_RATING | MESSAGE_DECREMENT_RATING;

// USERS
export type MESSAGE_APP_USERS_ACTIONS = MESSAGE_APP_LOADING_FINISHED;

// USER PROFILE
export const USER_PROFILE_SHOW_DIALOG = 'USER_PROFILE_SHOW_DIALOG';
export type USER_PROFILE_SHOW_DIALOG = typeof USER_PROFILE_SHOW_DIALOG;
export const USER_PROFILE_HIDE_DIALOG = 'USER_PROFILE_HIDE_DIALOG';
export type USER_PROFILE_HIDE_DIALOG = typeof USER_PROFILE_HIDE_DIALOG;



