import * as React from 'react';

import {DropDownMenu, IDropDownMenuItem} from './DropDownMenu';

import '../styles/components/MessageAppHeader.less';

interface  IMessageAppHeaderOwnProps {
  readonly profileMenuItems: IDropDownMenuItem[];
}

type IProps = IMessageAppHeaderOwnProps;

export class MessageAppHeader extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    return (
      <div className={'MessageAppHeader'}>
        <h1 className={'MessageAppHeader__title'}>PV247</h1>
        <DropDownMenu items={this.props.profileMenuItems}
                      iconClass={'glyphicon glyphicon-user'}
                      menuWrapperClass={'avatar'}
                      openMenuDirection={'RIGHT'}
        />
      </div>
    );
  }
}
