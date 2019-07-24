from src import create_app, socketio
from flask import Flask, render_template

import os
# from gevent import monkey
# monkey.patch_all()


app = create_app(os.environ['APP_SETTINGS']).app

template_dir = os.path.dirname(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
template_dir = os.path.join(template_dir, 'templates')

if __name__ == '__main__':
    socketio.run(app, debug=True, template_directory=template_dir)

