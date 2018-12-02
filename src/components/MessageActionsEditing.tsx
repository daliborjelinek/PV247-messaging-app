import * as React from 'react';
import '../styles/components/MessageActions.less';

export interface IMessageActionsEditingOwnProps {
  messageId: Uuid;
}

export interface IMessageActionsEditingDispatchProps {
  deleteMessage(id: Uuid): void;
}

type IProps = IMessageActionsEditingOwnProps & IMessageActionsEditingDispatchProps;

/**
 * Actions over messages, when message author is logged user. Right now, app supports only delete message function.
 */
export class MessageActionsEditing extends React.PureComponent<IProps> {

  private onDeleteMessage = () => {
    this.props.deleteMessage(this.props.messageId);
  };

  public render(): JSX.Element {
    return (
      <div className={'MessageActions__actionIcons'}>
          <span className={'glyphicon glyphicon-trash'}
                onClick={this.onDeleteMessage} />
      </div>
    );
  }
}
