import authReducer, {INITIAL_STATE} from '../auth.reducer';
import {
  AUTHENTICATED,
  AUTHENTICATION_ERROR,
} from 'actions/auth.actions';

describe('Auth Reducer', () => {
  it('handles actions of type AUTHENTICATED', () => {
    const action = {
      type: AUTHENTICATED,
      payload: 'unique_token_id',
    };

    const newState = authReducer(INITIAL_STATE, action);
    expect(newState)
        .toEqual({...INITIAL_STATE, authenticated: 'unique_token_id'});
  });

  it('handles actions of type AUTHENTICATION_ERROR', () => {
    const action = {
      type: AUTHENTICATION_ERROR,
      payload: 'Invalid authentication',
    };

    const newState = authReducer(INITIAL_STATE, action);
    expect(newState)
        .toEqual({...INITIAL_STATE, errorMessage: 'Invalid authentication'});
  });
});
