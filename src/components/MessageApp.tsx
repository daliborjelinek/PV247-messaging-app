import * as React from 'react';
import * as  PropTypes from 'prop-types';

import {IDropDownMenuItem} from './DropDownMenu';
import {ChannelList} from './ChannelList';
import {ChatWindow, IChatWindowProps} from './ChatWindow';
import {IChannelItemProps} from './ChannelItem';
import {IMessageAuthor, IMessageProps} from './Message';
import {IChannelHeaderProps} from './ChannelHeader';
import {MessageAppHeader} from './MessageAppHeader';
import {Modal, Button} from 'react-bootstrap';

import './MessageApp.less';

interface IMessageAppPropsFunctions {
  onLogout(): void;
}

interface IMessageAppProps extends IMessageAppPropsFunctions {
  readonly userName: string;
}

interface IMessageAppState {
  readonly nick: string;
  readonly message: string;
  readonly messages: any[];
  readonly isUserModalVisible: boolean;
}

export class MessageApp extends React.PureComponent<IMessageAppProps, IMessageAppState> {

  static propTypes = {
    onLogout: PropTypes.func.isRequired,
    userName: PropTypes.string.isRequired,
  };

  public constructor(props: IMessageAppProps) {
    super(props);

    // TODO create real state
    this.state = {
      nick: '',
      message: '',
      messages: [],
      isUserModalVisible: true,
    };
  }

  // <editor-fold desc="Creating dummy content">
  // Returns statically filled channel list.
  private getChannels(): IChannelItemProps[] {
    const channel1: IChannelItemProps = { name: 'Mia Khlaifa', countOfNewMessages: 3 };
    const channel2: IChannelItemProps = { name: 'Tori Black', countOfNewMessages: 1 };
    const channel3: IChannelItemProps = { name: 'Asa Akira', countOfNewMessages: 0 };
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
  private getMessage(id: number): IMessageProps {
    const rating = Math.round(Math.random() * 100);
    const author = this.getMessageAuthor();
    const date = new Date().toISOString();
    const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
      ' Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer' +
      ' took a galley of type and scrambled it to make a type specimen book. ';
    return {message: {id, rating, author, date, text}};
  }

  // Returns dummy data for content
  private getContent(): IChatWindowProps {
    const numberOfUsers = Math.round(Math.random() * 1000);
    const selectedChannel: IChannelHeaderProps = { currentChannelId: 0, title: 'Mia Khalifa', numberOfUsers };
    const message0 = this.getMessage(0);
    const message1 = this.getMessage(1);
    const message2 = this.getMessage(2);
    const messages = [message0, message1, message2];
    return {selectedChannel, messages};
  }
  // </editor-fold>

  private getProfileMenuItems(): IDropDownMenuItem[] {
    return [
      {title: 'Profile', action: () => this.toggleModal(true)},
      {title: 'Logout', action: () => this.props.onLogout()},
    ];
  }

  private toggleModal = (show: boolean) => {
    this.setState((prevState) => {
      return {...prevState, isUserModalVisible: show};
    });
  };

  public render(): JSX.Element {
    const channels = this.getChannels();
    const content = this.getContent();
    const profileMenuItems = this.getProfileMenuItems();

    return (
      <div className="MessageApp">
        <MessageAppHeader profileMenuItems={profileMenuItems}/>
        <ChannelList channels={channels}/>
        <ChatWindow messages={content.messages} selectedChannel={content.selectedChannel}/>

        <Modal bsSize="small" className={'text-center'} show={this.state.isUserModalVisible} onHide={() => this.toggleModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={'MessageApp__userModal_img rounded'}>
              <div className={'MessageApp__userModal_img-overlay'}>
                edit
              </div>
            </div>
            <div className="form-group">
              <input className="form-control text-center" value={this.props.userName}/>
                <small id="emailHelp" className="form-text text-muted">Here you can change your nick.</small>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.toggleModal(false)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
