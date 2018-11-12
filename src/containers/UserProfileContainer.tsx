import {IMessageAppState} from '../models/IMessageAppState';
import {UserProfile, IUserProfileStateProps, IUserProfileDispatchProps} from '../components/UserProfile';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {showDialog} from '../actions/UserProfileActions';
import {hideDialog} from '../actions/UserProfileActions';


const mapStateToProps = (state: IMessageAppState): IUserProfileStateProps => {
  return {
    isUserDialogOpen: state.isUserDialogOpen,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    showUserDialog: () =>  dispatch(showDialog()),
    hideUserDialog: () => dispatch(hideDialog()),
  };
};

export const UserProfileContainer = connect<IUserProfileStateProps, IUserProfileDispatchProps>(mapStateToProps, mapDispatchToProps)(UserProfile);
