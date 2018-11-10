import {IMessageAppState} from '../models/IMessageAppState';
import {ChannelItem, IChannelItemOwnProps, IChannelItemStateProps} from '../components/ChannelItem';
import {connect} from 'react-redux';


const mapStateToProps = (state: IMessageAppState, ownProps: IChannelItemOwnProps): IChannelItemStateProps => {
  return {
    channelItem: state.channels.byId.get(ownProps.id)!,
  };
};

export const ChannelItemContainer = connect<IChannelItemStateProps, void>(mapStateToProps)(ChannelItem);

