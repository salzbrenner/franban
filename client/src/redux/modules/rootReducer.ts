import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';

export interface AppState {
  // form: {},
  user: UserState;
  auth: AuthState;
  form: any;
}

export default combineReducers<AppState>({
  form,
  // router: connectRouter(history),
  auth,
  user,
});
