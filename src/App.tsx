import * as React from 'react';
import {LoginPageContainer} from './containers/LoginPageContainer';
import {MessageAppContainer} from './containers/MEssageAppContainer';

export interface IAppStateProps {
  isLoggedIn: boolean;
}

type IProps = IAppStateProps;

/**
 * This class represents whole application. It show login form or message app.
 * Which component is rendered depends on user status (logged in/not logged in).
 */
export class App extends React.Component<IProps> {

  render(): JSX.Element {
    // select view: login page / message app
    const isLoggedIn = this.props.isLoggedIn;
    console.log('Is logged in: ' + isLoggedIn);
    if (isLoggedIn) {
      return <MessageAppContainer />;
    } else {
      return <LoginPageContainer />;
    }
  }
}
