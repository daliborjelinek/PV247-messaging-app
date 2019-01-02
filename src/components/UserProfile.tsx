import {Button, Modal} from 'react-bootstrap';
import '../styles/components/UserProfile.less';
import * as React from 'react';
import {IMessageAppUser} from '../models/IMessageAppUser';
import {ChangeEvent} from 'react';

export interface IUserProfileStateProps {
  readonly isUserDialogOpen: boolean;
  readonly userProfile: IMessageAppUser | null;
}

export interface IUserProfileDispatchProps {
  hideUserDialog(): void;
  updateProfile(newUserName: string, picture: File | null): void;
}

export interface IUserProfileState {
  readonly newUserName: string;
  readonly imagePreview: string | null;
  readonly imageFile: File | null;
}

type IProps = IUserProfileStateProps & IUserProfileDispatchProps;

export class UserProfile extends React.PureComponent<IProps, IUserProfileState> {

  private fileInputRef = React.createRef<HTMLInputElement>();



  private onNewUserNameInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newUserName = e.target.value;
    this.setState((state): IUserProfileState => {
      return { ...state, newUserName };
    });
  };

  private  onFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const imageFile = e.target!.files![0];
    this.setState((state): IUserProfileState => {
      return { ...state, imageFile};
    });
    const reader = new FileReader();
    reader.onload = () => this.showPreview(reader.result);
    reader.readAsDataURL(imageFile);
  };

  private showPreview = (image: string | ArrayBuffer | null): void => {
    this.setState((state): IUserProfileState => {
      if ( typeof image ===  'string') {
        return { ...state, imagePreview: image};
      }
      else {
        return state;
      }
    });
  };

  private onSave = (): void => {
    this.props.updateProfile(this.state.newUserName, this.state.imageFile);
    this.props.hideUserDialog();
  };

  public constructor(props: IProps) {
    super(props);
    this.state = {
      newUserName: props.userProfile!.userName,
      imagePreview: props.userProfile!.picture!,
      imageFile: null,
    };

  }

  public render(): JSX.Element {
    return(
      <Modal bsSize="small" className={'text-center'} show={this.props.isUserDialogOpen} onHide={() => this.props.hideUserDialog()}>
      <Modal.Header closeButton>
        <Modal.Title>User settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div onClick={() => this.fileInputRef.current!.click()} className={'UserProfile__userModal_imgWrap'}>
          <img className={'UserProfile__userModal_img'} src={this.state.imagePreview!} alt={'Profile picture'}/>
          <div className={'UserProfile__userModal_img-overlay'}>
            edit
          </div>
        </div>
        <input type="file" accept="image/*" onChange={this.onFileChange} id="file" ref={this.fileInputRef} style={{display: 'none'}}/>
        <div className={'mt-3'}>
          {this.props.userProfile!.email}
        </div>
        <div className="form-group">
          <input onChange={this.onNewUserNameInputChange} className="form-control text-center" value={this.state.newUserName}/>
          <small id="emailHelp" className="form-text text-muted">Here you can change your nick.</small>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.onSave}>Save</Button>
      </Modal.Footer>
    </Modal>);
  }
}
