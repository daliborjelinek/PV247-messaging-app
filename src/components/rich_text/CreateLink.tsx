import * as React from 'react';
import {FormEvent, MouseEvent, SyntheticEvent} from 'react';
import {EditorState} from 'draft-js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, FormControl, FormGroup} from 'react-bootstrap';
import '../../styles/components/rich_text/CreateLink.less';

interface ICreateLinkOwnProps {
  editorState: EditorState;
  onSubmitUrl(url: string): void;
}

type IProps = ICreateLinkOwnProps;
type IState = {
  isUrlInputVisible: boolean;
  urlInputValue: string;
};

export class CreateLink extends React.PureComponent<IProps, IState> {

  private preventDefault = (e: SyntheticEvent<any>) => {
    e.preventDefault();
  };

  private onLinkClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const {editorState} = this.props;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState((prevState) => ({
        ...prevState,
        isUrlInputVisible: true,
        urlInputValue: url,
      }));

    }
  };

  private onUrlChange = (e: FormEvent<FormControl>) => {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    this.setState(prevState => ({...prevState, urlInputValue: value}));
  };

  private onSubmitUrl = (e: MouseEvent<Button>) => {
    e.preventDefault();
    this.props.onSubmitUrl(this.state.urlInputValue);
    this.setState(prevState => ({...prevState, urlInputValue: '', isUrlInputVisible: false}));
  };

  private onCloseUrlSelection = (e: MouseEvent<Button>) => {
    e.preventDefault();
    this.setState((prevState) => ({...prevState, urlInputValue: '', isUrlInputVisible: false}));
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      isUrlInputVisible: false,
      urlInputValue: '',
    };
  }

  public render(): JSX.Element {
    return (
      <div className={'CreateLink'}>
        <span onMouseDown={this.preventDefault} onClick={this.onLinkClick}>
          <FontAwesomeIcon icon={'link'} size={'lg'} />
        </span>

        { this.state.isUrlInputVisible && (
          <form className={'CreateLink__form'}>
            <FormGroup controlId={'urlText'}>
              <FormControl
                type="text"
                value={this.state.urlInputValue}
                placeholder="Enter url"
                onChange={this.onUrlChange}
              />
            </FormGroup>
            <Button bsStyle="primary" onClick={this.onSubmitUrl}>Submit</Button>
            <Button onClick={this.onCloseUrlSelection}>Close</Button>
          </form>
        )}
      </div>
    );
  }
}
