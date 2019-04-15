import * as api from '../../services/api';

export const GET_LISTS = 'lists/GET_LISTS';

export interface ListsState {
  lists: {}[];
}

export const initialState: ListsState = {
  lists: [],
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
    dispatch({
      type: GET_LISTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};
