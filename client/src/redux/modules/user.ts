import * as api from '../../services/api';
import { ActionInterface } from 'redux/modules/action.type';

export const GET_BOARDS = 'boards/GET_BOARDS';
export const READ_ERROR = 'boards/READ_ERROR';
export interface UserState {
  boards: {}[];
  readError: string;
}

export const initialState: UserState = {
  boards: [],
  readError: '',
};

export default function reducer(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case GET_BOARDS: {
      return {
        ...state,
        boards: action.payload,
      };
    }

    case READ_ERROR: {
      return {
        ...state,
        readError: action.payload,
      };
    }

    default:
      return state;
  }
}

export const userBoards = (state: UserState) =>
  state.boards;

export const getBoardsXXX = (
  uid: string,
  callback: Function
) => async (dispatch: Function, getState: Function) => {
  try {
    const jwt = getState().auth.jwt;
    const res = await api.getUserBoards(uid, jwt);
    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
    // callback();
  } catch (e) {
    console.log(e);
    dispatch({
      type: READ_ERROR,
    });
  }
};
