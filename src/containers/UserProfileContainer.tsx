import {IMessageAppState} from '../models/IMessageAppState';
import {UserProfile, IUserProfileStateProps, IUserProfileDispatchProps} from '../components/UserProfile';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {hideDialog, updateProfile} from '../actions/UserProfileActions';



const mapStateToProps = (state: IMessageAppState): IUserProfileStateProps => {
  return {
    isUserDialogOpen: state.isUserDialogOpen,
    userProfile: state.loggedUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    hideUserDialog: () => dispatch(hideDialog()),
    updateProfile: (user: string, picture: File ) => dispatch(updateProfile(user, picture)),
  };
};

export const UserProfileContainer = connect<IUserProfileStateProps, IUserProfileDispatchProps>(mapStateToProps, mapDispatchToProps)(UserProfile);
