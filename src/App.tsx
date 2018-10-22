
import * as React from 'react';
import {LoginPage} from './components/LoginPage';
import {MessageApp} from './components/MessageApp';

interface IAppState {
  isLoggedIn: boolean;
  userName: string;
}

export class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props); // Must be called to properly build the base object and initialize its prototype.

    // TODO Create real state
    this.state = {
      isLoggedIn: false,
      userName: '',
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  private onLogin(userName: string, password: string) {
    console.log(`Username: ${userName}, password: ${password}`);
    this.setState((prevState) => {
      return {...prevState, isLoggedIn: true, userName};
    });
  }

  private onLogout() {
    this.setState((prevState) => {
      return {...prevState, isLoggedIn: false};
    });
  }

  render(): JSX.Element {
    // select view: login page / message app
    const isLoggedIn = this.state.isLoggedIn;

    if (isLoggedIn) {
      return <MessageApp userName={this.state.userName} onLogout={this.onLogout}/>;
    } else {
      return <LoginPage onLogin={this.onLogin}/>;
    }
  }
}
