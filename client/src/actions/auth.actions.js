import * as api from '../services/api';

export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

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