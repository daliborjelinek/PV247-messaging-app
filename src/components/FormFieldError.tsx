import * as React from 'react';
import '../styles/components/FormFieldError.less';

/**
 * Error for form field.
 */
export class FormFieldError extends React.PureComponent {


  public render(): JSX.Element | null {
    if (this.props.children == null || this.props.children === '') {
      return null;
    }
    return (
      <span className={'FormFieldError invalid-feedback'}>
        {this.props.children}
      </span>
    );
  }
}
