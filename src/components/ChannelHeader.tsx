import * as React from 'react';
import {DropDownMenu, IDropDownMenuItem} from './DropDownMenu';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import './ChannelHeader.less';

export interface IChannelHeaderStateProps {
  readonly channel: IMessageAppChannel | null;
}

type IProps = IChannelHeaderStateProps;

export class ChannelHeader extends React.PureComponent<IProps> {

  private getMenuItems(): IDropDownMenuItem[] {
    return [
      {title: 'Change name', action: () => console.log('Change channel name')},
      {title: 'Invite member', action: () => console.log('Invite member')},
      {title: 'Delete', action: () => console.log('Delete channel')},
    ];
  }

  public render(): JSX.Element {
    // channel doesn't exist
    if (this.props.channel == null) {
      return <div className={'ChannelHeader'} />;
    }

    // channel exists
    const countOfUsersInChannel = this.props.channel.userIds.size;
    return (
      <div className={'ChannelHeader'}>
        <div className={'ChannelHeader__info'}>
          <h2 className={'ChannelHeader__title'}>{this.props.channel.name}</h2>
          <div className={'ChannelHeader__numberOfUsers'}>
            <span className={'glyphicon glyphicon-user'} />
            <span>{countOfUsersInChannel}</span>
          </div>
        </div>
        <div className={'ChannelHeader__actions'}>
          <span className={'glyphicon glyphicon-search'} />
          <DropDownMenu items={this.getMenuItems()}
                        iconClass={'glyphicon glyphicon-menu-hamburger'}
                        openMenuDirection={'RIGHT'}/>
        </div>
      </div>
    );
  }
}
