import {channelLoadingReducer} from '../../src/reducers/channelLoadingReducer';
import {MESSAGE_APP_LOADING_FINISHED, MESSAGE_APP_LOADING_STARTED, MESSAGE_LOADING_STARTED} from '../../src/constants/actionTypes';

describe('Loading spinner', () => {
  it('Show when application is loading', () => {
    expect(channelLoadingReducer(false, {type: MESSAGE_APP_LOADING_STARTED})).toEqual(true);
  });
  it('Show when channel has changed', () => {
    expect(channelLoadingReducer(false, {type: MESSAGE_LOADING_STARTED})).toEqual(true);
  });
  it('Show when application is loading', () => {
    expect(channelLoadingReducer(false, {type: MESSAGE_APP_LOADING_FINISHED})).toEqual(false);
  });
  it('Show when channel has changed', () => {
    expect(channelLoadingReducer(false, {type: MESSAGE_APP_LOADING_FINISHED})).toEqual(false);
  });
});
