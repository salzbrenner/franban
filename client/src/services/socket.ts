import openSocket from 'socket.io-client';
// @ts-ignore
const socket = openSocket(process.env.REACT_APP_BASE_URL);

function subscribeToBoards(cb: Function) {
  socket.on('BOARD_ADDED', function() {
    cb();
  });
}

export { subscribeToBoards };
