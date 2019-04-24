import * as api from '../../services/api';
import { getTasks } from 'redux/modules/tasks';
import { ListProps } from 'components/List/List';
import { ActionInterface } from 'redux/modules/action.type';

export const GET_LISTS = 'lists/GET_LISTS';
export const RESET_LISTS = 'lists/RESET_LISTS';
export const UPDATE_LISTS_ORDER =
  'lists/UPDATE_LISTS_ORDER';
export const UPDATE_LIST_TASKS = 'lists/UPDATE_LIST_TASKS';
export const UPDATE_LIST_READY_STATE =
  'lists/UPDATE_LIST_READY_STATE';

export interface ListsState {
  lists: { [index: string]: ListProps };
  listOrder: string[];
}

export const initialState: ListsState = {
  lists: {},
  listOrder: [],
};

export default function reducer(
  state = initialState,
  action: ActionInterface
) {
  switch (action.type) {
    case GET_LISTS: {
      const { lists, order } = action.payload;
      return {
        ...state,
        lists: lists,
        listOrder: order,
      };
    }
    case UPDATE_LIST_TASKS: {
      const { newList, listId } = action.payload;
      return {
        ...state,
        lists: {
          ...state.lists,
          [listId]: newList,
        },
      };
    }

    case UPDATE_LIST_READY_STATE: {
      const { loading, listId } = action.payload;
      return {
        ...state,
        lists: {
          ...state.lists,
          [listId]: {
            ...state.lists[listId],
            loading,
          },
        },
      };
    }

    case UPDATE_LISTS_ORDER: {
      return {
        ...state,
        listOrder: action.payload,
      };
    }

    case RESET_LISTS: {
      return initialState;
    }

    default:
      return state;
  }
}

export const listsSelector = (state: ListsState) =>
  state.lists;

export const listOrderSelector = (state: ListsState) =>
  state.listOrder;

export interface getListsInterface {
  (boardId: number): void;
}

export const resetLists = () => {
  return {
    type: RESET_LISTS,
  };
};

export const updateListTasks = (
  listId: string,
  newList: string[]
) => {
  return {
    type: UPDATE_LIST_TASKS,
    payload: {
      newList,
      listId,
    },
  };
};

export const getLists: getListsInterface = (
  boardId: number
) => async (dispatch: Function, getState: Function) => {
  try {
    const res = await api.getLists(boardId);
    const order: string[] = [];
    console.log(res.data, 'LISTS');

    const lists: {} = res.data
      // .sort(
      //   (a: ListProps, b: ListProps) => a.order - b.order
      // )
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

export const listLoading = (
  listId: string,
  loading: boolean
) => {
  return {
    type: UPDATE_LIST_READY_STATE,
    payload: {
      listId,
      loading,
    },
  };
};

export const getListsAndTasks: any = (
  boardId: number
) => async (dispatch: Function, getState: Function) => {
  try {
    await dispatch(getLists(boardId));
    const lists = getState().lists.lists;
    // get all tasks for each list
    Object.keys(lists).forEach(key => {
      dispatch(listLoading(key, true));
      return dispatch(getTasks(lists[key].id));
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateListsOrder: any = (order: any) => {
  return {
    type: UPDATE_LISTS_ORDER,
    payload: order,
  };
};

export const updateListsOrderAndSendToServer: any = (
  boardId: any,
  listId: any,
  order: any
) => async (dispatch: Function, getState: Function) => {
  try {
    const lists = getState().lists.lists;
    const index = order.indexOf(listId);
    dispatch(updateListsOrder(order));
    const res = await api.updateListsOrder(
      boardId,
      lists[listId].id,
      index,
      // order,
      lists[listId].name
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
