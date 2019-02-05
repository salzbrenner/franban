import connexion
import os
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, join_room, emit
from flask_cors import CORS
from .middleware.cors_header_middleware import CorsHeaderMiddleware

db = SQLAlchemy()
socketio = SocketIO()


def create_app(config_name):
    connexion_app = connexion.App(__name__, specification_dir='./')
    flask_app = connexion_app.app
    connexion_app.add_api('openapi.yml')

    # Middleware
    flask_app.wsgi_app = CorsHeaderMiddleware(flask_app.wsgi_app)

    CORS(flask_app)
    flask_app.config.from_object(config_name)
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(flask_app)
    socketio.init_app(flask_app)

    from .todos.controller import todos
    from .users.controller import user
    from .boards.controller import boards

    flask_app.register_blueprint(todos)
    flask_app.register_blueprint(boards)
    flask_app.register_blueprint(user)

    return connexion_app
