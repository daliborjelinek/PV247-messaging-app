import * as React from 'react';
import {IMessageAppUser} from '../models/IMessageAppUser';
import '../styles/components/InviteUsersItem.less';
import {MouseEvent} from 'react';

interface IInviteUsersItemOwnProps {
  readonly user: IMessageAppUser;
}

export interface IInviteUsersItemDispatchProps {
  addUserToChannel(email: string): void;
}

interface IInviteUsersItemState {
  isInvited: boolean;
}

type IProps = IInviteUsersItemOwnProps & IInviteUsersItemDispatchProps;
type IState = IInviteUsersItemState;
/**
 * Component for invite user to channel item.
 */
export class InviteUsersItem extends React.PureComponent<IProps, IState> {

  private onInvite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState((state) => ({ ...state, isInvited: true }));
    this.props.addUserToChannel(this.props.user.email);
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      isInvited: false,
    };
  }

  public render(): JSX.Element {
    const pictureUrl = this.props.user.pictureUrl;

    return (
      <div className={'InviteUsersItem'}>
        <div className={'InviteUsersItem__picture'} style={{backgroundImage: `url(${pictureUrl}`}} />
        <div className={'InviteUsersItem__userName'}>{this.props.user.userName}</div>
        <button className={'btn btn-primary InviteUsersItem__inviteBtn'} disabled={this.state.isInvited}
                onClick={this.onInvite}>Invite</button>
      </div>
    );
  }
}
