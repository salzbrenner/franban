import * as api from '../../services/api';
import { ActionInterface } from 'redux/modules/action.type';

export const GET_BOARD = 'boards/GET_BOARD';

export interface BoardState {}

export const initialState: BoardState = {};

export default function reducer(
  state = initialState,
  action: ActionInterface
) {
  switch (action.type) {
    case GET_BOARD:
      return action.payload;

    default:
      return state;
  }
}

export const getBoard: any = (boardId: any) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    const res = await api.getBoard(boardId);
    dispatch({
      type: GET_BOARD,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};
