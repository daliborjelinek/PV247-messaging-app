import {IMessageAppState} from '../models/IMessageAppState';
import {connect} from 'react-redux';
import {ChatWindow, IChatWindowStateProps} from '../components/ChatWindow';

const mapStateToProps = (state: IMessageAppState): IChatWindowStateProps => {
  return {
    channelLoading: state.channelLoading,
  };
};


export const ChatWindowContainer = connect<IChatWindowStateProps>(mapStateToProps)(ChatWindow);
