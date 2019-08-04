import jwtDecode from 'jwt-decode';
import * as api from '../../services/api';
import { ActionInterface } from 'redux/modules/action.type';

const setTokens = (token: string, uid: string) => {
  const { exp } = jwtDecode(token);
  const tokenObj = {
    token: token,
    exp,
  };

  localStorage.setItem(
    FRNBN_TOKN,
    JSON.stringify(tokenObj)
  );
  localStorage.setItem(FRNBN_USR, uid);
};

const removeTokens = () => {
  localStorage.removeItem(FRNBN_TOKN);
  localStorage.removeItem(FRNBN_USR);
};

const getToken = () => {
  const tokenObj: any = localStorage.getItem(FRNBN_TOKN);

  if (!tokenObj) {
    return;
  }

  const object = JSON.parse(tokenObj);
  const { exp, token } = object;

  if (exp < new Date().getTime() / 1000) {
    removeTokens();
    return;
  }

  return token;
};

const FRNBN_TOKN = 'FRNBN_TOKN';
const FRNBN_USR = 'FRNBN_USR';

export const AUTHENTICATED = 'auth/AUTHENTICATED';
export const RESET_PASSWORD = 'auth/RESET_PASSWORD';
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
  resetPasswordMessage: string | null;
}

export const initialState: AuthState = {
  jwt: getToken(),
  uid: localStorage.getItem(FRNBN_USR),
  errorMessage: '',
  resetPasswordMessage: null,
};

export default function reducer(
  state = initialState,
  action: ActionInterface
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

    case RESET_PASSWORD:
      return {
        ...state,
        resetPasswordMessage: action.payload,
      };

    default:
      return state;
  }
}

export const getErrorMessage = (state: AuthState) =>
  state.errorMessage;
export const getJwt = (state: AuthState) => state.jwt;
export const getUid = (state: AuthState) => state.uid;
export const resetPasswordMessage = (state: AuthState) =>
  state.resetPasswordMessage;

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

    localStorage.setItem(FRNBN_TOKN, res.data.access_token);
    localStorage.setItem(FRNBN_USR, res.data.uid);
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

    // update api service
    setTokens(res.data.access_token, res.data.uid);
    callback();
  } catch (e) {
    console.log(e);
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: 'Invalid email or password',
    });
  }
};

export const resetPasswordRequest = ({
  email,
}: {
  email: string;
}) => async (dispatch: Function) => {
  try {
    const res = await api.resetPasswordRequest(email);
    dispatch({
      type: RESET_PASSWORD,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: 'Invalid email',
    });
  }
};

export const resetPasswordSubmitter = ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => async (dispatch: Function) => {
  try {
    const res = await api.resetPasswordSubmitter(
      password,
      token
    );
    return res.status === 200;
  } catch (e) {
    console.log(e);
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: 'Invalid email',
    });
  }
};

export const logout = () => async (dispatch: Function) => {
  // update api service
  const res = await api.logout();

  localStorage.removeItem(FRNBN_TOKN);
  localStorage.removeItem(FRNBN_USR);
  dispatch({
    type: AUTHENTICATED,
    payload: '',
  });
};

export const clearErrors = () => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: '',
  };
};
