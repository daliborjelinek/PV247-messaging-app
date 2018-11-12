import * as React from 'react';
import './MessageRate.less';

export interface IMessageRateOwnProps {
  isMyMessage: boolean;
  rating: number;
  messageId: Uuid;
}

export interface IMessageRateDispatchProps {
  deleteMessage(messageId: Uuid): void;
}

type IProps = IMessageRateOwnProps & IMessageRateDispatchProps;

export class MessageRate extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    let actionElements: any = null;
    // which icons will be shown depends on if I am author of displayed message
    if (this.props.isMyMessage) {
      actionElements = (
        <div className={'MessageRate__actionIcons'}>
          <span className={'glyphicon glyphicon-trash'}
                onClick={() => this.props.deleteMessage(this.props.messageId)} />
        </div>
      );
    } else {
      actionElements = (
        <div className={'MessageRate__actionIcons'}>
          <span className={'glyphicon glyphicon-plus'} />
          <span className={'glyphicon glyphicon-minus'} />
        </div>);
    }

    return (
      <div className={'MessageRate'}>
        {actionElements}
        <div className={'MessageRate__rating badge badge-pill'}>{this.props.rating}</div>
      </div>
    );
  }
}
