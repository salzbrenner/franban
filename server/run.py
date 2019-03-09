from src import create_app, socketio
import os
# from gevent import monkey
# monkey.patch_all()


app = create_app(os.environ['APP_SETTINGS']).app

if __name__ == '__main__':
    socketio.run(app, debug=True)

