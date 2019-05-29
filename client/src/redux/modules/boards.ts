import * as api from '../../services/api';
import { ActionInterface } from 'redux/modules/action.type';
import { ThunkDispatch } from 'redux-thunk';
import { getListsForBoard } from 'redux/modules/lists';

export const GET_BOARD = 'boards/GET_BOARD';
export const RESET_BOARD = 'boards/RESET_BOARD';

export interface BoardState {}

export const initialState: BoardState = {};

export default function reducer(
  state = initialState,
  action: ActionInterface
) {
  switch (action.type) {
    case GET_BOARD:
      return action.payload;

    case RESET_BOARD: {
      return initialState;
    }

    default:
      return state;
  }
}

export const resetBoard = () => {
  return {
    type: RESET_BOARD,
  };
};

export const getBoard = (boardId: number) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  try {
    const res = await api.getBoard(boardId);
    const { lists } = res.data;
    console.log('SFUOH');
    await dispatch({
      type: GET_BOARD,
      payload: res.data,
    });

    // get lists for board
    dispatch(getListsForBoard(lists, boardId));
  } catch (e) {
    console.log(e);
  }
};
