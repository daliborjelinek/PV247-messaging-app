import * as React from 'react';
import * as Immutable from 'immutable';
import './ChannelList.less';
import {ChannelItemContainer} from '../containers/ChannelItemContainer';
import {ChangeEvent} from 'react';

export interface IChannelListStateProps {
  readonly channelIds: Immutable.List<Uuid>;
}

export interface IChannelListDispatchProps {
  addChannel(name: string): void;
}

type IProps = IChannelListStateProps & IChannelListDispatchProps;
type IState = { newChannelName: string };

export class ChannelList extends React.PureComponent<IProps, IState> {

  private onNewChannelChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.value;
    this.setState(() => ({ newChannelName: name }));
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      newChannelName: '',
    };
  }

  public render(): JSX.Element {
    return (
      <div className={'ChannelList'}>
        <h3 className={'ChannelList__title'}>Channels</h3>
        {this.props.channelIds && this.props.channelIds.map((channelId) => {
          return (<ChannelItemContainer id={channelId}
                                        key={channelId}/>);
        })}
        <div className={'ChannelList__newChannel form-group'}>
          <input className={'form-control ChannelList__newChannelInput'} type="text"
                 name="newChannelName" placeholder={'Channel name'}
                 onChange={this.onNewChannelChange}/>
          <button type="button" className="btn btn-default"
                  onClick={() => this.props.addChannel(this.state.newChannelName)}>Add</button>
        </div>
      </div>
    );
  }
}
