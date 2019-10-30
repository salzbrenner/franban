import * as api from '../../services/api';
import { ListProps } from 'components/List/List';
import { ActionInterface } from 'redux/modules/action.type';
import { AxiosPromise, AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import {
  deleteAllTasksFromDeletedList,
  TaskInterface,
} from 'redux/modules/tasks';

export const GET_LISTS = 'lists/GET_LISTS';
export const ADD_LIST = 'lists/ADD_LIST';
export const DELETE_LIST = 'lists/DELETE_LIST';
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

export interface getListsInterface {
  (listIds: number[]): void;
}

export interface FormAddListValues {
  name: string;
  boardId: number;
}

export const initialState: ListsState = {
  lists: {},
  listOrder: [],
};

/**
 * Lists reducer
 * @param state
 * @param action
 */
export default function reducer(
  state = initialState,
  action: ActionInterface
) {
  switch (action.type) {
    case GET_LISTS: {
      const { lists } = action.payload;
      const newLists = { ...lists, ...state.lists };
      return {
        ...state,
        lists: newLists,
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

    case DELETE_LIST: {
      const listId = action.payload;
      const {
        [listId]: deleted,
        ...listsToKeep
      } = state.lists;

      return {
        ...state,
        lists: listsToKeep,
      };
    }

    case UPDATE_LIST_READY_STATE: {
      const { listId } = action.payload;
      return {
        ...state,
        lists: {
          ...state.lists,
          [listId]: {
            ...state.lists[listId],
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

    case ADD_LIST: {
      const { id } = action.payload;

      return {
        ...state,
        lists: {
          ...state.lists,
          [id]: action.payload,
        },
      };
    }

    default:
      return state;
  }
}

/**
 * Get lists
 * @param state
 */
export const listsSelector = (state: ListsState) =>
  state.lists;

/**
 * Get list order
 * @param state
 */
export const listOrderSelector = (state: ListsState) =>
  state.listOrder;

/**
 * Reset lists action
 */
export const resetLists = () => {
  return {
    type: RESET_LISTS,
  };
};

/**
 * Update lists action
 * @param listId
 * @param newList
 */
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

/**
 * Gets lists for <boardId> from API
 * Dispatches get get lists action
 *
 * @param listIds
 * @param boardId
 */
export const getListsForBoard = (
  listIds: number[],
  boardId: number
) => async (
  dispatch: Function,
  getState: Function
): Promise<void> => {
  try {
    // update state order with order from server
    await dispatch(updateListsOrder(listIds));

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

/**
 * Gets single list
 * @param listIds
 */
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
  } catch (e) {
    console.log(e);
  }
};

/**
 * Dispatch list ready state action
 * @param listId
 */
export const listLoading = (listId: string) => {
  return {
    type: UPDATE_LIST_READY_STATE,
    payload: {
      listId,
    },
  };
};

/**
 * Update list order action
 * @param order
 */
export const updateListsOrder = (order: number[]) => {
  return {
    type: UPDATE_LISTS_ORDER,
    payload: order,
  };
};

/**
 * Dispatch list order update for client
 * Dispatch list order update for server
 * @param listId
 * @param order
 */
export const updateListsOrderAndSendToServer = (
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
    dispatch(updateListOnServer(listId, order));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Makes api call to update list order in server
 * @param listId
 * @param order
 */
export const updateListOnServer = (
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
      listId,
      index,
      lists[listId].name
    );
  } catch (e) {
    console.log(e);
  }
};

/**
 * Deletes list and dispatches action to delete all
 * associated tasks
 *
 * @param listId
 */
export const deleteList = (listId: number) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  try {
    const res: AxiosResponse = await api.deleteList(listId);

    dispatch(deleteListFromState(listId));
  } catch (e) {
    console.log(e);
  }
};

export const deleteListFromState = (
  listId: number
) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  try {
    const listsState = getState().lists;

    const allTasks = getState().tasks;
    const listTasks = Object.keys(allTasks)
      .filter(
        (key: string) => allTasks[key].list_id === listId
      )
      .map(key => +key);

    const listsOrder = listsState.listOrder;
    const newOrder = listsOrder.filter(
      (id: number) => id !== listId
    );

    await dispatch(
      deleteAllTasksFromDeletedList(listTasks)
    );

    await dispatch(updateListsOrder(newOrder));

    await dispatch({
      type: DELETE_LIST,
      payload: listId,
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Adds List
 *
 * @param name
 * @param boardId
 */
export const addList = (
  name: string,
  boardId: number
) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  const res = await api.addList(name, boardId);
  const { order, ...rest } = res.data;

  const newList = {
    ...rest,
    board_id: boardId,
    taskIds: [],
  };

  await dispatch({
    type: ADD_LIST,
    payload: newList,
  });

  const listsOrder = getState().lists.listOrder;
  dispatch({
    type: UPDATE_LISTS_ORDER,
    payload: [...listsOrder, newList.id],
  });
};
