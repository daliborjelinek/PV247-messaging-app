import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {IMessageAppMessage} from '../../models/IMessageAppMessage';
import {RatingPolarity} from '../../enums/RatingPolarity';
import * as Immutable from 'immutable';
import {loadMessagesForChannel, addMessage, deleteMessage, incrementRating, decrementRating, updateMessagesInChannel} from '../../actions/messageActions';
import {
  ACTUALIZE_MESSAGES_IN_CHANNEL_FINISHED,
  ACTUALIZE_MESSAGES_IN_CHANNEL_STARTED,
  MESSAGE_ADD_FINISHED,
  MESSAGE_ADD_STARTED,
  MESSAGE_DECREMENT_RATING,
  MESSAGE_DELETE_FINISHED,
  MESSAGE_DELETE_STARTED,
  MESSAGE_INCREMENT_RATING,
  MESSAGE_LOADING_FINISHED,
  MESSAGE_LOADING_STARTED,
  RESTORE_MESSAGES_UPDATE_TIMEOUT
} from '../../constants/actionTypes';
import * as MessageService from '../../service/messageService';
import * as MessageAppSelector from '../../selectors/messageAppSelectors';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const messages: IMessageAppMessage[] = [
  {id: '1', createdAt: new Date(), value: 'Zprava' as any, createdBy: '0', rating: 2,
    updatedAt: new Date(), updatedBy: '0', usersWhoRatedMessage: {2: RatingPolarity.POSITIVE, 3: RatingPolarity.POSITIVE}}
];

test('Load messages for channel', () => {
  // @ts-ignore
  MessageService.loadMessagesForChannel = jest.fn(() => (messages));

  const store = mockStore({ messages: [] });

  const expectedActions = [
    { type: MESSAGE_LOADING_STARTED },
    { type: MESSAGE_LOADING_FINISHED, payload: {messages}},
  ];

  return store.dispatch(loadMessagesForChannel('0')).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Create new message', () => {
  // fake message
  const message = 'text';

  // @ts-ignore
  MessageService.createMessage = jest.fn((): IMessageAppMessage => (message));

  const store = mockStore({ loggedUser: {email: 'a@a.cz'}, currentChannelId: '42' });

  const expectedActions = [
    { type: MESSAGE_ADD_STARTED },
    { type: MESSAGE_ADD_FINISHED, payload: {message}},
    { type: RESTORE_MESSAGES_UPDATE_TIMEOUT }
  ];

  return store.dispatch(addMessage('ahoj' as any)).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Delete message', () => {
  const id = '666';
  // @ts-ignore
  MessageService.deleteMessage = jest.fn();

  const store = mockStore({ loggedUser: {email: 'a@a.cz'}});

  const expectedActions = [
    { type: MESSAGE_DELETE_STARTED },
    { type: MESSAGE_DELETE_FINISHED, payload: {id}},
  ];

  return store.dispatch(deleteMessage(id)).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Increment message rating', () => {
  // fake message
  const messageId = messages[0].id;
  // @ts-ignore
  const messagesImmutable = Immutable.Map(messages.map((message: IMessageAppMessage) => [message.id, message]));

  // @ts-ignore
  MessageService.changeMessageRating = jest.fn();

  const store = mockStore({ messages: {byId: messagesImmutable},
    loggedUser: {email: 'a@a.cz'}, currentChannelId: '42' });

  const expectedActions = [
    { type: MESSAGE_INCREMENT_RATING, payload: {id: messageId, userId: 'a@a.cz'} },
  ];

  return store.dispatch(incrementRating(messageId)).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Decrement message rating', () => {
  // fake message
  const messageId = messages[0].id;
  // @ts-ignore
  const messagesImmutable = Immutable.Map(messages.map((message: IMessageAppMessage) => [message.id, message]));

  // @ts-ignore
  MessageService.changeMessageRating = jest.fn();

  const store = mockStore({ messages: {byId: messagesImmutable},
    loggedUser: {email: 'a@a.cz'}, currentChannelId: '42' });

  const expectedActions = [
    { type: MESSAGE_DECREMENT_RATING, payload: {id: messageId, userId: 'a@a.cz'} },
  ];

  return store.dispatch(decrementRating(messageId)).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Update messages in channel - new messages', () => {
  // @ts-ignore
  MessageAppSelector.getCreationTimeOfLastDisplayedMessage = jest.fn();
  // @ts-ignore
  MessageService.loadNewMessages = jest.fn(() => messages);

  const store = mockStore({ messages: []});

  const expectedActions = [
    { type: ACTUALIZE_MESSAGES_IN_CHANNEL_STARTED },
    { type: ACTUALIZE_MESSAGES_IN_CHANNEL_FINISHED, payload: {newMessages: messages}},
    { type: RESTORE_MESSAGES_UPDATE_TIMEOUT }
  ];

  return store.dispatch(updateMessagesInChannel('42')).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('Update messages in channel - no new messages', () => {
  // @ts-ignore
  MessageAppSelector.getCreationTimeOfLastDisplayedMessage = jest.fn();
  // @ts-ignore
  MessageService.loadNewMessages = jest.fn(() => []);

  const store = mockStore({ messages: []});

  const expectedActions = [
    { type: ACTUALIZE_MESSAGES_IN_CHANNEL_STARTED },
    { type: ACTUALIZE_MESSAGES_IN_CHANNEL_FINISHED, payload: {newMessages: []}},
    { type: RESTORE_MESSAGES_UPDATE_TIMEOUT }
  ];

  return store.dispatch(updateMessagesInChannel('42')).then(() => {
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});
