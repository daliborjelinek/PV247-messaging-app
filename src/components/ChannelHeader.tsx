import * as React from 'react';
import * as  PropTypes from 'prop-types';
import {DropDownMenu, IDropDownMenuItem} from './DropDownMenu';
import './ChannelHeader.less';

export interface IChannelHeaderProps {
  readonly title: string;
  readonly numberOfUsers: number;
  readonly currentChannelId: number;
}

export class ChannelHeader extends React.PureComponent<IChannelHeaderProps> {

  static propTypes = {
    title: PropTypes.string.isRequired,
    numberOfUsers: PropTypes.number.isRequired,
    currentChannelId: PropTypes.number.isRequired,
  };

  private getMenuItems(): IDropDownMenuItem[] {
    return [
      {title: 'Change name', action: () => console.log('Change channel name')},
      {title: 'Invite member', action: () => console.log('Invite member')},
      {title: 'Delete', action: () => console.log('Delete channel')},
    ];
  }

  public render(): JSX.Element {
    return (
      <div className={'ChannelHeader'}>
        <div className={'ChannelHeader__info'}>
          <h2 className={'ChannelHeader__title'}>{this.props.title}</h2>
          <div className={'ChannelHeader__numberOfUsers'}>
            <span className={'glyphicon glyphicon-user'} />
            <span>{this.props.numberOfUsers}</span>
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
