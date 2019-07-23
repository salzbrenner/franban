import * as api from '../../services/api';
import {
  listLoading,
  updateListTasks,
} from 'redux/modules/lists';
import { AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';

export const GET_TASKS = 'tasks/GET_TASKS';
export const ADD_TASK = 'tasks/ADD_TASK';
export const UPDATE_TASK = 'tasks/UPDATE_TASK';
export const DELETE_TASK = 'tasks/DELETE_TASK';

export interface TaskInterface {
  id: number;
  list_id: number;
  name: string;
  order: number;
}

export interface TasksState {
  [id: number]: {
    id: number;
    list_id: number;
    name: string;
  };
}

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

    case ADD_TASK: {
      const { id } = action.payload;
      return {
        ...state,
        [id]: action.payload,
      };
    }

    case UPDATE_TASK: {
      const { taskId, listId } = action.payload;
      return {
        ...state,
        [taskId]: {
          ...state[taskId],
          list_id: listId,
        },
      };
    }

    case DELETE_TASK: {
      const idToDelete = action.payload;
      const { [idToDelete]: value, ...withoutId } = state;

      return {
        ...withoutId,
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

    // add tasks to state
    await dispatch({
      type: GET_TASKS,
      payload: tasks,
    });

    // finish adding taskIds to lists
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
};

export const updateTask = (
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

    dispatch({
      type: UPDATE_TASK,
      payload: {
        taskId,
        listId,
      },
    });
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
  try {
    const res = await api.addTask(name, listId);
    const { order, ...rest } = res.data;
    const newTask = { ...rest, list_id: listId };

    // add tasks to state
    dispatch({
      type: ADD_TASK,
      payload: newTask,
    });

    // update list with task
    const list = getState().lists.lists[listId];
    const newList = {
      ...list,
      taskIds: [...list.taskIds, newTask.id],
    };
    dispatch(updateListTasks(`${listId}`, newList));
  } catch (e) {
    console.log(e);
  }
};

export const deleteAllTasksFromDeletedList = (
  taskIds: number[]
) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  try {
    taskIds.forEach(id => {
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteTask = (id: number) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  try {
    await api.deleteTask(id);

    const {
      [id]: target,
      ...withoutTarget
    } = getState().tasks;

    await dispatch({
      type: DELETE_TASK,
      payload: id,
    });

    const list = getState().lists.lists[target.list_id];
    const taskIdsForCurrentList = Object.keys(
      withoutTarget
    ).filter(taskId => {
      return (
        withoutTarget[taskId].list_id === target.list_id
      );
    });
    const newList = {
      ...list,
      taskIds: taskIdsForCurrentList,
    };
    console.log(newList);

    dispatch(updateListTasks(target.list_id, newList));
  } catch (e) {
    console.log(e);
  }
};
