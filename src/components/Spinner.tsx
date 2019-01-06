import * as React from 'react';
import '../styles/components/Spinner.less';


export class Spinner extends React.PureComponent {

  public render(): JSX.Element {
    return (
      <div className={'spinner__wrapper'}>
        <div className="spinner">
          <div className="bounce1"/>
          <div className="bounce2"/>
          <div className="bounce3"/>
        </div>
      </div>
    );
  }
}
