import * as React from 'react';
import '../styles/components/ChannelItem.less';
import {IMessageAppChannel} from '../models/IMessageAppChannel';
import {Draggable} from 'react-beautiful-dnd';

export interface IChannelItemOwnProps {
  readonly id: Uuid;
  readonly index: number;
}

export interface IChannelItemStateProps {
  readonly channelItem: IMessageAppChannel;
  readonly isSelected: boolean;
}

export interface IChannelItemDispatchProps {
  onChannelSelected(channelId: Uuid): void;
}

type IProps = IChannelItemOwnProps & IChannelItemStateProps & IChannelItemDispatchProps;

export class ChannelItem extends React.PureComponent<IProps> {

  public render(): JSX.Element {
    const channelItemClassName = this.props.isSelected ? 'ChannelItem ChannelItem--selected' : 'ChannelItem';

    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided) => (
          <div className={channelItemClassName}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               ref={provided.innerRef}
               onClick={() => this.props.onChannelSelected(this.props.id)}>
            <span className="ChannelItem__name">{this.props.channelItem.name}</span>
            {/*<span className="ChannelItem__countOfNewMessages badge badge-pill">{this.props.channelItem.countOfNewMessages}</span>*/}
          </div>
        )}
      </Draggable>
    );
  }
}
