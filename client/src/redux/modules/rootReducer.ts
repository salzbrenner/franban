import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';
import lists, { ListsState } from 'redux/modules/lists';
import tasks, { TasksState } from 'redux/modules/tasks';

export interface AppState {
  // form: {},
  user: UserState;
  auth: AuthState;
  lists: ListsState;
  tasks: TasksState;
  form: any;
}

export default combineReducers<AppState>({
  form,
  // router: connectRouter(history),
  auth,
  user,
  lists,
  tasks,
});
