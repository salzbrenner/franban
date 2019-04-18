import axios from 'axios';
export const baseUrl = `${
  process.env.REACT_APP_BASE_URL
}/api`;

export const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    common: {
      Authorization: '',
    },
  },
});

/**
 *
 * @param email
 * @param password
 * @return {FormData}
 */
const setLoginOrRegistrationFormData = (
  email: string,
  password: string
) => {
  const bodyFormData = new FormData();
  bodyFormData.set('email', email);
  bodyFormData.set('password', password);
  return bodyFormData;
};

/**
 *
 * @param type
 * @param path
 * @param data
 * @param headers
 * @return {AxiosPromise}
 */
const makeApiCall = (
  type: any,
  path: any,
  data: any,
  headers: any
) => {
  return instance(path, {
    method: type,
    data: data,
    headers: headers,
  });
};

/**
 * Posts form data to /login endpoint
 * @param email
 * @param password
 * @return {AxiosPromise}
 */
export const login = (email: string, password: string) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return makeApiCall(
    'post',
    '/login',
    setLoginOrRegistrationFormData(email, password),
    headers
  );
};

/**
 * Posts form data to /register endpoint
 * @param email
 * @param password
 * @return {AxiosPromise}
 */
export const register = (
  email: string,
  password: string
) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return makeApiCall(
    'post',
    '/register',
    setLoginOrRegistrationFormData(email, password),
    headers
  );
};

/**
 * Posts form data to /boards endpoint
 * @return {AxiosPromise}
 */
export const addBoard = (uid: string, name: string) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const bodyFormData = new FormData();
  bodyFormData.set('uid', uid);
  bodyFormData.set('name', name);

  return makeApiCall(
    'post',
    '/boards',
    bodyFormData,
    headers
  );
};

/**
 * Posts form data to /boards endpoint
 * @return {AxiosPromise}
 */
export const addList = (
  email: string,
  password: string
) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return makeApiCall(
    'post',
    '/register',
    setLoginOrRegistrationFormData(email, password),
    headers
  );
};

/**
 * Gets a list of user boards
 *  @return {AxiosPromise}
 */
export const getUserBoards = (uid: string) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return instance.get(`${uid}/boards`, {
    headers,
  });
};

/**
 * Gets a list of user boards
 *  @param boardId
 *  @return {AxiosPromise}
 */
export const getLists = (boardId: number) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return instance.get(`${baseUrl}/lists/${boardId}`, {
    headers,
  });
};

/**
 * Gets a list of user boards
 *  @param listId
 *  @return {AxiosPromise}
 */
export const getTasks = (listId: number) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return instance.get(`${baseUrl}/tasks/${listId}`, {
    headers,
  });
};
