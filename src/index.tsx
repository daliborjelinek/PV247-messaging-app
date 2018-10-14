

// Enables ES7 features such as async/await in *.js/*.jsx code
import 'babel-core/register';
import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './App';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.less';

ReactDOM.render(<App/>, document.getElementById('app-root'));
