import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  register,
  login,
  logout,
  AUTHENTICATED,
  AUTHENTICATION_ERROR,
} from '../auth';
import { baseUrl } from '../../../services/api';
import {mockStore} from '../../../utils/mockStore';

let mock;
let store;
beforeEach(function() {
  mock = new MockAdapter(axios);
  store = mockStore({});

});

afterEach(() => {
  mock.reset()
});

describe('auth actions', () => {

  const credentials = {
    email: 'test@test.com',
    password: 'password',
  };


  describe('register', () => {

    it('has the correct type and payload', async () => {
      mock.onPost(`${baseUrl}/register`).reply(201, {
        access_token: 'myToken',
      });

      await store.dispatch(register(credentials, () => {}));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(AUTHENTICATED);
      expect(actions[0].payload).toEqual('myToken');
    });

    it('errors if user already exists', async () => {
      mock.onPost(`${baseUrl}/register`).reply(422);

      await store.dispatch(register(credentials, () => {}));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(AUTHENTICATION_ERROR);
      expect(actions[0].payload).toEqual('A user with this email already exists');
    });
  });

  describe('login', () => {
    it('has the correct type and payload', async () => {
      mock.onPost(`${baseUrl}/login`).reply(200, {
        access_token: 'myToken',
      });

      await store.dispatch(login(credentials, () => {}));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(AUTHENTICATED);
      expect(actions[0].payload).toEqual('myToken');

    });

    it('errors if credentials are wrong', async () => {
      mock.onPost(`${baseUrl}/register`).reply(401);

      await store.dispatch(login(credentials, () => {}));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(AUTHENTICATION_ERROR);
      expect(actions[0].payload).toEqual('Invalid email or password');
    });

  })

});