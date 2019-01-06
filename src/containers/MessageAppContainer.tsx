import {Dispatch} from 'redux';
import {loadApp} from '../actions/loadActions';
import {connect} from 'react-redux';
import {IMessageAppDispatchProps, MessageApp} from '../components/MessageApp';
import {logout} from '../actions/logoutActions';
import {showDialog} from '../actions/userProfileActions';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadApp: () =>  dispatch(loadApp()),
    onLogout: () => dispatch(logout()),
    showDialog: () =>  dispatch(showDialog()),
  };
};

export const MessageAppContainer = connect<void, IMessageAppDispatchProps>(null, mapDispatchToProps)(MessageApp);
