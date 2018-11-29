import * as Immutable from 'immutable';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import {DELETE, GET, getChannelUrl, POST, PUT} from '../utils/requestUtils';
import * as MessageAppRepository from '../repository/messageAppRepository';
import {ServerRequestChannel, ServerResponseChannel} from '../@types/api';

/**
 * Load all channels from server and transform them to the Immutable List.
 */
export async function loadChannels(): Promise<Immutable.List<IMessageAppChannel>> {
  const response = await GET<ServerResponseChannel[]>(getChannelUrl());
  return mapToChannelsMap(response.data);
}

/**
 * Creates new channel with specified name.
 * @param name name of the new channel
 */
export async function createChannel(name: string): Promise<IMessageAppChannel> {
  const newChannel: ServerRequestChannel = {
    name,
    customData: {
      countOfNewMessages: 0,
      userIds: [],
    },
  };
  const response = await POST<ServerResponseChannel>(getChannelUrl(), newChannel);
  return mapToChannel(response.data);
}

/**
 * Deletes channel with specified id.
 * @param id id of the channel
 */
export async function deleteChannel(id: Uuid): Promise<void> {
  await DELETE(`${getChannelUrl()}/${id}`);
}

/**
 * Changes name of the channel and returns updated channel.
 * @param channel selected channel
 * @param name new channel name
 */
export async function changeChannelName(channel: IMessageAppChannel, name: string): Promise<IMessageAppChannel> {
  const channelRequest = mapToRequestChannel(channel);
  channelRequest.name = name;
  const response = await PUT<ServerResponseChannel>(`${getChannelUrl()}/${channel.id}`);
  return mapToChannel(response.data);
}

/**
 * Returns last active channel id. Can return null if no channel has been ever used
 *   or someone deleted data from local storage.
 */
export function getLastLoadedChannelId(): Uuid | null {
  return MessageAppRepository.getLastActiveChannelId();
}

// PRIVATE FUNCTION - MAPPING BETWEEN SERVER RESPONSE AND MESSAGE APP MODEL
function mapToChannelsMap(serverResponseChannel: ServerResponseChannel[]): Immutable.List<IMessageAppChannel> {
  if (serverResponseChannel == null || serverResponseChannel.length === 0) {
    return Immutable.List();
  }

  return Immutable.List(serverResponseChannel.map((channel) => mapToChannel(channel)));
}

function mapToChannel(serverResponseChannel: ServerResponseChannel): IMessageAppChannel {
  return {
    id: serverResponseChannel.id,
    name: serverResponseChannel.name,
    countOfNewMessages: serverResponseChannel.customData.countOfNewMessages,
    userIds: Immutable.List<Uuid>(serverResponseChannel.customData.userIds),
  };
}

function mapToRequestChannel(channel: IMessageAppChannel): ServerRequestChannel {
  return {
    name: channel.name,
    customData: {
      countOfNewMessages: channel.countOfNewMessages,
      userIds: channel.userIds.toJS(),
    },
  };
}
