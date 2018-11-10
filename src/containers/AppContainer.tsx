import {IMessageAppState} from '../models/IMessageAppState';
import {connect} from 'react-redux';
import {App, IAppStateProps} from '../App';

const mapStateToProps = (state: IMessageAppState): IAppStateProps => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export const AppContainer = connect<IAppStateProps, void>(mapStateToProps)(App);
