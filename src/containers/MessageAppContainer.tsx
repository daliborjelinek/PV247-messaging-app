import {Dispatch} from 'redux';
import {loadApp} from '../actions/loadAction';
import {connect} from 'react-redux';
import {IMessageAppDispatchProps, MessageApp} from '../components/MessageApp';
import {logout} from '../actions/logoutAction';
import {showDialog} from '../actions/UserProfileActions';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadApp: () =>  dispatch(loadApp()),
    onLogout: () => dispatch(logout()),
    showDialog: () =>  dispatch(showDialog()),
  };
};

export const MessageAppContainer = connect<void, IMessageAppDispatchProps>(null, mapDispatchToProps)(MessageApp);
