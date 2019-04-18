import * as api from '../../services/api';

export const GET_TASKS = 'tasks/GET_TASKS';

export interface TaskInterface {
  id: number;
  list_id: number;
  name: string;
  order: number;
}

export interface TasksState {
  tasks: TaskInterface[];
}

export const initialState: TasksState = {
  tasks: [],
};

export default function reducer(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        tasks: [...state.tasks, ...action.payload],
      };
    }
    default:
      return state;
  }
}

export const tasksSelector = (state: TasksState) =>
  state.tasks;

export interface getTasksInterface {
  (listId: number): void;
}
export const getTasks: getTasksInterface = listId => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    const res = await api.getTasks(listId);
    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};
