import openSocket from 'socket.io-client';
import store from '../redux/store';
// @ts-ignore
const socket = openSocket(process.env.REACT_APP_BASE_URL);

type SocketEvents =
  | 'LIST_ADDED'
  | 'LIST_DELETED'
  | 'LIST_UPDATED'
  | 'TASK_ADDED'
  | 'TASK_UPDATED'
  | 'TASK_DELETED'
  | 'JOIN_ROOM'
  | 'LEAVE_ROOM';

const socketEvents: {
  [K in SocketEvents]: SocketEvents
} = {
  JOIN_ROOM: 'JOIN_ROOM',
  LEAVE_ROOM: 'LEAVE_ROOM',
  LIST_ADDED: 'LIST_ADDED',
  LIST_DELETED: 'LIST_DELETED',
  LIST_UPDATED: 'LIST_UPDATED',
  TASK_ADDED: 'TASK_ADDED',
  TASK_DELETED: 'TASK_DELETED',
  TASK_UPDATED: 'TASK_UPDATED',
};

function subscribeToBoards(cb: Function) {
  socket.on('BOARD_ADDED', function() {
    cb();
  });
}

const roomHandler = {
  joinRoom: (boardId: number) => {
    socket.emit('join', boardId);
  },
  leaveRoom: (boardId: number) => {
    socket.emit('leave', boardId);
  },
};

const emitIfNotOriginator = (
  userSessionId: number,
  cb: Function
) => {
  const uid = store.getState().auth.uid;
  // if (`${userSessionId}` !== uid) {
  cb();
  // }
};

const listEvents = [
  socketEvents.LIST_ADDED,
  socketEvents.LIST_UPDATED,
];

const socketListHandlers = {
  listDeleted: (deleteCb: Function, cb: Function) => {
    socket.on(
      socketEvents.LIST_DELETED,
      ({ uid, list_id }: any) => {
        deleteCb(list_id);
        cb();
        // emitIfNotOriginator(uid, cb);
      }
    );
  },
  subscribeAll: (cb: Function) => {
    listEvents.forEach(event => {
      socket.on(event, (userSessionId: number) => {
        emitIfNotOriginator(userSessionId, cb);
      });
    });
  },
  unsubscribeAll: () => {
    listEvents.forEach(event => {
      socket.removeListener(event);
    });
  },
};

const taskEvents = [
  socketEvents.TASK_UPDATED,
  socketEvents.TASK_DELETED,
  socketEvents.TASK_ADDED,
];

const socketTaskHandlers = {
  subscribeAll: (cb: Function) => {
    taskEvents.forEach(event => {
      socket.on(event, (userSessionId: number) => {
        emitIfNotOriginator(userSessionId, cb);
      });
    });
  },
  unsubscribeAll: () => {
    taskEvents.forEach(event => {
      socket.removeListener(event);
    });
  },
};

const socketUnsubscribeFrom = (event: SocketEvents) => {
  socket.removeListener(event);
};

export {
  subscribeToBoards,
  socketListHandlers,
  socketUnsubscribeFrom,
  roomHandler,
  socketEvents,
  socketTaskHandlers,
};
