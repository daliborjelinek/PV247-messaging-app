import * as React from 'react';
import '../styles/components/MessageActions.less';
import {RatingPolarity} from '../enums/RatingPolarity';
import '../styles/components/MessageActionsRating.less';

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

export class MessageActionsRating extends React.PureComponent<IProps> {

  private onIncrementRating = (): void => {
    this.props.incrementRating(this.props.messageId);
  };

  private onDecrementRating = (): void => {
    this.props.decrementRating(this.props.messageId);
  };

  public render(): JSX.Element {
    const additionalClassName = this.props.ratingPolarityFromCurrentUser != null ?
      `MessageActionsRating--rated MessageActionsRating--rated-${this.props.ratingPolarityFromCurrentUser}` : '';
    return (
      <div className={`MessageActions__actionIcons ${additionalClassName}`}>
        <span className={'glyphicon glyphicon-plus'} onClick={this.onIncrementRating}/>
        <span className={'glyphicon glyphicon-minus'} onClick={this.onDecrementRating}/>
      </div>
    );
  }
}
