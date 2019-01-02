import * as React from 'react';
import ReactQuill from 'react-quill';
import '../styles/components/MessageRichTextEditor.less';

export interface IMessageEditorDispatchProps {
  addMessage(messageText: string): void;
}

export interface IMessageEditorStateProps {
  channelSelected: boolean;
}

type IProps = IMessageEditorDispatchProps & IMessageEditorStateProps;
type IState = { text: string };

export class MessageRichTextEditor extends React.PureComponent<IProps, IState> {

  modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: (value: string) => console.log(value),
      },
    }
  };

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  private handleChange = (value: string): void => {
    this.setState(() => ({ text: value }));
  };

  private onSave = (): void => {
    if (this.state.text.trim() === '') {
      return;
    }
    this.props.addMessage(this.state.text);
    this.setState((prevState) => ({...prevState, text: ''}));
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      text: ''
    };
  }

  render() {
    if (!this.props.channelSelected) {
      return null;
    }

    return (
      <div className={'MessageRichTextEditor'}>
        <ReactQuill value={this.state.text}
                    onChange={this.handleChange}
                    theme={'snow'}
                    formats={this.formats}
                    modules={this.modules}/>
        <button type={'submit'} className={'btn btn-primary MessageEditor__sendButton'}
                onClick={this.onSave}>Send</button>
      </div>
    );
  }
}
