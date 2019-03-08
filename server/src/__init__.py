import connexion
import os
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, join_room, emit
from flask_cors import CORS
from .middleware.cors_header_middleware import CorsHeaderMiddleware
from connexion import request

db = SQLAlchemy()
socketio = SocketIO()

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    if request.method == 'OPTIONS':
        response.headers['Access-Control-Allow-Methods'] = 'DELETE, GET, POST, PUT'
        headers = request.headers.get('Access-Control-Request-Headers')
        if headers:
            response.headers['Access-Control-Allow-Headers'] = headers
    return response

def create_app(config_name):
    connexion_app = connexion.App(__name__, specification_dir='./')
    flask_app = connexion_app.app
    connexion_app.add_api('openapi.yml')

    # Middleware
    flask_app.wsgi_app = CorsHeaderMiddleware(flask_app.wsgi_app)
    # flask_app.after_request(add_cors_headers)

    CORS(flask_app)
    flask_app.config.from_object(config_name)
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(flask_app)
    socketio.init_app(flask_app, cors_allowed_origins=['*'])

    from .todos.controller import todos
    from .users.controller import user
    from .boards.controller import boards

    flask_app.register_blueprint(todos)
    flask_app.register_blueprint(boards)
    flask_app.register_blueprint(user)

    return connexion_app
