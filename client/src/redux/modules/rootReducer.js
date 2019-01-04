import { combineReducers} from 'redux';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import auth from './auth';

export default combineReducers({
  form,
  // router: connectRouter(history),
  auth,
})

