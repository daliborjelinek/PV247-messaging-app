import {IMessageAppState} from '../models/IMessageAppState';
import {ChannelHeader, IChannelHeaderStateProps} from '../components/ChannelHeader';
import {connect} from 'react-redux';


const mapStateToProps = (state: IMessageAppState): IChannelHeaderStateProps => {
  if (state.currentChannelId == null) {
    return { channel: null };
  }
  return {
    channel: state.channels.byId.get(state.currentChannelId)!,
  };
};

export const ChannelHeaderContainer = connect<IChannelHeaderStateProps, void>(mapStateToProps)(ChannelHeader);
