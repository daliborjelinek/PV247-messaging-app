import {IMessageAppState} from '../models/IMessageAppState';
import {AlertCloseable, IAlertCloseableDispatchProps, IAlertCloseableStateProps} from '../components/AlertCloseable';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {clearAlerts} from '../actions/appearanceActions';


const mapStateToProps = (state: IMessageAppState): IAlertCloseableStateProps => {
  return {
    isVisible: state.isAlertBarVisible,
    messages: state.alerts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IAlertCloseableDispatchProps => {
  return {
    hide: () => dispatch(clearAlerts()),
  };
};

export const AlertCloseableContainer = connect<IAlertCloseableStateProps, IAlertCloseableDispatchProps>(mapStateToProps,
  mapDispatchToProps)(AlertCloseable);
