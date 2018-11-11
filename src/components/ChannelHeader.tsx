import * as React from 'react';
import {DropDownMenu, IDropDownMenuItem} from './DropDownMenu';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import './ChannelHeader.less';

export interface IChannelHeaderStateProps {
  readonly channel: IMessageAppChannel | null;
}

export interface IChannelHeaderDispatchProps {
  changeChannelName(id: Uuid, newName: string): void;
  removeChannel(id: Uuid): void;
}

type IProps = IChannelHeaderStateProps & IChannelHeaderDispatchProps;

export class ChannelHeader extends React.PureComponent<IProps> {

  private getMenuItems(): IDropDownMenuItem[] {
    if (this.props.channel == null) {
      return [];
    }

    // TODO create dialog/input for changing the name of the channel
    return [
      { title: 'Change name', action: () => this.props.changeChannelName(this.props.channel!.id, 'CHANNEL_RENAMED')},
      { title: 'Invite member', action: () => console.log('Invite member')},
      { title: 'Delete', action: () => (this.props.removeChannel(this.props.channel!.id))},
    ];
  }

  public render(): JSX.Element {
    // channel doesn't exist
    if (this.props.channel == null) {
      return <div className={'ChannelHeader'} />;
    }

    // channel exists
    const countOfUsersInChannel = this.props.channel.userIds.count();
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
