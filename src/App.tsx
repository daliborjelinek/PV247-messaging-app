
import * as React from 'react';

export class App extends React.Component {
  constructor(props: any) {
    super(props); // Must be called to properly build the base object and initialize its prototype.

    this.state = {
      nick: '',
      message: '',
      messages: [],
    };
  }

  render(): JSX.Element {
    return (
      <div className="wrapper">
        <div className={'header'}>
          <h1>PV247</h1>
          <div className="avatar"> <span className="glyphicon glyphicon-user"/></div>
        </div>
        <div className={'sidebar'}>
          <h3>Channels</h3>
          <ul>
            <li><span>dawd</span> <span className="badge  badge-pill">3</span></li>
            <li>smth</li>
            <li>smth</li>
          </ul>
          <button type="button" className="btn btn-secondary btn-sm btn-block">New channel</button>
        </div>
        <div className={'content'}>
          <div>Headline</div>
          <div><img src={'favicon.ico'}/></div>
        </div>
      </div>
    );
  }

}
