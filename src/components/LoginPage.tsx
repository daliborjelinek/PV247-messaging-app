import * as React from 'react';
import {ChangeEvent, FormEvent} from 'react';
import * as  PropTypes from 'prop-types';
import './LoginPage.less';

interface ILoginPagePropsEvents {
  onLogin(userName: string, password: string): void;
}

interface ILoginPageProps extends ILoginPagePropsEvents {
}

interface ILoginPageState {
  readonly userName: string;
  readonly password: string;
}

export class LoginPage extends React.PureComponent<ILoginPageProps, ILoginPageState> {

  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  private onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    this.props.onLogin(this.state.userName, this.state.password);
  };

  private onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  constructor(props: ILoginPagePropsEvents) {
    super(props);

    this.state = {
      userName: '',
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
            <label htmlFor={'fullNameInput'} className={'label-top'}>Full Name:</label>
            <input type={'text'} id={'fullNameInput'} value={this.state.userName}
                   name={'userName'} className={'form-control'}
                   onChange={this.onChange}/>
          </div>
          <div className={'form-group'}>
            <label htmlFor={'passwordInput'} className={'label-top'}>Password:</label>
            <input type={'password'} id={'passwordInput'} value={this.state.password}
                   name={'password'} className={'form-control'}
                   onChange={this.onChange}/>
          </div>
          <input type={'submit'} value={'Login'}
                 className={'btn btn-primary block'}/>
        </form>
      </div>
    );
  }
}
