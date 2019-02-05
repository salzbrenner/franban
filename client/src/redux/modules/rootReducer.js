import { combineReducers} from 'redux';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import user from './user';

export default combineReducers({
  form,
  // router: connectRouter(history),
  auth,
  user
})

