import {IMessageAppState} from '../models/IMessageAppState';
import {ChannelItem, IChannelItemDispatchProps, IChannelItemOwnProps, IChannelItemStateProps} from '../components/ChannelItem';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {onChannelSelected} from '../actions/channelActions';


const mapStateToProps = (state: IMessageAppState, ownProps: IChannelItemOwnProps): IChannelItemStateProps => {
  return {
    channelItem: state.channels.byId.get(ownProps.id)!,
    isSelected: state.currentChannelId === ownProps.id,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChannelSelected: (channelId: Uuid) => dispatch(onChannelSelected(channelId)),
  };
};

export const ChannelItemContainer = connect<IChannelItemStateProps, IChannelItemDispatchProps>(mapStateToProps, mapDispatchToProps)(ChannelItem);

