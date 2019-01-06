import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as Immutable from 'immutable';
import {IMessageAppChannel} from '../../models/IMessageAppChannel';
import * as ChannelService from '../../service/channelService';
import * as MessageService from '../../service/messageService';
import {
  CHANNEL_ADD_FINISHED,
  CHANNEL_ADD_STARTED, CHANNEL_DELETE_FAILED, CHANNEL_DELETE_FINISHED, CHANNEL_DELETE_STARTED, CHANNEL_INVITE_USER_FINISHED, CHANNEL_INVITE_USER_STARTED, CHANNEL_RENAME_FINISHED,
  CHANNEL_RENAME_STARTED, CHANNEL_REORDER_FINISHED, CHANNEL_REORDER_STARTED,
  CURRENT_CHANNEL_CHANGE_FINISHED,
  CURRENT_CHANNEL_CHANGE_STARTED, EDITING_CHANNEL_NAME_MODE_FINISHED, HIDE_MESSAGES_FOR_DELETED_CHANNEL,
  MESSAGE_LOADING_FINISHED,
  MESSAGE_LOADING_STARTED,
  RESTORE_MESSAGES_UPDATE_TIMEOUT
} from '../../constants/actionTypes';
import {addChannel, addUserToActiveChannel, deleteChannel, onChannelSelected, renameChannel, reorderChannels} from '../../actions/channelActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const channels: IMessageAppChannel[] = [
  {id: '42', countOfNewMessages: 12, name: '/b', createdBy: 'anon@anon.cz', order: 0, userEmails: Immutable.List(['anon@anon.cz'])},
];

// @ts-ignore
const channelsImmutable = Immutable.Map(channels.map(channel => [channel.id, channel]));
const channelIds = Immutable.List(['42']);

test('Channel selected', () => {
  const messages: any[] = [];
  // @ts-ignore
  ChannelService.setLastActiveChannelId = jest.fn();
  // @ts-ignore
  MessageService.loadMessagesForChannel = jest.fn(() => Promise.resolve([]));
  const store = mockStore({ channels: {byId: channelsImmutable}, loggedUser: {email: 'anon@anon.cz'}});

  const expectedActions = [
    { type: CURRENT_CHANNEL_CHANGE_STARTED },
    { type: MESSAGE_LOADING_STARTED },
    { type: MESSAGE_LOADING_FINISHED, payload: {messages} },
    { type: CURRENT_CHANNEL_CHANGE_FINISHED, payload: {id: channels[0].id}},
    { type: RESTORE_MESSAGES_UPDATE_TIMEOUT }
  ];

  return store.dispatch(onChannelSelected('42')).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Add new channel', () => {
  // @ts-ignore
  ChannelService.createChannel = jest.fn(() => Promise.resolve(channels[0]));
  const store = mockStore({loggedUser: {email: 'anon@anon.cz'}, channels: {allIds: channelIds}});

  const expectedActions = [
    { type: CHANNEL_ADD_STARTED },
    { type: CHANNEL_ADD_FINISHED, payload: {channel: channels[0]} }
  ];

  return store.dispatch(addChannel('new')).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Rename channel', () => {
  // @ts-ignore
  ChannelService.changeChannelName = jest.fn();
  const store = mockStore({loggedUser: {email: 'anon@anon.cz'}, channels: {byId: channelsImmutable}});

  const expectedActions = [
    { type: CHANNEL_RENAME_STARTED },
    { type: CHANNEL_RENAME_FINISHED, payload: {id: channels[0].id, name: 'Renamed'} },
    { type: EDITING_CHANNEL_NAME_MODE_FINISHED }
  ];

  return store.dispatch(renameChannel(channels[0].id, 'Renamed')).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Delete channel - can delete', () => {
  // @ts-ignore
  ChannelService.deleteChannel = jest.fn();
  const store = mockStore({loggedUser: {email: 'anon@anon.cz'}, channels: {byId: channelsImmutable}});

  const expectedActions = [
    { type: CHANNEL_DELETE_STARTED },
    { type: CHANNEL_DELETE_FINISHED, payload: {id: channels[0].id} },
    { type: HIDE_MESSAGES_FOR_DELETED_CHANNEL }
  ];

  return store.dispatch(deleteChannel(channels[0].id)).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Delete channel - cannot delete (channel created by different user)', () => {
  // @ts-ignore
  ChannelService.deleteChannel = jest.fn();
  const store = mockStore({loggedUser: {email: 'asa@akira.com'}, channels: {byId: channelsImmutable}});

  const expectedActions = [
    { type: CHANNEL_DELETE_STARTED },
    { type: CHANNEL_DELETE_FAILED, payload: {message: 'Channel cannot be deleted. Only person who created the channel can remove it'} },
  ];

  return store.dispatch(deleteChannel(channels[0].id)).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Reorder channels', () => {
  const reorderedChannelIds = Immutable.List(['2', '1']);
  // @ts-ignore
  ChannelService.reorderChannels = jest.fn();
  const store = mockStore({});

  const expectedActions = [
    { type: CHANNEL_REORDER_STARTED },
    { type: CHANNEL_REORDER_FINISHED, payload: {reorderedChannelIds}},
  ];

  return store.dispatch(reorderChannels(reorderedChannelIds)).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Add user to active channel', () => {
  // @ts-ignore
  ChannelService.addUserToChannel = jest.fn();
  const store = mockStore({loggedUser: {email: 'asa@akira.com'},
    channels: {byId: channelsImmutable}, currentChannelId: channels[0].id});

  const expectedActions = [
    { type: CHANNEL_INVITE_USER_STARTED },
    { type: CHANNEL_INVITE_USER_FINISHED, payload: {email: 'pepa@pepa.cz', channelId: channels[0].id}},
  ];

  return store.dispatch(addUserToActiveChannel('pepa@pepa.cz')).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});
