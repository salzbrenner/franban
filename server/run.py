import os
import instance.config
from src import create_app, socketio
# TODO: eventlet + python 3.7 causes issue with email/socketio
# import eventlet
# eventlet.monkey_patch()


app_settings = os.getenv('APP_SETTINGS')
app = create_app(config_name=getattr(instance.config, app_settings)).app

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0")

