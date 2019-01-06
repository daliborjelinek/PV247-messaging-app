import {
  MESSAGE_APP_LOG_OUT,
  MESSAGE_APP_LOGGING_AUTO_FAILED,
  MESSAGE_APP_LOGGING_AUTO_STARTED,
  MESSAGE_APP_LOGGING_AUTO_SUCCESS,
  MESSAGE_APP_LOGGING_FAILED,
  MESSAGE_APP_LOGGING_STARTED,
  MESSAGE_APP_LOGGING_SUCCESS
} from '../../src/constants/actionTypes';
import {isLoggedInReducer} from '../../src/reducers/isLoggedInReducer';

describe('User login', () => {
  it('Nobody should be logged in after init', () => {
    expect(isLoggedInReducer(false, {type: MESSAGE_APP_LOGGING_STARTED})).toEqual(false);
  });
  it('Nobody should be logged in after auto init', () => {
    expect(isLoggedInReducer(false, {type: MESSAGE_APP_LOGGING_AUTO_STARTED})).toEqual(false);
  });
  it('Nobody should be logged in if manual login fails', () => {
    expect(isLoggedInReducer(false, {type: MESSAGE_APP_LOGGING_FAILED})).toEqual(false);
  });
  it('Nobody should be logged in if auto login fails', () => {
    expect(isLoggedInReducer(false, {type: MESSAGE_APP_LOGGING_AUTO_FAILED})).toEqual(false);
  });
  it('User should be logged in if login success', () => {
    expect(isLoggedInReducer(false, {type: MESSAGE_APP_LOGGING_SUCCESS})).toEqual(true);
  });
  it('User should be logged in if auto login success', () => {
    expect(isLoggedInReducer(false, {type: MESSAGE_APP_LOGGING_AUTO_SUCCESS})).toEqual(true);
  });
  it('Nobody should be logged in after logout', () => {
    expect(isLoggedInReducer(false, {type: MESSAGE_APP_LOG_OUT})).toEqual(false);
  });
});
