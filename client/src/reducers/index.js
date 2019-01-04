import { combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import cards from './cards';
import auth from './auth.reducer';

export default combineReducers({
  form: formReducer,
  // router: connectRouter(history),
  cards,
  auth,
})

