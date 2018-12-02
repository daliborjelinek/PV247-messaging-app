import * as React from 'react';
import {Button, Modal, ModalBody} from 'react-bootstrap';
import {InviteUsersListContainer} from '../containers/InviteUsersListContainer';

export interface IInviteUserModalStateProps {
  isInviteUserDialogVisible: boolean;
}

export interface IInviteUserModalDispatchProps {
  showInviteUserDialog(): void;
  hideInviteUserDialog(): void;
}

type IProps = IInviteUserModalStateProps & IInviteUserModalDispatchProps;

/**
 * Modal dialog for inviting users to the channel.
 */
export class InviteUsersDialog extends React.PureComponent<IProps> {

  private onHide = (): void => {
    this.props.hideInviteUserDialog();
  };

  public render(): JSX.Element {
    return (
      <Modal bsSize={'small'}
             show={this.props.isInviteUserDialogVisible}
             onHide={this.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Invite users to channel</Modal.Title>
        </Modal.Header>
        <ModalBody>
          <InviteUsersListContainer />
        </ModalBody>
        <Modal.Footer>
          <Button onClick={this.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
