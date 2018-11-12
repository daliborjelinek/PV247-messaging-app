import {Button, Modal} from 'react-bootstrap';
import './UserProfile.less';
import * as React from 'react';

export interface IUserProfileStateProps {
  readonly isUserDialogOpen: boolean;
}

export interface IUserProfileDispatchProps {
  showUserDialog(): void;
  hideUserDialog(): void;
}

type IProps = IUserProfileStateProps & IUserProfileDispatchProps;

export class UserProfile extends React.PureComponent<IProps> {

  public constructor(props: IProps) {
    super(props);

  }

  public render(): JSX.Element {
    return(
      <Modal bsSize="small" className={'text-center'} show={this.props.isUserDialogOpen} onHide={() => this.props.hideUserDialog()}>
      <Modal.Header closeButton>
        <Modal.Title>User settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={'UserProfile__userModal_img rounded'}>
          <div className={'UserProfile__userModal_img-overlay'}>
            edit
          </div>
        </div>
        <div className="form-group">
          <input className="form-control text-center" value={/*this.props.userName*/'JOHN DOE'}/>
          <small id="emailHelp" className="form-text text-muted">Here you can change your nick.</small>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.props.hideUserDialog()}>Save</Button>
      </Modal.Footer>
    </Modal>);
  }
}
