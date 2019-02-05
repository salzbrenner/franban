from src import create_app, socketio
import os
from flask import Flask, render_template, Response
from flask_socketio import SocketIO, join_room, emit
# from gevent import monkey
# monkey.patch_all()


@socketio.on('my event')
def on_create(data):
    """Create a game lobby"""
    emit('my response', data)


app = create_app(os.environ['APP_SETTINGS']).app
socketio = SocketIO(app)

if __name__ == '__main__':
    socketio.run(app, debug=True)