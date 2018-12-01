import * as React from 'react';
import * as Immutable from 'immutable';
import './ChannelList.less';
import {ChannelItemContainer} from '../containers/ChannelItemContainer';
import {ChangeEvent} from 'react';
import {DragDropContext, Droppable, DroppableProvided, DropResult} from 'react-beautiful-dnd';

export interface IChannelListStateProps {
  readonly channelIds: Immutable.List<Uuid>;
}

export interface IChannelListDispatchProps {
  addChannel(name: string): void;
  reorderChannels(reorderedChannelIds: Immutable.List<Uuid>): void;
}

type IProps = IChannelListStateProps & IChannelListDispatchProps;
type IState = { newChannelName: string };

/**
 * This component represents left panel with channels. Items of the channel list
 *   can be reordered using drag and drop.
 */
export class ChannelList extends React.PureComponent<IProps, IState> {

  private readonly DROPPABLE_ID = 'CHANNEL_LIST_DROPPABLE';

  private onNewChannelChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.value;
    this.setState(() => ({ newChannelName: name }));
  };

  private onAddChannel = (): void => {
    this.props.addChannel(this.state.newChannelName);
  };

  private onDragEnd = (result: DropResult): void => {
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
      return;
    }

    const reorderedChannelIds = this.props.channelIds.remove(source.index)
                                                     .insert(destination.index, draggableId);
    this.props.reorderChannels(reorderedChannelIds);
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
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={this.DROPPABLE_ID}>
            {(provided: DroppableProvided) => (
              <div ref={provided.innerRef}
                   {...provided.droppableProps}>
                {
                  this.props.channelIds && this.props.channelIds.map((channelId, index) => (
                    <ChannelItemContainer id={channelId} key={channelId} index={index}/>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className={'ChannelList__newChannel form-group'}>
          <input className={'form-control ChannelList__newChannelInput'} type="text"
                 name="newChannelName" placeholder={'Channel name'}
                 onChange={this.onNewChannelChange}/>
          <button type="button" className="btn btn-default"
                  onClick={this.onAddChannel}>Add</button>
        </div>
      </div>
    );
  }
}
