import * as React from 'react';
import * as  PropTypes from 'prop-types';

export interface IChannelHeader {
  title: string;
  numberOfUsers: number;
  currentChannelId: number;
}

export class ChannelHeader extends React.PureComponent<IChannelHeader> {

  static propTypes = {
    title: PropTypes.string.isRequired,
    numberOfUsers: PropTypes.number.isRequired,
    currentChannelId: PropTypes.number.isRequired,
  };

  public render(): JSX.Element {
    return (
      <div className={'ChannelHeader'}>
        <div className={'ChannelHeader__info'}>
          <h2 className={'ChannelHeader__title'}>{this.props.title}</h2>
          <div className={'ChannelHeader__numberOfUsers'}>
            <span className={'glyphicon glyphicon-user'} />
            <span>{this.props.numberOfUsers}</span>
          </div>
        </div>
        <div className={'ChannelHeader__actions'}>
          <span className={'glyphicon glyphicon-search'} />
          <span className={'glyphicon glyphicon-menu-hamburger'} />
        </div>
      </div>
    );
  }
}
