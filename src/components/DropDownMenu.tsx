import * as React from 'react';
import * as  PropTypes from 'prop-types';
import './DropDownMenu.less';

interface IDropDownMenuProps {
  readonly items: IDropDownMenuItem[];
  readonly iconClass?: string;
  readonly menuWrapperClass?: string;
  readonly openMenuDirection?: 'LEFT' | 'RIGHT';
}

export interface IDropDownMenuItem {
  readonly title: string;
  readonly action: (...params: any[]) => any;
}

interface IDropDownMenuState {
  readonly isShown: boolean;
}

interface IOpenMenuDirection {
  LEFT: string;
  RIGHT: string;
}

const openMenuDirection: IOpenMenuDirection = {
  LEFT: 'DropDownMenu--left',
  RIGHT: 'DropDownMenu--right',
};

export class DropDownMenu extends React.PureComponent<IDropDownMenuProps, IDropDownMenuState> {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      action: PropTypes.func
    })).isRequired,
    menuWrapperClass: PropTypes.string,
    iconClass: PropTypes.string,
    openMenuDirection: PropTypes.string,
  };

  private toggleVisibility = () => {
    this.setState((prevState) => ({ isShown: !prevState.isShown }));
  };

  constructor(props: IDropDownMenuProps) {
    super(props);

    this.state = {
      isShown: false,
    };
  }

  private shouldBeMenuItemsRendered(): boolean {
    return this.state.isShown && this.props.items != null && this.props.items.length > 0;
  }

  public render(): JSX.Element {
    // select side on which will be menu opened
    const openMenuDirectionClass = this.props.openMenuDirection ?
      openMenuDirection[this.props.openMenuDirection] : openMenuDirection.LEFT;

    return (
      <div className={'DropDownMenu'} onClick={this.toggleVisibility}>
        <div className={this.props.menuWrapperClass}>
          <span className={this.props.iconClass} />
        </div>
        {this.shouldBeMenuItemsRendered() &&
          <ul className={`DropDownMenu__list ${openMenuDirectionClass}`}>
            {this.props.items.map((item, index) => {
              return <li className={'DropDownMenu__menuItem'} key={index} onClick={item.action}>{item.title}</li>;
            })}
          </ul>
        }
      </div>
    );
  }

}
