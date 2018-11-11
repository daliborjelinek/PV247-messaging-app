import * as React from 'react';
import './MessageRate.less';

export interface IMessageRateOwnProps {
  isMyMessage: boolean;
  rating: number;
}

type IProps = IMessageRateOwnProps;

export class MessageRate extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    const actionIconClasses: string[] = [];

    // which icons will be shown depends on if I am author of displayed message
    if (this.props.isMyMessage) {
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
