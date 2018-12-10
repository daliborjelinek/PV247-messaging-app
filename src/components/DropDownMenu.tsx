import * as React from 'react';
import '../styles/components/DropDownMenu.less';
import {RefObject} from 'react';

interface IOpenMenuDirectionClass {
  LEFT: 'DropDownMenu--left';
  RIGHT: 'DropDownMenu--right';
}

const openMenuDirection: IOpenMenuDirectionClass = {
  LEFT: 'DropDownMenu--left',
  RIGHT: 'DropDownMenu--right',
};

export interface IDropDownMenuItem {
  readonly title: string;
  readonly action: (...params: any[]) => any;
}

interface IDropDownMenuOwnProps {
  readonly items: IDropDownMenuItem[];
  readonly iconClass?: string;
  readonly menuWrapperClass?: string;
  readonly openMenuDirection?: 'LEFT' | 'RIGHT';
}

interface IDropDownMenuState {
  readonly isShown: boolean;
}

type IProps = IDropDownMenuOwnProps;
type IState = IDropDownMenuState;

/**
 * Component for dropdown menu.
 */
export class DropDownMenu extends React.PureComponent<IProps, IState> {

  private readonly dropDownMenuHeaderRef: RefObject<HTMLDivElement>;

  private toggleVisibility = () => {
    this.setState((prevState) => ({ isShown: !prevState.isShown }));
  };

  /**
   * Dropdown menu needs to be hidden when user clicks outside the menu.
   * @param e event
   */
  private hideDropdownMenu = (e: MouseEvent) => {
    if (!this.state.isShown || this.isClickedOnMenuHeader(e)) {
      return;
    }
    this.setState((state) => ({ ...state, isShown: false }));
  };

  constructor(props: IProps) {
    super(props);

    this.dropDownMenuHeaderRef = React.createRef();

    this.state = {
      isShown: false,
    };
  }

  componentDidMount(): void {
    window.addEventListener('click', this.hideDropdownMenu);
  }

  componentWillUnmount(): void {
    window.removeEventListener('click', this.hideDropdownMenu);
  }

  private isClickedOnMenuHeader(e: MouseEvent): boolean {
    if ((e.target! as HTMLElement).classList.contains('DropDownMenu')) {
      return true;
    }
    return this.dropDownMenuHeaderRef.current!.contains(e.target! as HTMLElement);
  }

  private shouldBeMenuItemsRendered(): boolean {
    return this.state.isShown && this.props.items != null && this.props.items.length > 0;
  }

  public render(): JSX.Element {
    // select side on which will be menu opened
    const openMenuDirectionClass = this.props.openMenuDirection ?
      openMenuDirection[this.props.openMenuDirection] : openMenuDirection.LEFT;

    return (
      <div className={'DropDownMenu'} onClick={this.toggleVisibility}
           ref={this.dropDownMenuHeaderRef}>
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
