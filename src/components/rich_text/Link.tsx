import * as React from 'react';
import { ContentState } from 'draft-js';

// props from draft-js
type IProps = {
  contentState: ContentState;
  entityKey: string;
};

export class Link extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    const {url} = this.props.contentState.getEntity(this.props.entityKey).getData();

    return (
      <a href={url} target={'_blank'}>{this.props.children}</a>
    );
  }
}
