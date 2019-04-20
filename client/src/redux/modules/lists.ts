import * as api from '../../services/api';
import {
  GET_TASKS,
  TaskInterface,
} from 'redux/modules/tasks';

export const GET_LISTS = 'lists/GET_LISTS';

export interface ListObjectInterface {
  // id: number;
  board_id: number;
  name: string;
  order: number;
  tasks?: TaskInterface[];
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
      return {
        ...state,
        lists: action.payload,
      };
    }
    case GET_TASKS:
      const tasksRes = action.payload;
      // tasks.map(task => )
      console.log('GOT SOME TASK', action.payload);

      return {
        ...state,
        lists: {
          ...state.lists,
          [tasksRes.listId]: {
            ...state.lists[tasksRes.listId],
            tasks: tasksRes.tasks,
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

export const getLists: getListsInterface = boardId => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    const res = await api.getLists(boardId);
    const lists = res.data.reduce((a: any, b: any) => {
      a[b.id] = {
        id: b.id,
        boardId: b.board_id,
        name: b.name,
        order: b.order,
      };
      return a;
    }, {});
    dispatch({
      type: GET_LISTS,
      payload: lists,
    });
  } catch (e) {
    console.log(e);
  }
};
