import * as React from 'react';
import {IMessageAppUser} from '../models/IMessageAppUser';
import '../styles/components/InviteUsersItem.less';

interface IInviteUsersItemOwnProps {
  readonly user: IMessageAppUser;
}

export interface IInviteUsersItemDispatchProps {
  addUserToChannel(email: string): void;
}

type IProps = IInviteUsersItemOwnProps & IInviteUsersItemDispatchProps;

export class InviteUsersItem extends React.PureComponent<IProps> {

  private onInvite = () => {
    this.props.addUserToChannel(this.props.user.email);
  };

  public render(): JSX.Element {
    const pictureUrl = this.props.user.pictureUrl;

    return (
      <div className={'InviteUsersItem'}>
        <div className={'InviteUsersItem__picture'} style={{backgroundImage: `url(${pictureUrl}`}} />
        <div className={'InviteUsersItem__userName'}>{this.props.user.userName}</div>
        <button className={'btn btn-primary InviteUsersItem__inviteBtn'}
                onClick={this.onInvite}>Invite</button>
      </div>
    );
  }
}
