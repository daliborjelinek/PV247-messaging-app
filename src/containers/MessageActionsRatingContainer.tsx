import {IMessageAppState} from '../models/IMessageAppState';
import {IMessageActionsRatingStateProps, IMessageActionsRatingDispatchProps, MessageActionsRating} from '../components/MessageActionsRating';
import {IMessageActionsEditingOwnProps} from '../components/MessageActionsEditing';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {decrementRating, incrementRating} from '../actions/messageActions';


const mapStateToProps = (state: IMessageAppState,
                         ownProps: IMessageActionsEditingOwnProps): IMessageActionsRatingStateProps => {
  const loggedUserId = state.loggedUser!.id;
  const ratingFromLoggedUser = state.messages.byId.get(ownProps.messageId)!.usersWhoRatedMessage[loggedUserId];
  return {
    isRatedByLoggedUser: ratingFromLoggedUser != null,
    rating: state.messages.byId.get(ownProps.messageId)!.rating,
    ratingPolarityFromCurrentUser: ratingFromLoggedUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    incrementRating: (messageId: Uuid) => dispatch(incrementRating(messageId)),
    decrementRating: (messageId: Uuid) => dispatch(decrementRating(messageId)),
  };
};

export const MessageActionsRatingContainer = connect<IMessageActionsRatingStateProps, IMessageActionsRatingDispatchProps>(
  mapStateToProps, mapDispatchToProps)(MessageActionsRating);
