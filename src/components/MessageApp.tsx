import * as React from 'react';

import {IDropDownMenuItem} from './DropDownMenu';
import {ChatWindow} from './ChatWindow';
import {MessageAppHeader} from './MessageAppHeader';
import {Button, Modal} from 'react-bootstrap';

import './MessageApp.less';
import {ChannelListContainer} from '../containers/ChannelListContainer';

export interface IMessageAppDispatchProps {
  loadApp(): void;
  onLogout(): void;
}

interface IMessageAppState {
  readonly isUserModalVisible: boolean;
}

type IProps = IMessageAppDispatchProps;

/**
 * This class represents message app.
 */
export class MessageApp extends React.PureComponent<IProps, IMessageAppState> {

  public constructor(props: IMessageAppDispatchProps) {
    super(props);

    this.state = {
      isUserModalVisible: true,
    };
  }

  componentDidMount() {
    this.props.loadApp();
  }

  private getProfileMenuItems(): IDropDownMenuItem[] {
    return [
      {title: 'Profile', action: () => this.toggleModal(true)},
      {title: 'Logout', action: () => this.props.onLogout()},
    ];
  }

  private toggleModal = (show: boolean) => {
    this.setState((prevState) => {
      return {...prevState, isUserModalVisible: show};
    });
  };

  public render(): JSX.Element {
    const profileMenuItems = this.getProfileMenuItems();

    return (
      <div className="MessageApp">
        <MessageAppHeader profileMenuItems={profileMenuItems}/>
        <ChannelListContainer />
        <ChatWindow />

        <Modal bsSize="small" className={'text-center'} show={this.state.isUserModalVisible} onHide={() => this.toggleModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={'MessageApp__userModal_img rounded'}>
              <div className={'MessageApp__userModal_img-overlay'}>
                edit
              </div>
            </div>
            <div className="form-group">
              <input className="form-control text-center" value={/*this.props.userName*/'JOHN DOE'}/>
                <small id="emailHelp" className="form-text text-muted">Here you can change your nick.</small>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.toggleModal(false)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
