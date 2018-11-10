import * as Immutable from 'immutable';
import {channels, messages, users} from './initialData';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import delay from 'delay';
import {IMessageAppMessage} from '../models/IMessageAppMessage';

// TODO user identification should be id or username, not both
export function getUserByUsername(userName: string): IMessageAppUser | undefined {
  return users.filter((user) => user.userName === userName).get(0);
}

export async function loadChannels(): Promise<Immutable.List<IMessageAppChannel>> {
  await delay(200);
  return channels;
}

export async function loadMessagesForChannel(channelId: Uuid): Promise<Immutable.List<IMessageAppMessage>> {
  await delay(300);
  return messages.filter((message) => message.channelId === channelId);
}

export async function loadUsers(): Promise<Immutable.List<IMessageAppUser>> {
  await delay(200);
  return users;
}
