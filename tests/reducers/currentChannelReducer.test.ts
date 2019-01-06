
import {CHANNEL_DELETE_FINISHED, CURRENT_CHANNEL_CHANGE_FINISHED} from '../../src/constants/actionTypes';
import {currentChannelIdReducer} from '../../src/reducers/currentChannelReducer';

describe('Current channel', () => {
  it('Null after delete', () => {
    expect(currentChannelIdReducer(false, {type: CHANNEL_DELETE_FINISHED})).toEqual(null);
  });
  it('Uuid after change', () => {
    const action = {
      type: CURRENT_CHANNEL_CHANGE_FINISHED,
      payload: {
        id: 5,
      }
    };
    expect(currentChannelIdReducer(false, action)).toEqual(5);
  });
});
