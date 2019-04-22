import * as api from '../../services/api';
import {
  listLoading,
  updateListTasks,
} from 'redux/modules/lists';
import { Dispatch } from 'redux';

export const GET_TASKS = 'tasks/GET_TASKS';

export interface TaskInterface {
  id: number;
  list_id: number;
  name: string;
  order: number;
}

export interface TasksState {}

export const initialState: TasksState = {};

export default function reducer(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}

export const tasksSelector = (state: TasksState) => state;

export interface getTasksInterface {
  (listId: number): void;
}
export const getTasks: getTasksInterface = listId => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    const res = await api.getTasks(listId);
    const taskIds: string[] = [];
    const tasks = res.data
      .sort((a: any, b: any) => {
        return a.order - b.order;
      })
      .reduce((a: any, b: any) => {
        const { ...rest } = b;
        const taskId = `task-${b.id}`;
        taskIds.push(taskId);
        a[`task-${b.id}`] = { ...rest };
        return a;
      }, {});

    // add tasks to state
    await dispatch({
      type: GET_TASKS,
      payload: tasks,
    });

    // finish adding taskIds to lists
    dispatch(addTasksToList(`list-${listId}`, taskIds));
  } catch (e) {
    console.log(e);
  }
};

export const addTasksToList: any = (
  listId: string,
  taskIds: any[]
) => async (dispatch: Function, getState: Function) => {
  const list = getState().lists.lists[listId];
  const newList = { ...list, taskIds };
  dispatch(updateListTasks(listId, newList));
  dispatch(listLoading(listId, false));
};
