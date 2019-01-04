import {connect} from 'react-redux';
import {IMessageAppState} from '../models/IMessageAppState';
import {IInviteUsersListStateProps, InviteUsersList} from '../components/InviteUsersList';
import {getUsersForInvitation} from '../selectors/messageAppSelectors';

const mapStateToProps = (state: IMessageAppState): IInviteUsersListStateProps => {
  return {
    users: getUsersForInvitation(state),
  };
};

export const InviteUsersListContainer = connect<IInviteUsersListStateProps>(mapStateToProps)(InviteUsersList);
