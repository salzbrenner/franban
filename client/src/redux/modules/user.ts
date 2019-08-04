import * as api from '../../services/api';
import { ThunkDispatch } from 'redux-thunk';
import { ActionInterface } from 'redux/modules/action.type';

export const GET_BOARDS = 'user/GET_BOARDS';
export const ADD_BOARD = 'user/ADD_BOARD';
export const DELETE_BOARD = 'user/DELETE_BOARD';

export interface UserState {
  boards: { id: number; name: string }[];
  readError: string;
  addErrorMessage: string;
}

export interface FormAddBoardValues {
  name: string;
}

export const initialState: UserState = {
  boards: [],
  readError: '',
  addErrorMessage: '',
};

export default function reducer(
  state = initialState,
  action: ActionInterface
) {
  switch (action.type) {
    case GET_BOARDS: {
      return {
        ...state,
        boards: action.payload,
      };
    }

    case ADD_BOARD: {
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };
    }

    case DELETE_BOARD:
      const idToDelete = action.payload;
      const newBoards = state.boards.filter(
        board => board.id !== idToDelete
      );

      return {
        ...state,
        boards: newBoards,
      };

    default:
      return state;
  }
}

/**
 * Get user boards
 * @param state
 */
export const userBoards = (state: UserState) =>
  state.boards;

/**
 * Get error message for adding board
 * @param state
 */
export const getAddErrorMessage = (state: UserState) =>
  state.addErrorMessage;

export const getUserBoards = (uid: string) => async (
  dispatch: ThunkDispatch<{}, {}, any>
): Promise<void> => {
  try {
    const res = await api.getUserBoards(uid);
    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addBoard = ({
  name,
}: FormAddBoardValues) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  try {
    const { uid } = getState().auth;
    const res = await api.addBoard(uid, name);
    dispatch({
      type: ADD_BOARD,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteBoard = (id: number) => async (
  dispatch: ThunkDispatch<{}, {}, any>,
  getState: Function
): Promise<void> => {
  await api.deleteBoard(id);

  dispatch({
    type: DELETE_BOARD,
    payload: id,
  });
};
