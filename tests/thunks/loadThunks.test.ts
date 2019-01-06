import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {IMessageAppMessage} from '../../src/models/IMessageAppMessage';
import {RatingPolarity} from '../../src/enums/RatingPolarity';
import {IMessageAppChannel} from '../../src/models/IMessageAppChannel';
import * as Immutable from 'immutable';
import * as ChannelService from '../../src/service/channelService';
import * as MessageService from '../../src/service/messageService';
import * as UserService from '../../src/service/userService';
import {CURRENT_CHANNEL_CHANGE_FINISHED, MESSAGE_APP_LOADING_FINISHED, MESSAGE_APP_LOADING_STARTED} from '../../src/constants/actionTypes';
import {IMessageAppUser} from '../../src/models/IMessageAppUser';
import {loadApp} from '../../src/actions/loadActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const messages: IMessageAppMessage[] = [
  {id: '1', createdAt: new Date(), value: 'Zprava' as any, createdBy: '0', rating: 2,
    updatedAt: new Date(), updatedBy: '0', usersWhoRatedMessage: {2: RatingPolarity.POSITIVE, 3: RatingPolarity.POSITIVE}}
];

const channels: IMessageAppChannel[] = [
  {id: '42', countOfNewMessages: 12, name: '/b', createdBy: 'anon@anon.cz', order: 0, userEmails: Immutable.List(['anon@anon.cz'])},
  {id: '88', countOfNewMessages: 2, name: '/g', createdBy: 'a@a.a', order: 1, userEmails: Immutable.List(['anon@anon.cz', 'a@a.a'])},
];

const users: IMessageAppUser[] = [
  {email: 'anon@anon.cz', picture: 'blank', userName: 'anon', password: 'anon'},
  {email: 'a@a.cz', picture: 'blank', userName: 'a', password: 'dsf5464sadf8OI960*%'},
];


const channelsImmutable = Immutable.List(channels);

test('Load app - ok', () => {
  // @ts-ignore
  ChannelService.loadChannels = jest.fn(() => (Promise.resolve(channelsImmutable)));
  // @ts-ignore
  ChannelService.getLastActiveChannelId = jest.fn(() => ('42'));
  // @ts-ignore
  MessageService.loadMessagesForChannel = jest.fn(() => (Promise.resolve(messages)));
  // @ts-ignore
  UserService.loadUsers = jest.fn(() => (Promise.resolve(users)));

  const store = mockStore({ loggedUser: {email: 'anon@anon.cz'} });

  const expectedActions = [
    { type: MESSAGE_APP_LOADING_STARTED },
    { type: MESSAGE_APP_LOADING_FINISHED, payload: {channels: channelsImmutable, messages, users}},
    { type: CURRENT_CHANNEL_CHANGE_FINISHED, payload: {id: '42'} }
  ];

  return store.dispatch(loadApp()).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Load app - no channel', () => {
  // @ts-ignore
  ChannelService.loadChannels = jest.fn(() => (Promise.resolve(null)));
  const store = mockStore({ loggedUser: {email: 'anon@anon.cz'} });

  const expectedActions = [
    { type: MESSAGE_APP_LOADING_STARTED },
    { type: MESSAGE_APP_LOADING_FINISHED, payload: {channels: Immutable.List(), messages: Immutable.List(),
                                                    users: Immutable.List()} },
  ];

  return store.dispatch(loadApp()).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Load app - no channel for active user', () => {
  // @ts-ignore
  ChannelService.loadChannels = jest.fn(() => (Promise.resolve(null)));
  const store = mockStore({ loggedUser: {email: 'anonnnn@anon.cz'} });

  const expectedActions = [
    { type: MESSAGE_APP_LOADING_STARTED },
    { type: MESSAGE_APP_LOADING_FINISHED, payload: {channels: Immutable.List(), messages: Immutable.List(),
        users: Immutable.List()} },
  ];

  return store.dispatch(loadApp()).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});
