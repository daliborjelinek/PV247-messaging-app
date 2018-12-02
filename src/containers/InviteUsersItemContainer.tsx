import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {addUserToActiveChannel} from '../actions/channelActions';
import {IInviteUsersItemDispatchProps, InviteUsersItem} from '../components/InviteUsersItem';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addUserToChannel: (email: string) => dispatch(addUserToActiveChannel(email)),
  };
};

export const InviteUsersItemContainer = connect<void, IInviteUsersItemDispatchProps>(null,
  mapDispatchToProps)(InviteUsersItem);

