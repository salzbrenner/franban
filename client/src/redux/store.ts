import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import reduxThunk from 'redux-thunk';
import reducer from './modules/rootReducer';
import { axiosMiddleware } from 'redux/middleware/Axios.middleware';

export const history = createBrowserHistory();
const logger = createLogger();

const composeEnhancers =
  // @ts-ignore: allow devtools on window
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer, // root reducer
  composeEnhancers(
    applyMiddleware(
      reduxThunk,
      axiosMiddleware,
      logger // logger must be last in chain
    )
  )
);

export default store;
