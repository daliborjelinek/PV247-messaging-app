import {AppWrapper} from './AppWrapper';

require.context('../public/', true);

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.less';

ReactDOM.render(<AppWrapper/>, document.getElementById('app-root'));
