import * as Immutable from 'immutable';
import * as uuid from 'uuid';
import {channels, messages, users} from './initialData';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import delay from 'delay';
import {IMessageAppMessage} from '../models/IMessageAppMessage';

const LOCAL_STORAGE_CHANNELS_KEY = 'CHANNELS';
const LOCAL_STORAGE_MESSAGES_KEY = 'MESSAGES';
const LOCAL_STORAGE_USERS_KEY = 'USERS';

// TODO user identification should be id or username, not both
export function getUserByUsername(userName: string): IMessageAppUser | undefined {
  return users.filter((user) => user.userName === userName).get(0);
}

/**
 * Load channels. At first it tries to load channels from local storage.
 * If local storage doesn't contain any channels, loads them from memory (default channels).
 */
export async function loadChannels(): Promise<Immutable.List<IMessageAppChannel>> {
  await delay(200);
  const channelsLocalStorage = _loadCollectionFromLocalStorage<IMessageAppChannel>(LOCAL_STORAGE_CHANNELS_KEY);
  if (channelsLocalStorage.isEmpty()) {
    return channels;
  }
  // user ids for given channel should be immutable list
  return channelsLocalStorage.map((channel: IMessageAppChannel) => {
    return {...channel, userIds: Immutable.List(channel.userIds)};
  });
}

/**
 * Load messages fot selected channel. At first it tries to load messages from local storage.
 * If local storage doesn't contain any massages, loads them from memory (default messages).
 * @param channelId - channel, for which messages are loaded
 */
export async function loadMessagesForChannel(channelId: Uuid): Promise<Immutable.List<IMessageAppMessage>> {
  await delay(300);
  const messagesLocalStorage = _loadCollectionFromLocalStorage<IMessageAppMessage>(LOCAL_STORAGE_MESSAGES_KEY);
  if (messagesLocalStorage.isEmpty()) {
    return messages.filter((message) => message.channelId === channelId);
  }
  return messagesLocalStorage.filter((message) => message.channelId === channelId);
}

/**
 * Load users. At first it tries to load users from local storage.
 * If local storage doesn't contain any users, loads them from memory (default channels).
 */
export async function loadUsers(): Promise<Immutable.List<IMessageAppUser>> {
  await delay(200);
  const usersLocalStorage = _loadCollectionFromLocalStorage<IMessageAppUser>(LOCAL_STORAGE_USERS_KEY);
  if (usersLocalStorage.isEmpty()) {
    return users;
  }
  return usersLocalStorage;
}

/**
 * Add new channel with specified name and save it to the local storage.
 * @param name
 */
export async function addChannel(name: string): Promise<IMessageAppChannel> {
  _saveToLocalStorage();
  await delay(200);
  const newChannel: IMessageAppChannel = {
    id: uuid(),
    name,
    userIds: Immutable.List(),
    countOfNewMessages: 0,
  };
  const channelsNew = Immutable.merge(_loadCollectionFromLocalStorage<IMessageAppChannel>(LOCAL_STORAGE_CHANNELS_KEY), newChannel);
  _saveCollectionToLocalStorage(channelsNew, LOCAL_STORAGE_CHANNELS_KEY);
  localStorage.setItem(LOCAL_STORAGE_CHANNELS_KEY, JSON.stringify(channelsNew.toJS()));
  return newChannel;
}

/**
 * Add new message to collection and saves it into the local storage.
 * @param text text of given message
 * @param authorId
 * @param channelId
 */
export async function addMessage(text: string, authorId: Uuid,
                                 channelId: Uuid): Promise<IMessageAppMessage> {
  _saveToLocalStorage();
  await delay(100);
  const newMessage: IMessageAppMessage = {
    id: uuid(),
    date: new Date().toDateString(),
    rating: 0,
    authorId,
    channelId,
    text,
  };
  const messagesNew = Immutable.merge(_loadCollectionFromLocalStorage<IMessageAppMessage>(LOCAL_STORAGE_MESSAGES_KEY), newMessage);
  _saveCollectionToLocalStorage(messagesNew, LOCAL_STORAGE_MESSAGES_KEY);
  return newMessage;
}

/**
 * Deletes selected message from local storage.
 * @param id Id of the message.
 */
export async function deleteMessage(id: Uuid): Promise<void> {
  _saveToLocalStorage();
  const messagesLS = _loadCollectionFromLocalStorage<IMessageAppMessage>(LOCAL_STORAGE_MESSAGES_KEY);
  const messagesNew = messagesLS.filter((message) => message.id !== id);
  _saveCollectionToLocalStorage(messagesNew, LOCAL_STORAGE_MESSAGES_KEY);
}

/**
 * Deletes selected channel from local storage.
 * @param id Id of the channel.
 */
export async function deleteChannel(id: Uuid): Promise<void> {
  // delete operation works only with local storage
  _saveToLocalStorage();
  // load from local storage, remove item and save again
  const channelsLS = _loadCollectionFromLocalStorage<IMessageAppChannel>(LOCAL_STORAGE_CHANNELS_KEY);
  const channelsNew = channelsLS.filter((channel) => channel.id !== id);
  _saveCollectionToLocalStorage(channelsNew, LOCAL_STORAGE_CHANNELS_KEY);
}

/**
 * Load collection from local storage. Should be used for loading messages, channels and users.
 * @param key Key of collection in local storage.
 * @private
 */
function _loadCollectionFromLocalStorage<T>(key: string): Immutable.List<T> {
  const collection = localStorage.getItem(key);
  if (collection == null) {
    return Immutable.List<T>();
  }
  return Immutable.List<T>(JSON.parse(collection));
}

/**
 * Saves collection with to local storage using a selected key.
 * @param collection
 * @param key
 */
function _saveCollectionToLocalStorage(collection: Immutable.List<any>, key: string): void {
  localStorage.setItem(key, JSON.stringify(collection.toJS()));
}

/**
 * Store default data into local storage. It's needed, if any CUD method is called.
 * It ensures that entities have same ids after reloading the page.
 * @private
 */
function _saveToLocalStorage() {
  if (localStorage.getItem(LOCAL_STORAGE_CHANNELS_KEY) == null) {
    localStorage.setItem(LOCAL_STORAGE_CHANNELS_KEY, JSON.stringify(channels.toJS()));
  }
  if (localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY) == null) {
    localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(messages.toJS()));
  }
  if (localStorage.getItem(LOCAL_STORAGE_USERS_KEY) == null) {
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users.toJS()));
  }
}
