import * as Immutable from 'immutable';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import {DELETE, GET, getChannelUrl, POST, PUT} from '../utils/requestUtils';
import * as MessageAppRepository from '../repository/messageAppRepository';
import {ServerRequestChannel, ServerResponseChannel} from '../@types/api';
import {IMessageAppChannels} from '../models/IMessageAppState';

/**
 * Load all channels from server and transform them to the Immutable List.
 */
export async function loadChannels(): Promise<Immutable.List<IMessageAppChannel>> {
  const response = await GET<ServerResponseChannel[]>(getChannelUrl());
  return mapToChannelsList(response.data);
}

/**
 * Creates new channel with specified name.
 * @param name name of the new channel
 * @param order order of newly created channel - last is default
 * @param createdBy email of the message author
 */
export async function createChannel(name: string, order: number, createdBy: string): Promise<IMessageAppChannel> {
  const newChannel: ServerRequestChannel = {
    name,
    customData: {
      countOfNewMessages: 0,
      userIds: [createdBy],
      order,
      createdBy,
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
  const response = await PUT<ServerResponseChannel>(`${getChannelUrl()}/${channel.id}`, channelRequest);
  return mapToChannel(response.data);
}

/**
 * Send requests to server with updated order of channels.
 *   GUI does not wait for result because it would degrade user experience with reordering.
 * @param reorderedChannelIds channel ids in new order
 * @param channels all visible channels
 */
export function reorderChannels(reorderedChannelIds: Immutable.List<Uuid>, channels: IMessageAppChannels): void {
  reorderedChannelIds.forEach((channelId, index) => {
    const requestChannel = mapToRequestChannel(channels.byId.get(channelId)!);
    requestChannel.customData.order = index;
    PUT<ServerResponseChannel>(`${getChannelUrl()}/${channelId}`, requestChannel);
  });
}

/**
 * Add user into the channel. UI does not wait for result.
 * @param email email of added user
 * @param channel channel in which user will be added
 */
export function addUserToChannel(email: Uuid, channel: IMessageAppChannel): void {
  const requestChannel = mapToRequestChannel(channel);
  requestChannel.customData.userIds.push(email);
  PUT<ServerResponseChannel>(`${getChannelUrl()}/${channel.id}`, requestChannel);
}

/**
 * Returns last active channel id for selected user. Can return null if no channel has been ever used
 *   or someone deleted data from local storage.
 */
export function getLastActiveChannelId(userEmail: string): Uuid | null {
  return MessageAppRepository.getLastActiveChannelId(userEmail);
}

/**
 * Set id of activated channel into the local storage.
 * @param channelId id of active channel
 * @param userEmail email of logged user
 */
export function setLastActiveChannelId(channelId: Uuid, userEmail: string): void {
  MessageAppRepository.setLastActiveChannelId(channelId, userEmail);
}

// PRIVATE FUNCTION - MAPPING BETWEEN SERVER RESPONSE AND MESSAGE APP MODEL
function mapToChannelsList(serverResponseChannel: ServerResponseChannel[]): Immutable.List<IMessageAppChannel> {
  if (serverResponseChannel == null || serverResponseChannel.length === 0) {
    return Immutable.List();
  }

  const channels = Immutable.List(serverResponseChannel.map((channel) => mapToChannel(channel)));
  return channels.sort((a, b) => a.order - b.order);
}

function mapToChannel(serverResponseChannel: ServerResponseChannel): IMessageAppChannel {
  return {
    id: serverResponseChannel.id,
    name: serverResponseChannel.name,
    countOfNewMessages: serverResponseChannel.customData.countOfNewMessages,
    userEmails: Immutable.List<Uuid>(serverResponseChannel.customData.userIds),
    order: serverResponseChannel.customData.order,
    createdBy: serverResponseChannel.customData.createdBy,
  };
}

function mapToRequestChannel(channel: IMessageAppChannel): ServerRequestChannel {
  return {
    name: channel.name,
    customData: {
      countOfNewMessages: channel.countOfNewMessages,
      userIds: channel.userEmails.toJS(),
      order: channel.order,
      createdBy: channel.createdBy,
    },
  };
}
