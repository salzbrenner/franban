import * as api from '../../services/api';
import {
  GET_TASKS,
  TaskInterface,
} from 'redux/modules/tasks';

export const GET_LISTS = 'lists/GET_LISTS';
export const UPDATE_LIST_TASK_IDS =
  'lists/UPDATE_LIST_TASK_IDS';
export const UPDATE_LIST_TASKS = 'lists/UPDATE_LIST_TASKS';

export interface ListObjectInterface {
  id: number;
  stateId: string;
  board_id: number;
  name: string;
  order: number;
  taskIds: string[];
  index?: any;
}

export interface ListsState {
  lists: { [index: string]: ListObjectInterface };
  listOrder: string[];
}

export const initialState: ListsState = {
  lists: {},
  listOrder: [],
};

export default function reducer(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case GET_LISTS: {
      console.log(action.payload);
      const { lists, order } = action.payload;

      return {
        ...state,
        lists: lists,
        listOrder: order,
      };
    }
    case UPDATE_LIST_TASK_IDS:
      const { taskIds, listId } = action.payload;
      console.log(taskIds, listId);
      return {
        ...state,
        lists: {
          ...state.lists,
          [listId]: {
            ...state.lists[listId],
            taskIds: taskIds,
          },
        },
      };

    default:
      return state;
  }
}

export const listsSelector = (state: ListsState) =>
  state.lists;

export interface getListsInterface {
  (boardId: number): void;
}

export const getLists: getListsInterface = (
  boardId: number
) => async (dispatch: Function, getState: Function) => {
  try {
    const res = await api.getLists(boardId);
    const order: string[] = [];
    const lists: {} = res.data
      .sort(
        (a: ListObjectInterface, b: ListObjectInterface) =>
          a.order - b.order
      )
      .reduce((a: any, b: any) => {
        const { board_id: boardId, ...rest } = b;
        order.push(`list-${b.id}`);
        a[`list-${b.id}`] = {
          // boardId: b.board_id,
          ...rest,
        };
        return a;
      }, {});
    dispatch({
      type: GET_LISTS,
      payload: { lists, order },
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateListTasks = (
  listId: string,
  newTasksIds: any[]
) => {
  return {
    type: UPDATE_LIST_TASK_IDS,
    payload: {
      taskIds: newTasksIds,
      listId,
    },
  };
};
