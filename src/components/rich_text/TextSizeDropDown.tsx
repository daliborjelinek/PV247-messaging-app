import * as React from 'react';
import {Dropdown, Glyphicon, MenuItem, SelectCallback} from 'react-bootstrap';
import '../../styles/components/rich_text/TextSizeDropDown.less';
import {SyntheticEvent} from 'react';

export const FONT_SIZE_TYPES = [
  { label: 'regular', style: 'unstyled' },
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
];

interface ITextSizeDropDownOwnProps {
  focusedBlockType: string; /* can be one of style from FONT_SIZE_TYPES */
  onChange(selectedSize: string): void;
}

type IProps = ITextSizeDropDownOwnProps;
type IState = {
  activeMenuItem: string /* label from FONT_SIZE_TYPES */;
};

export class TextSizeDropDown extends React.PureComponent<IProps, IState> {

  private onChange = (eventKey: any, e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    this.setState(prevState => ({...prevState, activeMenuItem: eventKey}));
    const selectedSize = FONT_SIZE_TYPES.filter((heading) => heading.label === eventKey)[0];
    if (selectedSize) {
      this.props.onChange(selectedSize.style);
    }
  };

  private preventDefault = (e: SyntheticEvent<any>) => {
    e.preventDefault();
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      activeMenuItem: 'regular',
    };
  }

  componentDidUpdate(): void {
    const currentFontSize = FONT_SIZE_TYPES.filter((heading) => heading.style === this.props.focusedBlockType)[0];
    if (currentFontSize == null) {
      return;
    }
    if (this.state.activeMenuItem === currentFontSize.label) {
      return;
    }
    this.setState(prevState => ({...prevState, activeMenuItem: currentFontSize.label}));
  }

  public render(): JSX.Element {
    const menuItems = FONT_SIZE_TYPES.map((heading) => (
      <MenuItem eventKey={heading.label}
                key={heading.label}
                onSelect={this.onChange as SelectCallback}
                onMouseDown={this.preventDefault}
                active={heading.label === this.state.activeMenuItem}>{heading.label}</MenuItem>
    ));

    return (
      <Dropdown className={'TextSizeDropDown'} id={'TextSizeDropDown__btn'} dropup>
        <Dropdown.Toggle onMouseDown={this.preventDefault}>
          <Glyphicon glyph={'text-size'}/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {menuItems}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
