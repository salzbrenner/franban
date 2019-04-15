import * as api from '../../services/api';

export const GET_BOARDS = 'user/GET_BOARDS';
export const READ_ERROR = 'user/READ_ERROR';
export const ADD_BOARD = 'user/ADD_BOARD';
export const ADD_ERROR = 'user/ADD_BOARD';

export interface UserState {
  boards: {}[];
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
  action: any
) {
  switch (action.type) {
    case GET_BOARDS: {
      return {
        ...state,
        boards: action.payload,
      };
    }

    case ADD_BOARD: {
      console.log('Successfully added board');
      return state;
    }

    case ADD_ERROR: {
      return {
        ...state,
        addErrorMessage: action.payload,
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

export const getAddErrorMessage = (state: UserState) =>
  state.addErrorMessage;

export const getUserBoards = (
  uid: string,
  callback?: Function
) => async (dispatch: Function, getState: Function) => {
  try {
    const res = await api.getUserBoards(uid);
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

export const addBoard = ({
  name,
}: FormAddBoardValues) => async (
  dispatch: Function,
  getState: Function
) => {
  try {
    const { uid } = getState().auth;
    const res = await api.addBoard(uid, name);
    dispatch({
      type: ADD_BOARD,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: ADD_ERROR,
    });
  }
};
