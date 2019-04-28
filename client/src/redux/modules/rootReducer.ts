import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';
import lists, { ListsState } from 'redux/modules/lists';
import tasks, { TasksState } from 'redux/modules/tasks';
import board, { BoardState } from './boards';

export interface AppState {
  user: UserState;
  auth: AuthState;
  lists: ListsState;
  tasks: TasksState;
  board: BoardState;
  form: any;
}

export default combineReducers<AppState>({
  form,
  // router: connectRouter(history),
  auth,
  user,
  board,
  lists,
  tasks,
});
