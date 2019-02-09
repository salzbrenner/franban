import * as api from '../../services/api';

export const GET_BOARDS = 'boards/GET_BOARDS';
export const READ_ERROR = 'boards/READ_ERROR';

export const initialState = {
  boards: [],
  readError: '',
};

export default function reducer(
  state = initialState,
  action
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

export const userBoards = state => state.user.boards;

export const getBoardsXXX = (uid, callback) => async (
  dispatch,
  getState
) => {
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
