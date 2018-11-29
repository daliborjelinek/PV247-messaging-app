import * as Immutable from 'immutable';
import {GET, getMessageUrl} from '../utils/requestUtils';
import {IMessageAppMessage} from '../models/IMessageAppMessage';
import {ServerResponseMessage} from '../@types/api';

/**
 * Load all messages for channel with given id and transform them to the Immutable List.
 * @param channelId selected channel id
 */
export async function loadMessagesForChannel(channelId: Uuid): Promise<Immutable.List<IMessageAppMessage>> {
  const responseData = await GET<ServerResponseMessage[]>(getMessageUrl(channelId));
  return mapToMessagesMap(responseData.data);
}

// PRIVATE FUNCTION - MAPPING BETWEEN SERVER RESPONSE AND MESSAGE APP MODEL
function mapToMessagesMap(serverResponseMessage: ServerResponseMessage[]): Immutable.List<IMessageAppMessage> {
  if (serverResponseMessage == null || serverResponseMessage.length === 0) {
    return Immutable.List();
  }

  return Immutable.List(serverResponseMessage.map((message) => mapToMessage(message)));
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
