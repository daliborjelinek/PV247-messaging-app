import * as React from 'react';
import * as Immutable from 'immutable';
import {Alert} from 'react-bootstrap';
import '../styles/components/AlertCloseable.less';

export interface IAlertCloseableStateProps {
  isVisible: boolean;
  messages: Immutable.List<string>;
}

export interface IAlertCloseableDispatchProps {
  hide(): void;
}

type IProps = IAlertCloseableStateProps & IAlertCloseableDispatchProps;

/**
 * Component for alert. Alert can be hided.
 */
export class AlertCloseable extends React.PureComponent<IProps> {

  private onHide = (): void => {
    this.props.hide();
  };

  public render(): JSX.Element | null {
    if (!this.props.isVisible || this.props.messages.isEmpty()) {
      return null;
    }

    return (
      <Alert bsStyle={'danger'} onDismiss={this.onHide} className={'AlertCloseable'}>
        {this.props.messages.map((message, index) => (
          <div className={'AlertCloseable__message'} key={index}>{message}</div>
        ))}
      </Alert>
    );
  }
}
