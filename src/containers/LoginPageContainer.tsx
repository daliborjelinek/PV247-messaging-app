import {Dispatch} from 'redux';
import {logIn} from '../actions/loginAction';
import {connect} from 'react-redux';
import {ILoginPageDispatchProps, LoginPage} from '../components/LoginPage';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogin: (username: string, password: string) =>  dispatch(logIn(username, password)),
  };
};

export const LoginPageContainer = connect<void, ILoginPageDispatchProps>(null, mapDispatchToProps)(LoginPage);
