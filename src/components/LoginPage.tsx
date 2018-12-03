import * as React from 'react';
import {ChangeEvent, FormEvent} from 'react';
import '../styles/components/LoginPage.less';
import {LOGIN_BAD_PASSWORD, LOGIN_ERROR} from '../constants/errors';
import {FormFieldError} from './FormFieldError';

export interface ILoginPageStateProps {
  readonly loginError: LOGIN_ERROR | null;
}

export interface ILoginPageDispatchProps {
  onLogin(userName: string, password: string): void;
  onPasswordChange(): void;
}

interface ILoginPageState {
  // email/username
  readonly email: string;
  readonly password: string;
}

type IProps = ILoginPageStateProps & ILoginPageDispatchProps;

/**
 * Login page component.
 */
export class LoginPage extends React.PureComponent<IProps, ILoginPageState> {

  private onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    this.props.onLogin(this.state.email, this.state.password);
  };

  private onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState((prevState) => {
      return {...prevState, [name]: value};
    });

    // hide error message when text is changed
    if (this.props.loginError === LOGIN_BAD_PASSWORD) {
      this.props.onPasswordChange();
    }
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  public render(): JSX.Element {
    return (
      <div className={'LoginPage'}>
        <form className={'LoginPage__form'} onSubmit={this.onSubmit}>
          <div className={'avatar'}>
            <span className={'glyphicon glyphicon-user'}/>
          </div>
          <div className={'form-group'}>
            <label htmlFor={'emailInput'} className={'label-top'}>Email:</label>
            <input type={'email'} id={'emailInput'} value={this.state.email}
                   name={'email'} className={'form-control'}
                   onChange={this.onChange}/>
          </div>
          <div className={'form-group'}>
            <label htmlFor={'passwordInput'} className={'label-top'}>Password:</label>
            <input type={'password'} id={'passwordInput'} value={this.state.password}
                   name={'password'} className={'form-control'}
                   onChange={this.onChange}/>
            <FormFieldError>
              {this.props.loginError === 'LOGIN_BAD_PASSWORD' ? 'Incorrect password' : ''}
            </FormFieldError>
          </div>
          <input type={'submit'} value={'Login'}
                 className={'btn btn-primary block'}/>
        </form>
      </div>
    );
  }
}
