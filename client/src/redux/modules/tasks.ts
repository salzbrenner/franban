import * as api from '../../services/api';

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
    const tasks = res.data.reduce(
      (a: any, b: any) => {
        const xxx = {
          id: b.id,
          name: b.name,
          order: b.order,
        };
        console.log(xxx);

        a = {
          // id: b.id,
          listId: b.list_id,
          // name: b.name,
          // order: b.order,
          tasks: [...a.tasks, xxx],
        };
        return a;
      },
      { tasks: [] }
    );
    console.log(tasks, 'WHOO');
    dispatch({
      type: GET_TASKS,
      payload: tasks,
    });
  } catch (e) {
    console.log(e);
  }
};
