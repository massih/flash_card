import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/main_page/Main';
import * as serviceWorker from './serviceWorker';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import "react-notifications-component/dist/theme.css";
import LoginPage from "./components/login/login";


// ReactDOM.render(<Main/>, document.getElementById('root'));
ReactDOM.render(<LoginPage/>, document.getElementById('root'));

serviceWorker.unregister();