import {Dispatch} from 'redux';
import {logIn} from '../actions/loginAction';
import {connect} from 'react-redux';
import {ILoginPageDispatchProps, LoginPage} from '../components/LoginPage';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogin: (email: string, password: string) =>  dispatch(logIn(email, password)),
  };
};

export const LoginPageContainer = connect<void, ILoginPageDispatchProps>(null, mapDispatchToProps)(LoginPage);
