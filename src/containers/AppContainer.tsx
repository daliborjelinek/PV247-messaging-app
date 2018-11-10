import {IMessageAppState} from '../models/IMessageAppState';
import {connect} from 'react-redux';
import {App, IAppDispatchProps, IAppStateProps} from '../App';
import {Dispatch} from 'redux';
import {autoLogin} from '../actions/loginAction';

const mapStateToProps = (state: IMessageAppState): IAppStateProps => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
};

export const AppContainer = connect<IAppStateProps, IAppDispatchProps>(mapStateToProps, mapDispatchToProps)(App);
