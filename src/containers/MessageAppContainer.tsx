import {Dispatch} from 'redux';
import {loadApp} from '../actions/loadAction';
import {connect} from 'react-redux';
import {IMessageAppDispatchProps, MessageApp} from '../components/MessageApp';
import {logoutAction} from '../actions/logoutAction';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadApp: () =>  dispatch(loadApp()),
    onLogout: () => dispatch(logoutAction()),
  };
};

export const MessageAppContainer = connect<void, IMessageAppDispatchProps>(null, mapDispatchToProps)(MessageApp);
