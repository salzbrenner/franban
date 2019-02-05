import * as api from '../../services/api';

export const AUTHENTICATED = 'auth/AUTHENTICATED';
export const AUTHENTICATION_ERROR = 'auth/AUTHENTICATION_ERROR';

export const initialState = {
  jwt: localStorage.getItem('prello-token'),
  uid: localStorage.getItem('prello-uid'),
  errorMessage: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        jwt: action.payload.jwt,
        uid: action.payload.uid
      };

    case AUTHENTICATION_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    default:
      return state;
  }
}

export const getErrorMessage = state => state.auth.errorMessage;
export const getJwt = state => state.auth.jwt;
export const getUid = state => state.auth.uid;

export const register = ({email, password}, callback) => async dispatch => {

  try {
    const res = await api.register(email, password);
    dispatch(
        {
          type: AUTHENTICATED,
          payload: {
            jwt: res.data.access_token,
            uid: res.data.uid,
          },
        });
    localStorage.setItem('prello-token', res.data.access_token);
    localStorage.setItem('prello-uid', res.data.uid);
    callback();
  } catch (e) {
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: 'A user with this email already exists',
    })
  }
};


export const login = ({email, password}, callback) => async dispatch => {
  try {
    const res = await api.login(email, password);
    dispatch(
        {
          type: AUTHENTICATED,
          payload: {
            jwt: res.data.access_token,
            uid: res.data.uid,
          },
        });
    localStorage.setItem('prello-token', res.data.access_token);
    localStorage.setItem('prello-uid', res.data.uid);
    callback();
  } catch (e) {
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: 'Invalid email or password',
    })
  }
};

export const logout = () => {
  localStorage.removeItem('prello-token');
  localStorage.removeItem('prello-uid');
  return {
    type: AUTHENTICATED,
    payload: '',
  }
};

export const clearErrors = () => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: '',
  }
};