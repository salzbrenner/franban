import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { FormAddListValues } from 'redux/modules/lists';
export const baseUrl = `${
  process.env.REACT_APP_BASE_URL
}/api`;

export const instance: AxiosInstance = axios.create({
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
  type: string,
  path: string,
  data: any,
  headers: {}
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

export const resetPassword = (email: string) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const bodyFormData = new FormData();
  bodyFormData.set('email', email);

  return makeApiCall(
    'post',
    '/reset-password',
    bodyFormData,
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
  name: string,
  boardId: number
): AxiosPromise => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const bodyFormData = new FormData();
  bodyFormData.set('board_id', `${boardId}`);
  bodyFormData.set('name', name);

  return makeApiCall(
    'post',
    '/lists',
    bodyFormData,
    headers
  );
};

/**
 * Deletes a list
 */
export const deleteList = (id: number): AxiosPromise => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return makeApiCall(
    'delete',
    `lists/${id}`,
    null,
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

export const getBoard = (boardId: number) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return instance.get(`boards/${boardId}`, {
    headers,
  });
};

/**
 * Gets a list of user boards
 *  @param boardId
 *  @return {AxiosPromise}
 */
export const getListsForBoard = (boardId: number) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return instance.get(`${baseUrl}/lists`, {
    params: {
      board: boardId,
    },
    headers,
  });
};

/**
 * Gets a list of user boards
 *  @param boardId
 *  @return {AxiosPromise}
 */
export const getList = (listId: number): AxiosPromise => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return instance.get(`${baseUrl}/lists/${listId}`, {
    headers,
  });
};

/**
 * Updates the list order on the server
 * - Updates order
 * - TODO: update name
 *  @param boardId
 *  @return {AxiosPromise}
 */
export const updateListsOrder = (
  // boardId: number,
  listId: number,
  order: string,
  name: string
) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('order', order);

  return makeApiCall(
    'put',
    `${baseUrl}/lists/${listId}`,
    bodyFormData,
    headers
  );
};

/**
 * Updates the task order on the server
 * - Updates order
 * - TODO: update name
 *  @param boardId
 *  @return {AxiosPromise}
 */
export const updateTasksOrder = (
  // boardId: number,
  listId: string,
  taskId: number,
  order: string,
  name: string
) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const bodyFormData = new FormData();
  bodyFormData.set('name', name);
  bodyFormData.set('order', order);
  bodyFormData.set('list_id', listId);

  return makeApiCall(
    'put',
    `${baseUrl}/tasks/${taskId}`,
    bodyFormData,
    headers
  );
};

/**
 * Gets a list of user boards
 *  @param listId
 *  @return {AxiosPromise}
 */
export const getTasksForList = (listId: number) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return instance.get(`${baseUrl}/tasks`, {
    params: {
      list: listId,
    },
    headers,
  });
};

/**
 * Posts form data to /tasks endpoint
 * @return {AxiosPromise}
 */
export const addTask = (
  name: string,
  listId: number
): AxiosPromise => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const bodyFormData = new FormData();
  bodyFormData.set('list_id', `${listId}`);
  bodyFormData.set('name', name);

  return makeApiCall(
    'post',
    '/tasks',
    bodyFormData,
    headers
  );
};

/**
 * Deletes a task
 */
export const deleteTask = (id: number): AxiosPromise => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return makeApiCall(
    'delete',
    `tasks/${id}`,
    null,
    headers
  );
};
