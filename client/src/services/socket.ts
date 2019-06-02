import openSocket from 'socket.io-client';
// @ts-ignore
const socket = openSocket(process.env.REACT_APP_BASE_URL);

function subscribeToBoards(cb: Function) {
  socket.on('BOARD_ADDED', function() {
    cb();
  });
}

const subscribeToLists = {
  listAdded: (cb: Function) =>
    socket.on('LIST_ADDED', () => cb()),
  listDeleted: (cb: Function) => {
    socket.on('LIST_DELETED', () => cb());
  },
  offAll: () => {
    socket.removeListener('LIST_ADDED');
    socket.removeListener('LIST_DELETED');
  },
};

export { subscribeToBoards, subscribeToLists };
