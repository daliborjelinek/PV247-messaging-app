import * as React from 'react';
import * as Immutable from 'immutable';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {InviteUsersItemContainer} from '../containers/InviteUsersItemContainer';

export interface IInviteUsersListStateProps {
  users: Immutable.List<IMessageAppUser>;
}

type IProps = IInviteUsersListStateProps;

/**
 * Component for list of users which can be invited to the channel.
 */
export class InviteUsersList extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    return (
      <div className={'InviteUsersList'}>
        {this.props.users.map((user) => (
          <InviteUsersItemContainer user={user} key={user.email}/>
        ))}
      </div>
    );
  }
}
