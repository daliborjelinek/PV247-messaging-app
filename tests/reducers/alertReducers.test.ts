import {alertsReducer, isAlertBarVisibleReducer} from '../../src/reducers/alertReducers';
import {CHANNEL_DELETE_FAILED, MESSAGE_APP_CLEAR_ALERTS} from '../../src/constants/actionTypes';
import * as Immutable from 'immutable';


describe('Displaying alerts', () => {
  it('Appear if deleting channel fails', () => {
    expect(isAlertBarVisibleReducer(false, {type: CHANNEL_DELETE_FAILED})).toEqual(true);

  });

  it('Hide if user clear alerts', () => {
    expect(isAlertBarVisibleReducer(false, {type: MESSAGE_APP_CLEAR_ALERTS})).toEqual(false);

  });
});

describe('Alert content', () => {
  it('Empty list after clear', () => {
    expect(alertsReducer(undefined, {type: MESSAGE_APP_CLEAR_ALERTS})).toEqual(Immutable.List());
  });

  it('Message after fails', () => {
    const channelDeleteFailed = {
      type: CHANNEL_DELETE_FAILED,
      payload: {
        message: 'Channel cannot be deleted. Only person who created the channel can remove it',
      }
    };
    const result = alertsReducer(undefined, channelDeleteFailed);
    expect(result.get(0)).toEqual(channelDeleteFailed.payload.message);

  });
});


