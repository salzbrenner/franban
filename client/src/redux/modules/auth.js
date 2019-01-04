import * as api from '../../services/api';

export const AUTHENTICATED = 'auth/AUTHENTICATED';
export const AUTHENTICATION_ERROR = 'auth/AUTHENTICATION_ERROR';

export const initialState = {
  authenticated: '',
  errorMessage: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: action.payload,
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

export const getErrorMessage = (state) => state.auth.errorMessage;
export const userIsAuthenticated = state => state.auth.authenticated;

export const register = ({email, password}, callback) => async dispatch => {

  try {

    const res = await api.register(email, password);
    dispatch({type: AUTHENTICATED, payload: res.data.access_token});
    localStorage.setItem('token', res.data.access_token);
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
    dispatch({type: AUTHENTICATED, payload: res.data.access_token});
    localStorage.setItem('token', res.data.access_token);
    callback();
  } catch (e) {
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: 'Invalid email or password',
    })
  }
};

export const logout = () => {
  localStorage.removeItem('token');
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