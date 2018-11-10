import {AppWrapper} from './AppWrapper';

require.context('../public/', true);

// Enables ES7 features such as async/await in *.js/*.jsx code
import 'babel-core/register';
import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.less';

ReactDOM.render(<AppWrapper/>, document.getElementById('app-root'));
