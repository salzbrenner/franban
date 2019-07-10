import * as api from '../../services/api';
import {
  listLoading,
  updateListTasks,
} from 'redux/modules/lists';
import { AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';

export const GET_TASKS = 'tasks/GET_TASKS';
export const ADD_TASK = 'tasks/ADD_TASK';

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
    const res: AxiosResponse = await api.getTasksForList(
      listId
    );
    const taskIds: number[] = [];

    const tasks = res.data.reduce((a: any, b: any) => {
      taskIds.push(b.id);
      const { order, ...rest } = b;
      a[b.id] = { ...rest };
      return a;
    }, {});

    // const tasks = res.data
    //   .sort((a: any, b: any) => {
    //     return a.order - b.order;
    //   })
    //   .reduce((a: any, b: any) => {
    //     const { ...rest } = b;
    //     const taskId = `task-${b.id}`;
    //     taskIds.push(taskId);
    //     a[`task-${b.id}`] = { ...rest };
    //     return a;
    //   }, {});
    //
    // // add tasks to state
    await dispatch({
      type: GET_TASKS,
      payload: tasks,
    });
    //
    // // finish adding taskIds to lists
    dispatch(addTasksToList(`${listId}`, taskIds));
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
  // dispatch(listLoading(listId, false));
};

export const addSingleTask: any = (
  listId: string,
  taskId: string
) => async (dispatch: Function, getState: Function) => {};

export const updateTaskOnServer = (
  listId: string,
  taskId: number,
  order: number[]
) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  try {
    const tasks = getState().tasks;
    const index = order.indexOf(taskId).toString();

    const res = await api.updateTasksOrder(
      listId,
      taskId,
      index,
      tasks[taskId].name
    );
  } catch (e) {
    console.log(e);
  }
};

/**
 * Adds Task
 *
 * @param name
 * @param listId
 */
export const addTask = (
  name: string,
  listId: number
) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  const res = await api.addTask(name, listId);
  dispatch({
    type: ADD_TASK,
    payload: res.data,
  });
};
