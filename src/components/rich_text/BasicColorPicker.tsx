import * as React from 'react';
import {Glyphicon} from 'react-bootstrap';
import '../../styles/components/rich_text/BasicColorPicker.less';
import {SyntheticEvent} from 'react';

export type ColorPickerColor = 'BLACK' | 'RED' | 'GREEN' | 'BLUE' | 'YELLOW' | 'BROWN';
export type ColorPickerStyle = 'black' | 'red' | 'green' | 'blue' | 'yellow' | 'brown';

export const COLORS: IColor[] = [
  { label: 'BLACK', style: 'black' },
  { label: 'RED', style: 'red' },
  { label: 'GREEN', style: 'green' },
  { label: 'BLUE', style: 'blue' },
  { label: 'YELLOW', style: 'yellow' },
  { label: 'BROWN', style: 'brown' },
];

interface IColor {
  label: ColorPickerColor;
  style: ColorPickerStyle;
}

interface IBasicColorPickerOwnPorps {
  currentColor: ColorPickerColor;
  onColorChange(colorStyle: ColorPickerColor): void;
}

type IProps = IBasicColorPickerOwnPorps;
type IState = {
  isDropDownVisible: boolean;
  activeColor: string;
};

export class BasicColorPicker extends React.PureComponent<IProps, IState> {

  private toggleVisibility = () => {
    const isDropDownButtonVisible = this.state.isDropDownVisible;
    this.setState(prevState => ({...prevState, isDropDownVisible: !isDropDownButtonVisible}));
  };

  private preventDefault = (e: SyntheticEvent<any>) => {
    e.preventDefault();
  };

  private onChangeColor(colorLabel: ColorPickerColor) {
    this.setState(prevState => ({...prevState, activeColor: colorLabel, isDropDownVisible: false}));
    this.props.onColorChange(colorLabel);
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      isDropDownVisible: false,
      activeColor: 'BLACK',
    };
  }

  componentDidMount(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e));
  }

  componentDidUpdate(): void {
    const currentColor = this.props.currentColor;
    if (currentColor != null && currentColor !== this.state.activeColor) {
      this.setState(prevState => ({...prevState, activeColor: currentColor}));
    }
  }

  private onKeyDown(e: KeyboardEvent) {
    if (!this.state.isDropDownVisible) {
      return;
    }
    e.preventDefault();
    this.setState(prevState => ({...prevState, isDropDownVisible: false}));
  }

  public render(): JSX.Element {
    return (
      <div className={'BasicColorPicker'}>
        <span onMouseDown={this.preventDefault} onClick={this.toggleVisibility}>
          <Glyphicon glyph={'text-color'}/>
        </span>
        {this.state.isDropDownVisible && (
          <div className={'BasicColorPicker__selection'}>
            {COLORS.map((color) => (
              <span className={`BasicColorPicker__color ${color.label === this.state.activeColor && 'active'}`}
                    key={color.label}
                    style={{backgroundColor: color.style}}
                    onMouseDown={this.preventDefault}
                    onClick={() => this.onChangeColor(color.label)}>&nbsp;</span>
            ))}
          </div>
        )}
      </div>
    );
  }
}
