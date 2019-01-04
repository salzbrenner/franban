import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import store, { history } from './store';
import Home from './routes/home/Home';
import Logout from './routes/logout/Logout';


ReactDOM.render(
    <Provider store={store}>
      {/*<ConnectedRouter history={history}>*/}
        <Router>
          <App/>
        </Router>
      {/*</ConnectedRouter>*/}

    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
