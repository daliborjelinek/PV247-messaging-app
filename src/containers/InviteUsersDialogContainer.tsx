import {IMessageAppState} from '../models/IMessageAppState';
import {IInviteUserModalDispatchProps, IInviteUserModalStateProps, InviteUsersDialog} from '../components/InviteUsersDialog';
import {Dispatch} from 'redux';
import {hideInviteUsersToChannelDialog, showInviteUsersToChannelDialog} from '../actions/appearanceActions';
import {connect} from 'react-redux';


const mapStateToProps = (state: IMessageAppState): IInviteUserModalStateProps => {
  return {
    isInviteUserDialogVisible: state.isInviteUsersDialogOpen,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IInviteUserModalDispatchProps => {
  return {
    hideInviteUserDialog: () => dispatch(hideInviteUsersToChannelDialog()),
    showInviteUserDialog: () => dispatch(showInviteUsersToChannelDialog()),
  };
};

export const InviteUsersDialogContainer = connect<IInviteUserModalStateProps, IInviteUserModalDispatchProps>(mapStateToProps,
  mapDispatchToProps)(InviteUsersDialog);
