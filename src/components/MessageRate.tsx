import * as React from 'react';
import * as  PropTypes from 'prop-types';
import './MessageRate.less';

interface IMessageRating {
  readonly rating: number;
  readonly isMyMessage: boolean;
}

export class MessageRate extends React.PureComponent<IMessageRating> {

  static propTypes = {
    rating: PropTypes.number.isRequired,
    isMyMessage: PropTypes.bool.isRequired,
  };

  public render(): JSX.Element {
    const actionIconClasses: string[] = [];

    // which icons will be shown depends on if I am author of displayed message
    if (this.props.isMyMessage) {
      actionIconClasses.push('glyphicon glyphicon-pencil');
      actionIconClasses.push('glyphicon glyphicon-trash');
    } else {
      actionIconClasses.push('glyphicon glyphicon-plus');
      actionIconClasses.push('glyphicon glyphicon-minus');
    }

    return (
      <div className={'MessageRate'}>
        <div className={'MessageRate__actionIcons'}>
          {actionIconClasses.map((iconClass, index) => {
            return <span className={iconClass} key={index} />;
          })}
        </div>
        <div className={'MessageRate__rating badge badge-pill'}>{this.props.rating}</div>
      </div>
    );
  }
}
