
import * as React from 'react';
import {ChannelList} from './components/ChannelList';
import {IChannelItem} from './components/ChannelItem';
import {ChatWindow, IContent} from './components/ChatWindow';
import {IChannelHeader} from './components/ChannelHeader';
import {IMessage, IMessageAuthor} from './components/Message';
import {DropDownMenu, IDropDownMenuItem} from './components/DropDownMenu';

export class App extends React.Component {
  constructor(props: any) {
    super(props); // Must be called to properly build the base object and initialize its prototype.


    // TODO Create real state
    this.state = {
      nick: '',
      message: '',
      messages: [],
    };
  }

  // <editor-fold desc="Creating dummy content">
  // Returns statically filled channel list.
  private getChannels(): IChannelItem[] {
    const channel1: IChannelItem = { name: 'Mia Khlaifa', countOfNewMessages: 3 };
    const channel2: IChannelItem = { name: 'Tori Black', countOfNewMessages: 1 };
    const channel3: IChannelItem = { name: 'Asa Akira', countOfNewMessages: 0 };
    return [channel1, channel2, channel3];
  }

  // Returns random author of message
  private getMessageAuthor(): IMessageAuthor {
    const messageAuthor0: IMessageAuthor = {id: 0, name: 'Franta Novák',
      pictureUrl: 'https://imagebox.cz.osobnosti.cz/foto/vladimir-putin/vladimir-putin.jpg'};
    const messageAuthor1: IMessageAuthor = {id: 1, name: 'Strýček Donald',
      pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/338px-Donald_Trump_official_portrait.jpg'};
    const messageAuthor2: IMessageAuthor = {id: 2, name: 'Miloš Becherovka',
      pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Prezident_Zeman_MSV.jpg/338px-Prezident_Zeman_MSV.jpg'};
    const messageAuthors = [messageAuthor0, messageAuthor1, messageAuthor2];
    const random = Math.floor(Math.random() * 3);
    return messageAuthors[random];
  }

  // Returns message
  private getMessage(id: number): IMessage {
    const rating = Math.round(Math.random() * 100);
    const author = this.getMessageAuthor();
    const date = new Date().toISOString();
    const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
      ' Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer' +
      ' took a galley of type and scrambled it to make a type specimen book. ';
    return {id, rating, author, date, text};
  }

  // Returns dummy data for content
  private getContent(): IContent {
    const numberOfUsers = Math.round(Math.random() * 1000);
    const selectedChannel: IChannelHeader = { currentChannelId: 0, title: 'Mia Khalifa', numberOfUsers };
    const message0 = this.getMessage(0);
    const message1 = this.getMessage(1);
    const message2 = this.getMessage(2);
    const messages = [message0, message1, message2];
    return {selectedChannel, messages};
  }
  // </editor-fold>

  private getProfileMenuItems(): IDropDownMenuItem[] {
    return [
      {title: 'Profile', action: () => console.log('Go to profile')},
      {title: 'Logout', action: () => console.log('Log out')},
    ];
  }
  /*<div className="avatar"> <span className="glyphicon glyphicon-user"/></div>*/
  render(): JSX.Element {
    const channels = this.getChannels();
    const content = this.getContent();
    return (
      <div className="wrapper">
        <div className={'header'}>
          <h1>PV247</h1>
          <DropDownMenu items={this.getProfileMenuItems()}
                        iconClass={'glyphicon glyphicon-user'}
                        menuWrapperClass={'avatar'}
                        openMenuDirection={'RIGHT'}
                        />
        </div>

        <ChannelList channels={channels}/>
        <ChatWindow messages={content.messages} selectedChannel={content.selectedChannel}/>
      </div>
    );
  }

}
