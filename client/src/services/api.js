// import openSocket from 'socket.io-client';
// const  socket = openSocket('http://127.0.0.1:5000');
// function subscribeToTimer(cb) {
//   socket.on('connect', function() {
//     console.log('Websocket connected!');
//   });
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
// }
// export { subscribeToTimer };
import axios from 'axios';

export const baseUrl = 'http://localhost:5000/api';

/**
 *
 * @param email
 * @param password
 * @return {FormData}
 */
const setLoginOrRegistrationFormData = (email, password) => {
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
const makeApiCall = (type, path, data, headers) => {
  return axios({
    method: type,
    url: `${baseUrl}${path}`,
    data: data,
    config: {
      headers: headers,
    },
  });
};

/**
 * Posts form data to /login endpoint
 * @param email
 * @param password
 * @return {AxiosPromise}
 */
export const login = (email, password) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return makeApiCall(
      'post',
      '/login',
      setLoginOrRegistrationFormData(email, password),
      headers,
  );
};

/**
 * Posts form data to /register endpoint
 * @param email
 * @param password
 * @return {AxiosPromise}
 */
export const register = (email, password) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return makeApiCall(
      'post',
      '/register',
      setLoginOrRegistrationFormData(email, password),
      headers,
  );
};