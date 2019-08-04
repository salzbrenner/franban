import * as api from '../../services/api';
import { ActionInterface } from 'redux/modules/action.type';
import { ThunkDispatch } from 'redux-thunk';
import { getListsForBoard } from 'redux/modules/lists';

export const GET_BOARD = 'boards/GET_BOARD';
export const RESET_BOARD = 'boards/RESET_BOARD';
export const ADD_USER_TO_BOARD = 'boards/ADD_USER_TO_BOARD';

export interface BoardState {
  users: any[];
  addUserMessage: string;
  addUserSuccess: boolean;
}

export const initialState: BoardState = {
  users: [],
  addUserMessage: '',
  addUserSuccess: false,
};

export const getAddUserMessage = (state: BoardState) =>
  state.addUserMessage;

export const getAddUserSuccess = (state: BoardState) =>
  state.addUserSuccess;

export default function reducer(
  state = initialState,
  action: ActionInterface
) {
  switch (action.type) {
    case GET_BOARD:
      const { users, name } = action.payload;
      return {
        ...state,
        name,
        users,
      };

    case RESET_BOARD: {
      return initialState;
    }

    case ADD_USER_TO_BOARD: {
      const { success, message, user } = action.payload;

      return {
        ...state,
        users: user ? [...state.users, user] : state.users,
        addUserMessage: message,
        addUserSuccess: success,
      };
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

    const { lists: listIds, users } = res.data;

    await dispatch({
      type: GET_BOARD,
      payload: res.data,
    });

    // get lists for board
    dispatch(getListsForBoard(listIds, boardId));
  } catch (e) {
    console.log(e);
  }
};

export const addUserToBoard = (
  boardId: number,
  email: string
) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  try {
    const res = await api.addUserToBoard(boardId, email);

    await dispatch({
      type: ADD_USER_TO_BOARD,
      payload: {
        user: res.data,
        message: `${email} was added to the board!`,
        success: true,
      },
    });
  } catch (e) {
    console.log(e);
    await dispatch({
      type: ADD_USER_TO_BOARD,
      payload: {
        user: null,
        message: `${email} is not a registered user. Please have them register.`,
        success: false,
      },
    });
  }
};

export const resetAddUserState = () => {
  return {
    type: ADD_USER_TO_BOARD,
    payload: {
      message: '',
      success: false,
    },
  };
};
