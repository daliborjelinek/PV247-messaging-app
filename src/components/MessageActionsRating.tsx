import * as React from 'react';
import './MessageActions.less';
import {RatingPolarity} from '../enums/RatingPolarity';
import './MessageActionsRating.less';

export interface IMessageActionsRatingOwnProps {
  readonly messageId: Uuid;
}

export interface IMessageActionsRatingStateProps {
  readonly isRatedByLoggedUser: boolean;
  readonly rating: number;
  readonly ratingPolarityFromCurrentUser: undefined | null | RatingPolarity;
}

export interface IMessageActionsRatingDispatchProps {
  incrementRating(messageId: Uuid): void;
  decrementRating(messageId: Uuid): void;
}

type IProps = IMessageActionsRatingDispatchProps & IMessageActionsRatingOwnProps &
              IMessageActionsRatingStateProps;

export function MessageActionsRating(props: IProps) {
  const additionalClassName = props.ratingPolarityFromCurrentUser != null ?
                          `MessageActionsRating--rated MessageActionsRating--rated-${props.ratingPolarityFromCurrentUser}` : '';
  return (
    <div className={`MessageActions__actionIcons ${additionalClassName}`}>
      <span className={'glyphicon glyphicon-plus'} onClick={() => props.incrementRating(props.messageId)} />
      <span className={'glyphicon glyphicon-minus'} onClick={() => props.decrementRating(props.messageId)} />
    </div>
  );
}
