from flask_socketio import join_room, leave_room

from src import socketio

BOARD_ADDED = 'BOARD_ADDED'

LIST_ADDED = 'LIST_ADDED'
LIST_UPDATED = 'LIST_UPDATED'
LIST_DELETED = 'LIST_DELETED'

TASK_ADDED = 'TASK_ADDED'
TASK_UPDATED = 'TASK_UPDATED'
TASK_DELETED = 'TASK_DELETED'


@socketio.on('join')
def on_join(room):
    join_room(room)


@socketio.on('leave')
def on_join(room):
    leave_room(room)
