import * as React from 'react';

import {IDropDownMenuItem} from './DropDownMenu';
import {ChatWindowContainer} from '../containers/ChatWindowContainer';
import {MessageAppHeader} from './MessageAppHeader';
import '../styles/components/MessageApp.less';
import {ChannelListContainer} from '../containers/ChannelListContainer';
import {UserProfileContainer} from '../containers/UserProfileContainer';
import {AlertCloseableContainer} from '../containers/AlertCloseableContainer';


export interface IMessageAppDispatchProps {
  loadApp(): void;
  onLogout(): void;
  showDialog(): void;
}


type IProps = IMessageAppDispatchProps;

/**
 * This class represents message app.
 */
export class MessageApp extends React.PureComponent<IProps> {

  public constructor(props: IMessageAppDispatchProps) {
    super(props);
  }

  componentDidMount() {
    this.props.loadApp();
  }

  private getProfileMenuItems(): IDropDownMenuItem[] {
    return [
      {title: 'Profile', action: () => this.props.showDialog()},
      {title: 'Logout', action: () => this.props.onLogout()},
    ];
  }

  public render(): JSX.Element {
    const profileMenuItems = this.getProfileMenuItems();

    return (
      <div className="MessageApp">
        <AlertCloseableContainer />
        <MessageAppHeader profileMenuItems={profileMenuItems}/>
        <ChannelListContainer />
        <ChatWindowContainer />
        <UserProfileContainer/>
      </div>
    );
  }
}
