import * as React from 'react';
import * as  PropTypes from 'prop-types';

interface IDropDownMenu {
  items: IDropDownMenuItem[];
  iconClass?: string;
  menuWrapperClass?: string;
  openMenuDirection?: 'LEFT' | 'RIGHT';
}

export interface IDropDownMenuItem {
  title: string;
  action: (...params: any[]) => any;
}

interface IDropDownMenuState {
  isShown: boolean;
}

interface IOpenMenuDirection {
  LEFT: string;
  RIGHT: string;
}

const openMenuDirection: IOpenMenuDirection = {
  LEFT: 'DropDownMenu--left',
  RIGHT: 'DropDownMenu--right',
};

export class DropDownMenu extends React.PureComponent<IDropDownMenu, IDropDownMenuState> {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      action: PropTypes.func
    })).isRequired,
    menuWrapperClass: PropTypes.string,
    iconClass: PropTypes.string,
    openMenuDirection: PropTypes.string,
  };

  constructor(props: IDropDownMenu) {
    super(props);

    this.state = {
      isShown: false,
    };
  }

  private shouldBeMenuItemsRendered(): boolean {
    return this.state.isShown && this.props.items != null && this.props.items.length > 0;
  }

  private show(): void {
    this.setState( () => {
      return {
        isShown: true,
      };
    });
  }

  private hide(): void {
    this.setState(() => {
      return {isShown: false};
    });
  }

  public render(): JSX.Element {
    // select side on which will be menu opened
    const openMenuDirectionClass = this.props.openMenuDirection ?
      openMenuDirection[this.props.openMenuDirection] : openMenuDirection.LEFT;

    return (
      <div className={'DropDownMenu'} onMouseEnter={() => this.show()} onMouseLeave={() => this.hide()}>
        <div className={this.props.menuWrapperClass}><span className={this.props.iconClass} /></div>
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
