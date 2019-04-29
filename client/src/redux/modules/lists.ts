import * as api from '../../services/api';
import { getTasks } from 'redux/modules/tasks';
import { ListProps } from 'components/List/List';
import { ActionInterface } from 'redux/modules/action.type';
import { AxiosPromise, AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';

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
      const { lists } = action.payload;
      return {
        ...state,
        lists: lists,
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
  (listIds: number[]): void;
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

export const getListsForBoard = (
  listIds: any,
  boardId: number
) => async (
  dispatch: Function,
  getState: Function
): Promise<void> => {
  try {
    // update state order with order from server
    dispatch(updateListsOrder(listIds));

    const res: AxiosResponse = await api.getListsForBoard(
      boardId
    );
    const lists = res.data.reduce(
      (a: ListProps, b: ListProps) => {
        const { order, ...rest } = b;
        a[b.id] = {
          ...rest,
        };
        return a;
      },
      {}
    );

    await dispatch({
      type: GET_LISTS,
      payload: {
        lists,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getList: getListsInterface = (
  listIds: number[]
) => async (dispatch: Function, getState: Function) => {
  try {
    // update state order with order from server
    dispatch(updateListsOrder(listIds));

    const listRequests: AxiosPromise[] = await listIds.map(
      id => api.getList(id)
    );

    const listsResponse = await Promise.all(
      await listRequests.map(promise =>
        promise.then(res => res.data)
      )
    ).then(allRes => allRes);

    const lists = listsResponse.reduce(
      (a: ListProps, b: ListProps) => {
        const { order, ...rest } = b;
        a[b.id] = {
          ...rest,
        };
        return a;
      },
      {}
    );

    await dispatch({
      type: GET_LISTS,
      payload: {
        lists,
      },
    });

    // dispatch()
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

export const getListsAndTasks = (boardId: number) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  try {
    // await dispatch(getLists(boardId));
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

export const updateListsOrder = (order: number[]) => {
  return {
    type: UPDATE_LISTS_ORDER,
    payload: order,
  };
};

export const updateListsOrderAndSendToServer = (
  // boardId: number,
  listId: number,
  order: number[]
) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  try {
    // update store so DND maintains order
    await dispatch(updateListsOrder(order));

    // send to server
    // dispatch(updateListOnServer(boardId, listId, order));
    dispatch(updateListOnServer(listId, order));
  } catch (e) {
    console.log(e);
  }
};

export const updateListOnServer = (
  // boardId: number,
  listId: number,
  order: number[]
) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  try {
    const lists = getState().lists.lists;
    const index = order.indexOf(listId).toString();

    const res = await api.updateListsOrder(
      // boardId,
      listId,
      index,
      lists[listId].name
    );
  } catch (e) {
    console.log(e);
  }
};
