import os

from instance.config import DevelopmentConfig
from src import create_app, socketio
# TODO: eventlet + python 3.7 causes issue with email
# import eventlet
# eventlet.monkey_patch()


# app = create_app(os.environ['APP_SETTINGS']).app
app = create_app(DevelopmentConfig).app

# template_dir = os.path.dirname(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
# template_dir = os.path.join(template_dir, 'templates')
# template_directory=template_dir
if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0")

