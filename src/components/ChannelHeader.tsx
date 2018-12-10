import * as React from 'react';
import {DropDownMenu, IDropDownMenuItem} from './DropDownMenu';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import '../styles/components/ChannelHeader.less';
import {ChangeEvent} from 'react';
import {InviteUsersDialogContainer} from '../containers/InviteUsersDialogContainer';

export interface IChannelHeaderStateProps {
  readonly channel: IMessageAppChannel | null;
  readonly isChannelNameEditingMode: boolean;
}


export interface IChannelHeaderDispatchProps {
  activateChannelNameEditingMode(): void;
  deactivateChannelNameEditingMode(): void;
  changeChannelName(id: Uuid, newName: string): void;
  removeChannel(id: Uuid): void;
  showInviteUsersDialog(): void;
}

interface IChannelHeaderState {
  readonly newChannelName: string;
}

type IProps = IChannelHeaderStateProps & IChannelHeaderDispatchProps;
type IState = IChannelHeaderState;

export class ChannelHeader extends React.PureComponent<IProps, IState> {

  // METHODS FROM TEMPLATE
  /**
   * Component is controlled. It stores values from channel name input.
   * @param e
   */
  private onNewChannelNameInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newChannelName = e.target.value;
    this.setState((): IState => {
      return { newChannelName };
    });
  };

  /**
   * Method for submitting new channel name.
   */
  onSubmitChannelName = (): void => {
    if (this.state.newChannelName === '') {
      // TODO - show messsage that input cannot be empty
      return;
    }
    this.props.changeChannelName(this.props.channel!.id, this.state.newChannelName);
    this.setState((): IState => {
      return { newChannelName: '' };
    });
  };

  /**
   * When renaming is canceled, component returns to
   * non-editing mode and newChannelName is set to default value
   */
  onCancelChannelNameEditing = (): void => {
    this.props.deactivateChannelNameEditingMode();
    this.setState((): IState => {
      return { newChannelName: '' };
    });
  };

  // LIFE-CYCLE METHODS
  constructor(props: IProps) {
    super(props);

    this.state = {
      newChannelName: '',
    };
  }

  /**
   * When channel is being renamed, input text field should be automatically focused.
   */
  componentDidUpdate() {
    if (this.props.isChannelNameEditingMode) {
      const channelNameInput = document.getElementsByClassName('ChannelHeader__input')[0] as HTMLInputElement;
      channelNameInput.focus();
      // if newChannelName is null, fill it with current channel name, return otherwise
      if (this.state.newChannelName !== '') {
        return;
      }
      // channel cannot be null, because dropdown menu is not visible, when no channel is selected
      const channelName = this.props.channel!.name;
      this.setState((): IState => {
        return { newChannelName: channelName };
      });
    }
  }

  // OTHER PRIVATE METHODS
  private getMenuItems(): IDropDownMenuItem[] {
    if (this.props.channel == null) {
      return [];
    }

    return [
      { title: 'Change name', action: () => this.props.activateChannelNameEditingMode() },
      { title: 'Invite member', action: () => this.props.showInviteUsersDialog()},
      { title: 'Delete', action: () => (this.props.removeChannel(this.props.channel!.id))},
    ];
  }

  // RENDERING
  public render(): JSX.Element {
    // channel doesn't exist
    if (this.props.channel == null) {
      return <div className={'ChannelHeader'} />;
    }

    // channel exists
    const countOfUsersInChannel = this.props.channel.userEmails.count();
    return (
      <div className={'ChannelHeader'}>
        <div className={'ChannelHeader__info'}>
          { !this.props.isChannelNameEditingMode ?
            (
              <h2 className={'ChannelHeader__title'}>{this.props.channel.name}</h2>
            ) :
            (
              <div className={'ChannelHeader__title ChannelHeader__title--edited'}>
                <input type={'text'} className={'form-control ChannelHeader__input'}
                       value={this.state.newChannelName} onChange={this.onNewChannelNameInputChange} />
                <button type={'button'} className={'btn btn-primary'}
                        onClick={this.onSubmitChannelName}>Submit</button>
                <button type={'button'} className={'btn btn-secondary'}
                        onClick={this.onCancelChannelNameEditing}>Cancel</button>
              </div>
            )
          }
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
        <InviteUsersDialogContainer/>
      </div>
    );
  }
}
