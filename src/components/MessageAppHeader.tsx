import * as React from 'react';
import * as  PropTypes from 'prop-types';

import {DropDownMenu, IDropDownMenuItem} from './DropDownMenu';
import {shape} from 'prop-types';

interface  IMessageAppHeaderProps {
  readonly profileMenuItems: IDropDownMenuItem[];
}

export class MessageAppHeader extends React.PureComponent<IMessageAppHeaderProps> {

  static propTypes = {
    profileMenuItems: PropTypes.arrayOf(shape({
      ...DropDownMenu.propTypes.items,
    }))
  };

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
