import * as api from '../../services/api';
import { ActionInterface } from 'redux/modules/action.type';
import { AppState } from 'redux/modules/rootReducer';

export const AUTHENTICATED = 'auth/AUTHENTICATED';
export const AUTHENTICATION_ERROR =
  'auth/AUTHENTICATION_ERROR';

export interface FormAuthValues {
  email: string;
  password: string;
}

export interface AuthState {
  errorMessage: string;
  jwt: string | null;
  uid: string | null;
}

export const initialState: AuthState = {
  jwt: localStorage.getItem('prello-token'),
  uid: localStorage.getItem('prello-uid'),
  errorMessage: '',
};

export default function reducer(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        jwt: action.payload.jwt,
        uid: action.payload.uid,
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

export const getErrorMessage = (state: AuthState) =>
  state.errorMessage;
export const getJwt = (state: AuthState) => state.jwt;
export const getUid = (state: AuthState) => state.uid;

export const register = (
  { email, password }: FormAuthValues,
  callback = () => null
) => async (dispatch: Function) => {
  try {
    const res = await api.register(email, password);
    dispatch({
      type: AUTHENTICATED,
      payload: {
        jwt: res.data.access_token,
        uid: res.data.uid,
      },
    });
    localStorage.setItem(
      'prello-token',
      res.data.access_token
    );
    localStorage.setItem('prello-uid', res.data.uid);
    callback();
  } catch (e) {
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: 'A user with this email already exists',
    });
  }
};

export const login = (
  { email, password }: FormAuthValues,
  callback = () => null
) => async (dispatch: Function) => {
  try {
    const res = await api.login(email, password);
    dispatch({
      type: AUTHENTICATED,
      payload: {
        jwt: res.data.access_token,
        uid: res.data.uid,
      },
    });
    localStorage.setItem(
      'prello-token',
      res.data.access_token
    );
    localStorage.setItem('prello-uid', res.data.uid);
    callback();
  } catch (e) {
    console.log(e);
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: 'Invalid email or password',
    });
  }
};

export const logout = () => {
  localStorage.removeItem('prello-token');
  localStorage.removeItem('prello-uid');
  return {
    type: AUTHENTICATED,
    payload: '',
  };
};

export const clearErrors = () => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: '',
  };
};