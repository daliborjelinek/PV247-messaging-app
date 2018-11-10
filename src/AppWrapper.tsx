import * as React from 'react';
import {applyMiddleware, createStore, compose} from 'redux';
import {rootReducer} from './reducers/rootReducer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {AppContainer} from './containers/AppContainer';

// To enable redux extension - https://github.com/zalmoxisus/redux-devtools-extension#usage
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middleware)
));

/**
 * This component wraps whole application. It provides store to it's children.
 */
export class AppWrapper extends React.PureComponent {

  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
