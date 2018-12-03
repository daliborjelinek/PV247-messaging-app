import {Dispatch} from 'redux';
import {clearAuthenticationErrorMessage, logIn} from '../actions/loginAction';
import {connect} from 'react-redux';
import {ILoginPageDispatchProps, ILoginPageStateProps, LoginPage} from '../components/LoginPage';
import {IMessageAppState} from '../models/IMessageAppState';

const mapStateToProps = (state: IMessageAppState): ILoginPageStateProps => {
  return {
    loginError: state.loginPageError,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ILoginPageDispatchProps => {
  return {
    onLogin: (email: string, password: string) =>  dispatch(logIn(email, password)),
    onPasswordChange: () => dispatch(clearAuthenticationErrorMessage()),
  };
};

export const LoginPageContainer = connect<void, ILoginPageDispatchProps>(mapStateToProps, mapDispatchToProps)(LoginPage);
