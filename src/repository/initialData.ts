import * as uuid from 'uuid';
import * as Immutable from 'immutable';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {IMessageAppMessage, UsersWhoRatedMessageMap} from '../models/IMessageAppMessage';
import {IMessageAppChannel} from '../models/IMessageAppChannel';

const pictureUrl1 = 'https://imagebox.cz.osobnosti.cz/foto/vladimir-putin/vladimir-putin.jpg';
const pictureUrl2 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/338px-Donald_Trump_official_portrait.jpg';
const pictureUrl3 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Prezident_Zeman_MSV.jpg/338px-Prezident_Zeman_MSV.jpg';

const loremIpsumText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
  ' Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer' +
  ' took a galley of type and scrambled it to make a type specimen book. ';

// Users - message authors
export const users: Immutable.List<IMessageAppUser> = Immutable.List([
  { id: uuid(), name: 'Franta Novák', userName: 'Putin', pictureUrl: pictureUrl1 },
  { id: uuid(), name: 'Strýček Donald', userName: 'Trump', pictureUrl: pictureUrl2 },
  { id: uuid(), name: 'Miloš Becherovka', userName: 'Milos', pictureUrl: pictureUrl3 },
]);

// Channels
export const channels: Immutable.List<IMessageAppChannel> = Immutable.List([
  { id: uuid(), name: 'Mia Khalifa', countOfNewMessages: Math.round(Math.random() * 10),
    userIds: Immutable.List(users.map((user) => user.id))},
  { id: uuid(), name: 'Tori Black', countOfNewMessages: Math.round(Math.random() * 10),
    userIds: Immutable.List(users.map((user) => user.id))},
  { id: uuid(), name: 'Asa Akira', countOfNewMessages: Math.round(Math.random() * 10),
    userIds: Immutable.List(users.delete(2).map((user) => user.id))},
]);

// Messages
export const messages: Immutable.List<IMessageAppMessage> = Immutable.List([
  { id: uuid(), text:  loremIpsumText, date: new Date().toDateString(), authorId: users.get(0)!.id,
    rating: Math.round(Math.random() * 100), channelId: channels.get(0)!.id,
    usersWhoRatedMessage: {} as UsersWhoRatedMessageMap},
  { id: uuid(), text:  loremIpsumText, date: new Date().toDateString(), authorId: users.get(1)!.id,
    rating: Math.round(Math.random() * 100), channelId: channels.get(0)!.id,
    usersWhoRatedMessage: {} as UsersWhoRatedMessageMap},
  { id: uuid(), text:  loremIpsumText, date: new Date().toDateString(), authorId: users.get(2)!.id,
    rating: Math.round(Math.random() * 100), channelId: channels.get(1)!.id,
    usersWhoRatedMessage: {} as UsersWhoRatedMessageMap},
  { id: uuid(), text:  loremIpsumText, date: new Date().toDateString(), authorId: users.get(0)!.id,
    rating: Math.round(Math.random() * 100), channelId: channels.get(2)!.id,
    usersWhoRatedMessage: {} as UsersWhoRatedMessageMap},
]);
