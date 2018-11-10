import * as React from 'react';
import {LoginPageContainer} from './containers/LoginPageContainer';
import {MessageAppContainer} from './containers/MEssageAppContainer';

export interface IAppStateProps {
  readonly isLoggedIn: boolean;
}

export interface IAppDispatchProps {
  autoLogin(): void;
}

type IProps = IAppStateProps & IAppDispatchProps;

/**
 * This class represents whole application. It show login form or message app.
 * Which component is rendered depends on user status (logged in/not logged in).
 */
export class App extends React.Component<IProps> {

  componentDidMount() {
    this.props.autoLogin();
  }

  render(): JSX.Element {
    // select view: login page / message app
    const isLoggedIn = this.props.isLoggedIn;
    if (isLoggedIn) {
      return <MessageAppContainer />;
    } else {
      return <LoginPageContainer />;
    }
  }
}
