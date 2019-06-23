import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/main_page/Main';
import * as serviceWorker from './serviceWorker';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

ReactDOM.render(<Main/>, document.getElementById('root'));

serviceWorker.unregister();