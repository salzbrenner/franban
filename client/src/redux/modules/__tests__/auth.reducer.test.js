import reducer, {
  initialState,
  AUTHENTICATED,
  AUTHENTICATION_ERROR,
} from '../auth';

describe('Auth Reducer', () => {
  it('handles actions of type AUTHENTICATED', () => {
    const action = {
      type: AUTHENTICATED,
      payload: 'unique_token_id',
    };

    const newState = reducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      authenticated: 'unique_token_id',
    });
  });

  it('handles actions of type AUTHENTICATION_ERROR', () => {
    const action = {
      type: AUTHENTICATION_ERROR,
      payload: 'Invalid authentication',
    };

    const newState = reducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      errorMessage: 'Invalid authentication',
    });
  });
});
