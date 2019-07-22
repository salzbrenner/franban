import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import store from '../redux/store';

// @ts-ignore
const socket = openSocket(process.env.REACT_APP_BASE_URL);

function subscribeToBoards(cb: Function) {
  socket.on('BOARD_ADDED', function() {
    cb();
  });
}

type SocketEvents = 'LIST_ADDED' | 'LIST_DELETED';

const socketEvents: {
  [K in SocketEvents]: SocketEvents
} = {
  LIST_ADDED: 'LIST_ADDED',
  LIST_DELETED: 'LIST_DELETED',
};

const subscribeToLists = {
  listAdded: (cb: Function) =>
    socket.on('LIST_ADDED', (userSessionId: number) => {
      if (
        `${userSessionId}` !== store.getState().auth.uid
      ) {
      }
      cb();
    }),
  listDeleted: (cb: Function) => {
    socket.on('LIST_DELETED', () => cb());
  },
  offAll: () => {
    socket.removeListener('LIST_ADDED');
    socket.removeListener('LIST_DELETED');
  },
};

const socketUnsubscribeFrom = (event: SocketEvents) => {
  socket.removeListener(event);
};

export {
  subscribeToBoards,
  subscribeToLists,
  socketUnsubscribeFrom,
  socketEvents,
};
