import * as Immutable from 'immutable';
import {DELETE, GET, getMessageUrl, POST, PUT} from '../utils/requestUtils';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {ServerRequestMessage, ServerResponseMessage} from '../@types/api';
import {RatingPolarity} from '../enums/RatingPolarity';


/**
 * Load all messages for channel with given id and transform them to the Immutable List.
 * @param channelId selected channel id
 */
export async function loadMessagesForChannel(channelId: Uuid): Promise<Immutable.List<IMessageAppMessage>> {
  const responseData = await GET<ServerResponseMessage[]>(getMessageUrl(channelId));
  return mapToMessagesList(responseData.data);
}

/**
 * Create new message for selected channel.
 * @param value text of the message
 * @param authorEmail id of the author of the message
 * @param channelId id of the channel
 */
export async function createMessage(value: string, authorEmail: string, channelId: Uuid): Promise<IMessageAppMessage> {
  const newMessage: ServerRequestMessage = {
    value,
    createdBy: authorEmail,
    createdAt: new Date(),
    customData: {
      rating: 0,
      usersWhoRatedMessage: {},
    }
  };

  const response = await POST<ServerResponseMessage>(getMessageUrl(channelId), newMessage);
  return mapToMessage(response.data);
}

/**
 * Delete message from selected channel.
 * @param messageId
 * @param channelId
 */
export async function deleteMessage(messageId: Uuid, channelId: Uuid): Promise<void> {
  await DELETE(`${getMessageUrl(channelId)}/${messageId}`);
}

/**
 * Decrement or increment message rating. Return updated message.
 * @param message message which rating should be updated
 * @param email id of user, who changed rating
 * @param channelId id of channel in which message is shown
 * @param ratingPolarity rating polaritt
 */
export async function changeMessageRating(message: IMessageAppMessage, email: string,
                                          channelId: Uuid, ratingPolarity: RatingPolarity) {
  const requestMessage = mapToRequestMessage(message);
  const currentRating = requestMessage.customData.rating;
  requestMessage.customData.usersWhoRatedMessage[email] = ratingPolarity;
  requestMessage.customData.rating = ratingPolarity === RatingPolarity.POSITIVE ? currentRating + 1 : currentRating - 1;

  const response = await PUT<ServerResponseMessage>(`${getMessageUrl(channelId)}/${message.id}`, requestMessage);
  return mapToMessage(response.data);
}

/**
 * Load messages from server and return those, which are newer than last displayed message.
 * @param channelId id of the channel for which messages are loaded
 * @param lastMessageCreatedAt time of creation of the last displayed message
 */
export async function loadNewMessages(channelId: Uuid,
                                      lastMessageCreatedAt: Date | null): Promise<Immutable.List<IMessageAppMessage>> {
  const responseData = await GET<ServerResponseMessage[]>(getMessageUrl(channelId));
  const messages = mapToMessagesList(responseData.data);

  // no message existed before - return all messages
  if (lastMessageCreatedAt == null) {
    return messages;
  }

  // return only newer message
  return messages.filter((message) => message.createdAt > lastMessageCreatedAt);
}


/********************************************************************************
 * PRIVATE FUNCTION - MAPPING BETWEEN SERVER RESPONSE AND MESSAGE APP MODEL
 ********************************************************************************/
function mapToMessagesList(serverResponseMessage: ServerResponseMessage[]): Immutable.List<IMessageAppMessage> {
  if (serverResponseMessage == null || serverResponseMessage.length === 0) {
    return Immutable.List();
  }

  const messageList = Immutable.List(serverResponseMessage.map((message) => mapToMessage(message)));
  return messageList.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    return 0;
  });
}

function mapToMessage(serverResponseMessage: ServerResponseMessage): IMessageAppMessage {
  return {
    id: serverResponseMessage.id,
    value: serverResponseMessage.value,
    createdAt: serverResponseMessage.createdAt,
    createdBy: serverResponseMessage.createdBy,
    rating: serverResponseMessage.customData.rating,
    usersWhoRatedMessage: serverResponseMessage.customData.usersWhoRatedMessage,
  };
}

function mapToRequestMessage(message: IMessageAppMessage): ServerRequestMessage {
  return {
    value: message.value,
    createdAt: message.createdAt,
    createdBy: message.createdBy,
    updatedAt: message.updatedAt,
    updatedBy: message.updatedBy,
    customData: {
      rating: message.rating,
      usersWhoRatedMessage: message.usersWhoRatedMessage,
    }
  };
}
