import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import reduxThunk from 'redux-thunk';
import reducer from './modules/rootReducer';

export const history = createBrowserHistory();
const logger = createLogger();
const initialState = {
  auth: { authenticated: localStorage.getItem('token')}
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    // reducer(history), // root reducer w/ router state
    reducer, // root reducer
    initialState,
    composeEnhancers(
        applyMiddleware(
            // routerMiddleware(history),
            reduxThunk,
            logger,  // logger must be last in chain
        ),
    ),
);

export default store;