import {
  AUTHENTICATED,
  AUTHENTICATION_ERROR,
} from 'actions/auth.actions';

export const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
};

export default function(state = INITIAL_STATE, action) {
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